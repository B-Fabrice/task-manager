-- TaskFlow Database Schema
CREATE DATABASE IF NOT EXISTS taskflow;
USE taskflow;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Refresh tokens table
CREATE TABLE refresh_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample admin user (password: admin123)
INSERT INTO users (email, password_hash, role, first_name, last_name) VALUES 
('admin@taskflow.com', '$2b$10$8i6XVkGf2c/KfyV0fB0pbu5EVXEMPT3QqlOSj0eBV5nqS6sxH4j.6', 'admin', 'Admin', 'User');

-- Sample regular user (password: user123)
INSERT INTO users (email, password_hash, role, first_name, last_name) VALUES 
('user@taskflow.com', '$2b$10$Zci08aU1DRwvVIUM0K4Kguum3Mbs9Jti.wiKURVq4e0adMjzRiRwu', 'user', 'Regular', 'User');

-- Tasks table
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('To Do', 'In Progress', 'In Review', 'Completed') DEFAULT 'To Do',
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deadline TIMESTAMP NULL,
    created_by INT NOT NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample tasks
INSERT INTO tasks (title, description, status, assigned_to, created_by, deadline) VALUES 
('Design System Update', 'Update the design system with new color palette and typography guidelines', 'In Progress', 2, 1, DATE_ADD(NOW(), INTERVAL 7 DAY)),
('API Documentation', 'Create comprehensive API documentation for all endpoints', 'To Do', 2, 1, DATE_ADD(NOW(), INTERVAL 14 DAY)),
('User Authentication', 'Implement OAuth2 authentication flow', 'Completed', 2, 1, DATE_ADD(NOW(), INTERVAL -5 DAY)),
('Database Optimization', 'Optimize database queries and add proper indexing', 'In Review', 1, 1, DATE_ADD(NOW(), INTERVAL 3 DAY)),
('Mobile Responsiveness', 'Ensure all components are mobile responsive', 'To Do', 2, 1, DATE_ADD(NOW(), INTERVAL 10 DAY)),
('Frontend Testing', 'Write unit tests for React components', 'In Progress', 2, 1, DATE_ADD(NOW(), INTERVAL 5 DAY)),
('Code Review', 'Review pull requests from the development team', 'To Do', 2, 1, DATE_ADD(NOW(), INTERVAL 2 DAY)),
('Performance Audit', 'Analyze and improve application performance', 'In Review', 2, 1, DATE_ADD(NOW(), INTERVAL 1 DAY));
