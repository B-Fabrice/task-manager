import { createConnection } from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  try {
    const connection = await createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'taskflow'
    })

    const [users] = await connection.execute(`
      SELECT id, first_name, last_name, email, role, is_active
      FROM users
      WHERE is_active = true
      ORDER BY first_name, last_name
    `)

    await connection.end()

    const formattedUsers = (users as any[]).map(user => ({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
      isActive: user.is_active
    }))

    return {
      success: true,
      users: formattedUsers
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users'
    })
  }
})
