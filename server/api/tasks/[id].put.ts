import { createConnection } from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  try {
    const taskId = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { title, description, status, assignedTo, deadline } = body
    console.log('body', body)
    
    if (!taskId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Task ID is required'
      })
    }

    // Get user from session/token
    const user = await getUserFromSession(event)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    // Check if user is trying to complete a task (only admins can complete tasks)
    if (status === 'Completed' && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Only administrators can complete tasks'
      })
    }

    const connection = await createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'taskflow'
    })

    // For status-only updates, we need to fetch the current task data first
    let currentTask = null
    if (status && !title) {
      const [tasks] = await connection.execute(
        'SELECT title, description, assigned_to, deadline FROM tasks WHERE id = ?',
        [taskId]
      )
      
      if ((tasks as any[]).length > 0) {
        currentTask = (tasks as any[])[0]
      }
    }

    // Check if task exists
    const [existingTasks] = await connection.execute(
      'SELECT id FROM tasks WHERE id = ?',
      [taskId]
    )

    if ((existingTasks as any[]).length === 0) {
      await connection.end()
      throw createError({
        statusCode: 404,
        statusMessage: 'Task not found'
      })
    }

    // Use current task data for fields not provided in the update
    const finalTitle = title || currentTask?.title || ''
    const finalDescription = description !== undefined ? description : (currentTask?.description || '')
    const finalAssignedTo = assignedTo !== undefined ? assignedTo : currentTask?.assigned_to
    const finalDeadline = deadline !== undefined ? deadline : currentTask?.deadline
    
    console.log('Update parameters:', {
      finalTitle,
      finalDescription,
      status,
      finalAssignedTo,
      finalDeadline,
      taskId
    })

    // Format deadline for MySQL
    let formattedDeadline = null
    if (finalDeadline) {
      const date = new Date(finalDeadline)
      // Convert to MySQL DATETIME format (YYYY-MM-DD HH:MM:SS)
      formattedDeadline = date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0') + ' ' +
        String(date.getHours()).padStart(2, '0') + ':' +
        String(date.getMinutes()).padStart(2, '0') + ':' +
        String(date.getSeconds()).padStart(2, '0')
    }
    console.log('Formatted deadline for MySQL:', formattedDeadline)

    // Update task
    await connection.execute(
      `UPDATE tasks 
       SET title = ?, description = ?, status = ?, assigned_to = ?, deadline = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [finalTitle, finalDescription, status, finalAssignedTo, formattedDeadline, taskId]
    )

    // Fetch the updated task with user details
    const [tasks] = await connection.execute(`
      SELECT 
        t.id,
        t.title,
        t.description,
        t.status,
        t.assigned_to,
        t.created_at,
        t.updated_at,
        t.deadline,
        t.created_by,
        assigned_user.first_name as assigned_first_name,
        assigned_user.last_name as assigned_last_name,
        assigned_user.email as assigned_email,
        created_user.first_name as created_first_name,
        created_user.last_name as created_last_name,
        created_user.email as created_email
      FROM tasks t
      LEFT JOIN users assigned_user ON t.assigned_to = assigned_user.id
      LEFT JOIN users created_user ON t.created_by = created_user.id
      WHERE t.id = ?
    `, [taskId])

    await connection.end()

    const task = (tasks as any[])[0]
    const formattedTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      assignedTo: task.assigned_to,
      assignedToUser: task.assigned_to ? {
        id: task.assigned_to,
        firstName: task.assigned_first_name,
        lastName: task.assigned_last_name,
        email: task.assigned_email
      } : null,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
      deadline: task.deadline,
      createdBy: task.created_by,
      createdByUser: {
        id: task.created_by,
        firstName: task.created_first_name,
        lastName: task.created_last_name,
        email: task.created_email
      }
    }

    return {
      success: true,
      task: formattedTask
    }
  } catch (error: any) {
    console.error('Error updating task:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update task'
    })
  }
})

async function getUserFromSession(event: any) {
  // console.log('event', event)
  
  // Mock different users for testing
  const mockUsers = [
    { id: 1, email: 'admin@taskflow.com', role: 'admin' },
    { id: 2, email: 'user@taskflow.com', role: 'user' }
  ]
  
  // For testing, return user 2 (regular user) for my-tasks endpoint
  // and user 1 (admin) for other endpoints
  const isMyTasksEndpoint = event.node.req.url?.includes('/my-tasks')
  return isMyTasksEndpoint ? mockUsers[1] : mockUsers[0]
}
