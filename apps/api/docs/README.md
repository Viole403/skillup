# Skillup API Documentation

## Overview

This documentation provides detailed information about the Skillup platform's API, including endpoints, data models, authentication, and best practices. The API is built using NestJS and follows RESTful principles.

## Authentication

The API uses JWT (JSON Web Token) authentication. To access protected endpoints:

1. Obtain a token by logging in via `/auth/login` or registering via `/auth/register`
2. Include the token in the `Authorization` header as `Bearer <token>`

## Core Modules

The API consists of several core modules, each documented separately:

- [**User Management**](./README-user-management.md) - User authentication, registration, and profile management
- [**Courses and Lessons**](./README-courses-lessons.md) - Course and lesson creation, management, and retrieval
- [**Enrollments and Progress**](./README-enrollments-progress.md) - User enrollment and progress tracking
- [**Community and Blog**](./README-community-blog.md) - Community posts, blogs, comments, and social interactions

## Project Architecture

- [**Monorepo Setup and Deployment**](./README-monorepo-deployment.md) - Monorepo architecture, Turborepo configuration, and Vercel deployment guide

## API Versioning

All API endpoints are prefixed with `/api/v1` to support versioning.

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

For errors:

```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... }
}
```

## Status Codes

The API uses standard HTTP status codes:

- `200 OK` - The request was successful
- `201 Created` - Resource was successfully created
- `400 Bad Request` - Invalid request or validation errors
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

API requests are rate-limited to prevent abuse. The current limits are:

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Pagination

List endpoints support pagination with the following query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `orderBy` - Field to order by
- `order` - Sort order (asc or desc)

Example: `/api/v1/courses?page=2&limit=20&orderBy=createdAt&order=desc`

## Swagger Documentation

Interactive API documentation is available at `/api/docs` when running the server.

## Testing the API

You can test the API using tools like Postman or cURL. Example requests are provided in each module's documentation.

## Error Handling

Errors are handled consistently throughout the API. Validation errors will include specific details about what failed.

## Data Models

The API uses the following primary data models:

- User
- Course
- Module
- Lesson
- Enrollment
- Progress
- CommunityPost
- Blog

See the Prisma schema for detailed field information.