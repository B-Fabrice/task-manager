import jwt from 'jsonwebtoken'
import { createConnection } from 'mysql2/promise'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'

export default defineEventHandler(async (event) => {
  try {
    const accessToken = getCookie(event, 'access_token')
    console.log('Access Token:', accessToken)

    if (!accessToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Access token not found'
      })
    }

    // Verify access token
    const decoded = jwt.verify(accessToken, JWT_SECRET) as any

    // Connect to MySQL
    const connection = await createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'taskflow'
    })

    // Get user data
    const [users] = await connection.execute(
      'SELECT id, email, role, first_name, last_name, is_active FROM users WHERE id = ?',
      [decoded.userId]
    )

    if (!Array.isArray(users) || users.length === 0) {
      await connection.end()
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    const user = users[0] as any

    if (!user.is_active) {
      await connection.end()
      throw createError({
        statusCode: 401,
        statusMessage: 'Account is deactivated'
      })
    }

    await connection.end()

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name
      }
    }

  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 401,
      statusMessage: error.statusMessage || 'Authentication failed'
    })
  }
})
