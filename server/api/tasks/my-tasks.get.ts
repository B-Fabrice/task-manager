import { createConnection } from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  try {
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
      WHERE t.assigned_to = ?
      ORDER BY t.created_at DESC
    `, [user.id])

    await connection.end()

    const formattedTasks = (tasks as any[]).map(task => ({
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
    }))

    return {
      success: true,
      tasks: formattedTasks
    }
  } catch (error) {
    console.error('Error fetching user tasks:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch user tasks'
    })
  }
})

async function getUserFromSession(event: any) {
  // This would typically extract user from JWT token
  // For now, we'll return a mock user based on the request
  console.log('event', event)
  
  // Mock different users for testing
  const mockUsers = [
    { id: 1, email: 'admin@taskflow.com', role: 'admin' },
    { id: 2, email: 'user@taskflow.com', role: 'user' }
  ]
  
  // For now, return user 2 (regular user) for testing
  return mockUsers[1]
}
