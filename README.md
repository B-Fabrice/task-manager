# TaskFlow - Modern Task Management System

A professional, full-stack task management application built with Nuxt 4, featuring real-time collaboration, AI-powered task descriptions, and comprehensive user management.

## 🚀 Features

- **🔐 Authentication System**: JWT-based authentication with refresh tokens
- **👥 User Management**: Role-based access control (Admin/User)
- **📋 Task Management**: Create, edit, delete, and track tasks
- **🤖 AI Integration**: Gemini AI-powered task description generation
- **🌙 Dark/Light Mode**: Seamless theme switching
- **📱 Responsive Design**: Mobile-first, professional UI
- **🔍 Task Details Modal**: Click task titles to view full information
- **📊 Dashboard Analytics**: Task statistics and progress tracking
- **🎨 Modern UI**: Built with TailwindCSS and Vue 3

## 🛠️ Technology Stack

### Frontend
- **Nuxt 4** - Full-stack Vue.js framework
- **Vue 3** - Composition API with TypeScript
- **TailwindCSS** - Utility-first CSS framework
- **Pinia** - State management
- **@nuxt/ui** - UI component library

### Backend
- **Nuxt Server Routes** - API endpoints
- **MySQL** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Gemini AI** - Task description generation

### Development Tools
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Yarn** - Package management

## 📁 Project Structure

```
task-manager/
├── app/                          # Application source code
│   ├── components/              # Reusable Vue components
│   │   ├── icons/              # SVG icon components
│   │   ├── AppButton.vue       # Button component
│   │   ├── AppInput.vue        # Input component
│   │   ├── AppTextarea.vue     # Textarea with AI integration
│   │   ├── TaskCard.vue        # Task display card
│   │   ├── TaskDetailsModal.vue # Task details modal
│   │   ├── TaskForm.vue        # Task creation/edit form
│   │   └── UserTaskCard.vue    # User task card
│   ├── composables/            # Vue composables
│   │   └── useAI.ts           # AI functionality
│   ├── middleware/             # Route middleware
│   │   ├── auth.ts            # Authentication middleware
│   │   └── admin.ts           # Admin role middleware
│   ├── pages/                  # Application pages
│   │   ├── index.vue          # Landing page
│   │   ├── login.vue          # Login page
│   │   ├── dashboard.vue      # User dashboard
│   │   └── admin.vue          # Admin panel
│   ├── plugins/                # Nuxt plugins
│   │   └── auth.client.ts     # Auth initialization
│   ├── stores/                 # Pinia stores
│   │   ├── auth.ts            # Authentication store
│   │   ├── tasks.ts           # Task management store
│   │   └── userTasks.ts       # User tasks store
│   └── app.vue                 # Root component
├── database/                   # Database files
│   └── schema.sql             # MySQL schema
├── server/                     # Server-side code
│   └── api/                   # API endpoints
│       ├── auth/              # Authentication endpoints
│       ├── tasks/             # Task management endpoints
│       ├── users/             # User management endpoints
│       └── ai/                # AI integration endpoints
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── nuxt.config.ts             # Nuxt configuration
├── tailwind.config.js         # TailwindCSS configuration
├── package.json               # Dependencies
├── example.env                # Environment variables template
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **Yarn** or **npm**

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd task-manager

# Install dependencies
yarn install
# or
npm install
```

### 2. Environment Setup

```bash
# Copy the example environment file
cp example.env .env

# Edit the .env file with your configuration
nano .env
```

**Required Environment Variables:**
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=taskflow

# JWT Secrets (generate strong, random strings)
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# Gemini AI API Key (optional, for AI features)
GEMINI_API_KEY=your_gemini_api_key

# Environment
NODE_ENV=development
```

### 3. Database Setup

```bash
# Create the database and tables
mysql -u root -p < database/schema.sql
```

**Or manually:**
```sql
-- Connect to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE taskflow;

-- Use the database
USE taskflow;

-- Run the schema
SOURCE database/schema.sql;
```

### 4. Start Development Server

```bash
# Start the development server
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔑 Default Login Credentials

The database schema includes sample users for testing:

### Admin User
- **Email:** `admin@taskflow.com`
- **Password:** `admin123`
- **Role:** Admin

### Regular User
- **Email:** `user@taskflow.com`
- **Password:** `user123`
- **Role:** User

## 📋 Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn generate     # Generate static site

# Code Quality
yarn lint         # Run ESLint
yarn type-check   # Run TypeScript checks
```

## 🎯 Key Features Explained

### Authentication System
- **JWT Tokens**: Secure access and refresh tokens
- **HTTP-Only Cookies**: Secure token storage
- **Role-Based Access**: Admin and user permissions
- **Auto-Refresh**: Seamless token renewal

### Task Management
- **CRUD Operations**: Full task lifecycle management
- **Status Tracking**: To Do → In Progress → In Review → Completed
- **User Assignment**: Assign tasks to team members
- **Deadline Management**: Set and track task deadlines

### AI Integration
- **Gemini AI**: Generate task descriptions from titles
- **Smart Suggestions**: AI-powered content generation
- **One-Click Generation**: Easy-to-use interface

### User Experience
- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: User preference support
- **Real-time Updates**: Live task status changes
- **Modal Details**: Click task titles for full information

## 🔧 Configuration

### TailwindCSS
Custom colors and dark mode configuration in `tailwind.config.js`

### Nuxt Configuration
- **SSR**: Server-side rendering enabled
- **Modules**: @nuxt/ui, @pinia/nuxt, @nuxtjs/color-mode
- **Plugins**: Auto-imported components and composables

### Database Schema
- **Users**: Authentication and profile data
- **Tasks**: Task management and assignment
- **Refresh Tokens**: Secure token management

## 🚀 Deployment

### Production Build
```bash
yarn build
yarn preview
```

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment.

### Database Migration
Run the schema on your production database:
```bash
mysql -u username -p database_name < database/schema.sql
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

## 🎥 Video Preview

Watch the application in action:

<video controls src="video_preview.pm4" title="Title"></video>

*Note: This video demonstrates the key features including authentication, task management, AI integration, and the responsive design.*

---

**Built with ❤️ using Nuxt 4, Vue 3, and modern web technologies.**