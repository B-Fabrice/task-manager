import { createConnection } from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  try {
    const taskId = getRouterParam(event, 'id')

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

    // Delete task
    await connection.execute(
      'DELETE FROM tasks WHERE id = ?',
      [taskId]
    )

    await connection.end()

    return {
      success: true,
      message: 'Task deleted successfully'
    }
  } catch (error: any) {
    console.error('Error deleting task:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete task'
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
