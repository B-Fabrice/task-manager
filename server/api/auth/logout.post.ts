import { createConnection } from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, 'refresh_token')

    if (refreshToken) {
      // Connect to MySQL
      const connection = await createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'taskflow'
      })

      // Delete refresh token from database
      await connection.execute(
        'DELETE FROM refresh_tokens WHERE token_hash = ?',
        [refreshToken]
      )

      await connection.end()
    }

    // Clear cookies
    deleteCookie(event, 'access_token')
    deleteCookie(event, 'refresh_token')

    return {
      success: true,
      message: 'Logged out successfully'
    }

  } catch (error: any) {
    console.error('Logout error:', error)
    deleteCookie(event, 'access_token')
    deleteCookie(event, 'refresh_token')
    
    return {
      success: true,
      message: 'Logged out successfully'
    }
  }
})
