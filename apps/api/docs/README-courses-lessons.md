# Courses and Lessons Module

## Overview

The Courses and Lessons module is the core of the learning platform, providing capabilities for creating, managing, and consuming educational content. It handles courses, modules, lessons, and related educational resources.

## Courses Feature

The Courses feature enables the creation and management of courses. It offers the following capabilities:

- **Course Management**: Create, read, update, and delete courses
- **Course Search**: Find courses by various criteria
- **Course Filtering**: Filter courses by category, difficulty, etc.
- **Featured Courses**: Highlight specific courses on the platform
- **Course Ratings**: Track and display course ratings and reviews

### Key Components:

- **CoursesController**: Handles HTTP requests for course operations
- **CoursesService**: Contains business logic for course management
- **Course Model**: Prisma schema for the course entity
- **DTOs**: Data Transfer Objects for course creation and updates

## Modules Feature

The Modules feature organizes courses into logical sections. It provides the following functionality:

- **Module Management**: Create, read, update, and delete modules within courses
- **Module Ordering**: Arrange modules in a specific sequence
- **Module Status**: Track module completion status

### Key Components:

- **ModulesController**: Handles HTTP requests for module operations
- **ModulesService**: Contains business logic for module management
- **Module Model**: Prisma schema for the module entity
- **DTOs**: Data Transfer Objects for module creation and updates

## Lessons Feature

The Lessons feature represents individual learning units within modules. It offers:

- **Lesson Management**: Create, read, update, and delete lessons
- **Lesson Content**: Store and deliver various content types (text, video, etc.)
- **Lesson Ordering**: Arrange lessons in a specific sequence
- **Lesson Completion**: Track lesson completion status

### Key Components:

- **LessonsController**: Handles HTTP requests for lesson operations
- **LessonsService**: Contains business logic for lesson management
- **Lesson Model**: Prisma schema for the lesson entity
- **DTOs**: Data Transfer Objects for lesson creation and updates

## API Endpoints

### Courses

- `POST /courses` - Create a new course
- `GET /courses` - Get all courses with pagination and filtering
- `GET /courses/featured` - Get featured courses
- `GET /courses/search` - Search courses
- `GET /courses/:id` - Get a specific course
- `PATCH /courses/:id` - Update a course
- `DELETE /courses/:id` - Delete a course
- `POST /courses/:id/rate` - Rate a course
- `GET /courses/:id/ratings` - Get course ratings

### Modules

- `POST /modules` - Create a new module
- `GET /modules/course/:courseId` - Get all modules for a specific course
- `GET /modules/:id` - Get a specific module
- `PATCH /modules/:id` - Update a module
- `PATCH /modules/:id/order` - Update module order
- `DELETE /modules/:id` - Delete a module

### Lessons

- `POST /lessons` - Create a new lesson
- `GET /lessons/module/:moduleId` - Get all lessons for a specific module
- `GET /lessons/:id` - Get a specific lesson
- `PATCH /lessons/:id` - Update a lesson
- `PATCH /lessons/:id/order` - Update lesson order
- `DELETE /lessons/:id` - Delete a lesson

## Security

All endpoints (except public course listings) are protected with JWT authentication. Create/update/delete operations have role-based access control.

## Data Relationships

- A **Course** has many **Modules**
- A **Module** belongs to one **Course** and has many **Lessons**
- A **Lesson** belongs to one **Module**
- A **Course** is created by one **User** (instructor)
- A **Course** can have many **Enrollments**
- A **Lesson** can have many **Progress** records

## Data Models

### Course

Key fields:
- **id**: Unique identifier
- **title**: Course title
- **description**: Course description
- **category**: Course category
- **difficulty**: Course difficulty level
- **price**: Course price
- **isFeatured**: Whether the course is featured
- **isPublished**: Whether the course is published
- **instructorId**: ID of the course instructor
- **createdAt**: When the course was created
- **updatedAt**: When the course was last updated

### Module

Key fields:
- **id**: Unique identifier
- **title**: Module title
- **description**: Module description
- **order**: Display order within the course
- **courseId**: ID of the parent course
- **createdAt**: When the module was created
- **updatedAt**: When the module was last updated

### Lesson

Key fields:
- **id**: Unique identifier
- **title**: Lesson title
- **content**: Lesson content (text, HTML, or reference to video/files)
- **contentType**: Type of content (TEXT, VIDEO, QUIZ, etc.)
- **duration**: Estimated time to complete (in minutes)
- **order**: Display order within the module
- **moduleId**: ID of the parent module
- **createdAt**: When the lesson was created
- **updatedAt**: When the lesson was last updated

## Authorization Rules

- Anyone can view published courses and their details
- Only instructors and admins can create courses
- Only the course instructor and admins can update/delete a course
- Only the course instructor and admins can add/update/delete modules and lessons