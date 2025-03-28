# Community and Blog Features

[![Turborepo](https://img.shields.io/badge/built%20with-turborepo-cc00ff.svg?style=flat&logo=turborepo)](https://turborepo.org/) [![Vercel Production Deployment](https://img.shields.io/badge/vercel-production-brightgreen?logo=vercel)](https://skillup.masalief.my.id/) [![Vercel Preview Deployment](https://img.shields.io/badge/vercel-preview-orange?logo=vercel)](https://preview.skillup.masalief.my.id/)


## Overview

This module implements community and blog features for the learning platform, enabling users to create and interact with community posts and blog content.

## Community Feature

The Community feature allows users to share posts with the learning community. It offers the following capabilities:

- **Create Community Posts**: Users can create posts to share with the community
- **View Community Posts**: Users can view posts from other community members
- **Update/Delete Posts**: Users can manage their own posts
- **Pagination**: Efficient loading of community content

### Key Components:

- **CommunityController**: Handles HTTP requests for community operations
- **CommunityService**: Contains business logic for community post management
- **CommunityPost Model**: Prisma schema for the community post entity
- **DTOs**: Data Transfer Objects for post creation and updates

## Blog Feature

The Blog feature provides a comprehensive blogging platform with social interactions. It offers the following functionality:

- **Blog Management**: Create, read, update, and delete blog posts
- **Comments**: Comment on blog posts and manage comments
- **Likes**: Like/unlike blog posts and check like status
- **Views**: Track blog post views
- **Statistics**: View engagement statistics (likes, views, comments)

### Key Components:

- **BlogController**: Handles HTTP requests for blog operations
- **BlogService**: Contains business logic for blog management
- **Blog Models**: Prisma schemas for Blog, Comment, Like, and View entities
- **DTOs**: Data Transfer Objects for blog and comment operations

## API Endpoints

### Community

- `POST /community` - Create a new community post
- `GET /community` - Get all community posts with pagination
- `GET /community/me` - Get posts by the authenticated user
- `GET /community/user/:userId` - Get posts by a specific user
- `GET /community/:id` - Get a specific community post
- `PATCH /community/:id` - Update a community post
- `DELETE /community/:id` - Delete a community post

### Blog

- `POST /blog` - Create a new blog post
- `GET /blog` - Get all blog posts with pagination
- `GET /blog/me` - Get blogs by the authenticated user
- `GET /blog/author/:authorId` - Get blogs by a specific author
- `GET /blog/:id` - Get a specific blog post
- `PATCH /blog/:id` - Update a blog post
- `DELETE /blog/:id` - Delete a blog post
- `GET /blog/:id/stats` - Get blog post statistics

### Blog Comments

- `POST /blog/comment` - Create a new comment
- `PATCH /blog/comment/:id` - Update a comment
- `DELETE /blog/comment/:id` - Delete a comment

### Blog Likes

- `POST /blog/:id/like` - Like or unlike a blog post
- `GET /blog/:id/liked` - Check if user has liked a blog post

## Security

All endpoints are protected with JWT authentication. Users can only update or delete their own content, with special permissions for administrators.

## Data Relationships

- **CommunityPost**: Belongs to one User
- **Blog**: Belongs to one User (author), has many Comments, Likes, and Views
- **Comment**: Belongs to one Blog and one User
- **Like**: Belongs to one Blog and one User
- **View**: Belongs to one Blog and one User

## Authorization Rules

- Users can create community posts and blog posts
- Users can only update/delete their own posts
- Administrators can update/delete any posts
- Blog authors can delete comments on their blogs
- Comment authors can update/delete their own comments
- Administrators can delete any comments
