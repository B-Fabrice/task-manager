# TaskFlow Authentication Setup

## Prerequisites

1. **MySQL Database**: Install and run MySQL server
2. **Node.js**: Version 18+ recommended
3. **Yarn**: Package manager

## Database Setup

1. **Create Database**:
   ```sql
   mysql -u root -p
   source database/schema.sql
   ```

2. **Verify Tables**:
   ```sql
   USE taskflow;
   SHOW TABLES;
   SELECT * FROM users;
   ```

## Environment Configuration

Create a `.env` file in the project root:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=taskflow

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production

# Environment
NODE_ENV=development
```

## Installation

1. **Install Dependencies**:
   ```bash
   yarn install
   ```

2. **Start Development Server**:
   ```bash
   yarn dev
   ```

## Test Accounts

The database includes sample accounts:

- **Admin**: `admin@taskflow.com` / `admin123`
- **User**: `user@taskflow.com` / `user123`

## Features

### Authentication Flow
- ✅ JWT Access Tokens (15 minutes)
- ✅ Refresh Tokens (7 days)
- ✅ HTTP-only Cookies
- ✅ Automatic Token Refresh
- ✅ Secure Password Hashing (bcrypt)

### Security Features
- ✅ Role-based Access Control
- ✅ Protected Routes
- ✅ Admin Middleware
- ✅ Token Expiration
- ✅ Secure Cookie Settings

### User Management
- ✅ Global State Management (Pinia)
- ✅ User Profile Display
- ✅ Role Indicators
- ✅ Logout Functionality

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

## Project Structure

```
task-manager/
├── app/
│   ├── components/          # Reusable components
│   ├── pages/              # Route pages
│   ├── stores/             # Pinia stores
│   └── middleware/         # Route middleware
├── server/
│   └── api/
│       └── auth/           # Authentication endpoints
├── database/
│   └── schema.sql          # Database schema
└── middleware/             # Global middleware
```

## Next Steps

1. Set up your MySQL database
2. Configure environment variables
3. Install dependencies
4. Start the development server
5. Test login with sample accounts
6. Access the dashboard at `/dashboard`
