import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsUUID,
} from 'class-validator';

enum LectureStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class UpdateLectureDto {
  @ApiProperty({
    description: 'Title of the lecture',
    example: 'Updated Introduction to Web Development',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Description of the lecture',
    example: 'Updated comprehensive introduction to modern web development',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Objectives of the lecture',
    example:
      'Updated objectives to understand basics of HTML, CSS, and JavaScript',
    required: false,
  })
  @IsOptional()
  @IsString()
  objectives?: string;

  @ApiProperty({
    description: 'Target audience for the lecture',
    example: 'Updated audience: Beginner programmers and CS students',
    required: false,
  })
  @IsOptional()
  @IsString()
  targetAudience?: string;

  @ApiProperty({
    description: 'Prerequisites for the lecture',
    example: 'Updated: Basic computer knowledge and HTML familiarity',
    required: false,
  })
  @IsOptional()
  @IsString()
  prerequisites?: string;

  @ApiProperty({
    description: 'Proposed date for the lecture',
    example: '2023-12-20T15:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  proposedDate?: string;

  @ApiProperty({
    description: 'Duration of the lecture in minutes',
    example: 90,
    required: false,
  })
  @IsOptional()
  duration?: number;

  @ApiProperty({
    description: 'Additional notes for the lecture',
    example: 'Updated: Will need projector, audio setup, and whiteboard',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Course ID related to the lecture',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  courseId?: string;

  @ApiProperty({
    description: 'Status of the lecture application',
    enum: LectureStatus,
    example: 'APPROVED',
    required: false,
  })
  @IsOptional()
  @IsEnum(LectureStatus)
  status?: LectureStatus;

  @ApiProperty({
    description: 'Feedback on the lecture application',
    example: 'Great lecture idea, approved with minor adjustments to content',
    required: false,
  })
  @IsOptional()
  @IsString()
  feedback?: string;
}
