# User Management Module

## Overview

The User Management module handles user authentication, registration, profile management, and authorization. It provides a secure foundation for user interactions within the platform.

## Authentication Features

The Authentication system provides the following capabilities:

- **User Registration**: Create new user accounts
- **User Login**: Authenticate users and issue JWT tokens
- **Password Recovery**: Reset forgotten passwords
- **Social Authentication**: Sign in with Google and Apple
- **Email Verification**: Verify user emails for account security

### Key Components:

- **AuthController**: Handles HTTP requests for authentication operations
- **AuthService**: Contains business logic for authentication
- **User Model**: Prisma schema for the user entity
- **JWT Strategy**: Passport strategy for JWT authentication
- **Guards**: Authentication and role-based guards

## User Management Features

The User management system provides the following functionality:

- **Profile Management**: Update user profile information
- **Role Management**: Assign and manage user roles
- **User Search**: Find users by various criteria
- **User Deactivation**: Temporarily or permanently deactivate accounts

### Key Components:

- **UsersController**: Handles HTTP requests for user operations
- **UsersService**: Contains business logic for user management
- **User Roles**: Enum defining available user roles
- **DTOs**: Data Transfer Objects for user creation and updates

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate a user and receive JWT token
- `POST /auth/refresh-token` - Refresh an expired JWT token
- `POST /auth/forgot-password` - Initiate password reset
- `POST /auth/reset-password` - Complete password reset
- `GET /auth/me` - Get the authenticated user's profile
- `POST /auth/verify-email` - Verify user's email address

### Social Authentication

- `GET /auth/google` - Initiate Google authentication
- `GET /auth/google/callback` - Google authentication callback
- `GET /auth/apple` - Initiate Apple authentication
- `POST /auth/apple/callback` - Apple authentication callback

### User Management

- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get a specific user
- `PATCH /users/:id` - Update a user
- `PATCH /users/:id/role` - Update a user's role (admin only)
- `DELETE /users/:id` - Delete a user
- `PATCH /users/:id/deactivate` - Deactivate a user account
- `PATCH /users/:id/activate` - Activate a user account

## Security

- JWT authentication is used for all protected endpoints
- Passwords are hashed using bcrypt
- Role-based access control is implemented
- Sensitive operations require re-authentication

## Data Model

### User

The User model includes the following key fields:

- **id**: Unique identifier
- **email**: User's email address (unique)
- **password**: Hashed password
- **firstName**: User's first name
- **lastName**: User's last name
- **role**: User's role (STUDENT, INSTRUCTOR, ADMIN)
- **isActive**: Whether the user account is active
- **createdAt**: When the user account was created
- **updatedAt**: When the user account was last updated

### JWT Payload

The JWT payload contains:

- **sub**: User ID
- **email**: User's email
- **role**: User's role
- **iat**: Issued at timestamp
- **exp**: Expiration timestamp

## Authorization Rules

- Public endpoints: register, login, forgot password
- User can only access/modify their own data
- Instructors can access/modify their own courses
- Administrators can access/modify all data