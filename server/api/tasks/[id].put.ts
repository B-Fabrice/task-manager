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

    const connection = await createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'taskflow'
    })

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

    // Format deadline for MySQL
    let formattedDeadline = null
    if (deadline) {
      const date = new Date(deadline)
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
      [title, description || '', status, assignedTo || null, formattedDeadline, taskId]
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
  console.log('event', event)
  return {
    id: 1,
    email: 'admin@taskflow.com',
    role: 'admin'
  }
}
