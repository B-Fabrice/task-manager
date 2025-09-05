import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createConnection } from 'mysql2/promise'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key'
const JWT_EXPIRES_IN = '15m'

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, 'refresh_token')

    if (!refreshToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Refresh token not found'
      })
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any

    // Connect to MySQL
    const connection = await createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'taskflow'
    })

    // Find refresh token in database
    const [tokens] = await connection.execute(
      'SELECT rt.*, u.email, u.role, u.first_name, u.last_name, u.is_active FROM refresh_tokens rt JOIN users u ON rt.user_id = u.id WHERE rt.user_id = ? AND rt.expires_at > NOW()',
      [decoded.userId]
    )

    if (!Array.isArray(tokens) || tokens.length === 0) {
      await connection.end()
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid refresh token'
      })
    }

    const tokenRecord = tokens[0] as any

    if (!tokenRecord.is_active) {
      await connection.end()
      throw createError({
        statusCode: 401,
        statusMessage: 'Account is deactivated'
      })
    }

    // Verify refresh token hash
    const isValidToken = await bcrypt.compare(refreshToken, tokenRecord.token_hash)
    if (!isValidToken) {
      await connection.end()
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid refresh token'
      })
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { 
        userId: tokenRecord.user_id, 
        email: tokenRecord.email, 
        role: tokenRecord.role 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    await connection.end()

    // Set new access token cookie
    setCookie(event, 'access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 // 15 minutes
    })

    return {
      success: true,
      user: {
        id: tokenRecord.user_id,
        email: tokenRecord.email,
        role: tokenRecord.role,
        firstName: tokenRecord.first_name,
        lastName: tokenRecord.last_name
      }
    }

  } catch (error: any) {
    // Clear invalid cookies
    deleteCookie(event, 'access_token')
    deleteCookie(event, 'refresh_token')
    
    throw createError({
      statusCode: error.statusCode || 401,
      statusMessage: error.statusMessage || 'Token refresh failed'
    })
  }
})
