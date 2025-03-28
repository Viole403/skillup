# Enrollments and Progress Modules

## Overview

These modules handle user enrollment into courses and tracking user progress through lessons. They provide a complete solution for managing user learning journeys within the platform.

## Enrollments Module

The Enrollments module manages user enrollment in courses. It offers the following capabilities:

- **Enroll a user in a course**: Create a new enrollment record for a user in a course
- **Get enrollments**: Retrieve all enrollments for a user or all enrollments for a course
- **Check enrollment status**: Determine if a user is enrolled in a specific course
- **Update enrollment**: Update enrollment status (e.g., mark as completed, update progress)
- **Delete enrollment**: Remove a user's enrollment from a course

### Key Components:

- **EnrollmentsController**: Handles HTTP requests for enrollment operations
- **EnrollmentsService**: Contains business logic for enrollment management
- **Enrollment Model**: Prisma schema for the enrollment entity
- **DTOs**: Data Transfer Objects for enrollment creation and updates

## Progress Module

The Progress module tracks user progress through course lessons. It provides the following functionality:

- **Track lesson completion**: Record when a user completes a lesson
- **Track lesson views**: Record when a user views a lesson
- **Calculate course progress**: Determine percentage of course completion
- **Get user progress**: Retrieve progress information for a user across courses
- **Get course progress**: Get detailed progress information for a specific course

### Key Components:

- **ProgressController**: Handles HTTP requests for progress tracking
- **ProgressService**: Contains business logic for progress management
- **Progress Model**: Prisma schema for the progress entity
- **DTOs**: Data Transfer Objects for progress creation and updates

## API Endpoints

### Enrollments

- `POST /enrollments` - Enroll a user in a course
- `GET /enrollments` - Get all enrollments for the authenticated user
- `GET /enrollments/course/:courseId` - Get all enrollments for a specific course
- `GET /enrollments/:id` - Get a specific enrollment
- `PATCH /enrollments/:id` - Update an enrollment
- `DELETE /enrollments/:id` - Delete an enrollment

### Progress

- `POST /progress` - Create or update lesson progress
- `GET /progress` - Get all progress for the authenticated user
- `GET /progress/course/:courseId` - Get all progress for a specific course
- `GET /progress/course/:courseId/summary` - Get progress summary for a course
- `GET /progress/:id` - Get progress by ID
- `PATCH /progress/:id` - Update progress

## Security

All endpoints are protected with JWT authentication. Users can only access their own enrollment and progress data, with special permissions for instructors and administrators.

## Data Relationships

- An **Enrollment** belongs to one **User** and one **Course**
- A **Progress** record belongs to one **User** and one **Lesson**
- A **Lesson** belongs to one **Module**, which belongs to one **Course**
- Progress is aggregated at the **Course** level for overall completion metrics