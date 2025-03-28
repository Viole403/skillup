import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsUUID,
} from 'class-validator';

enum LectureStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class CreateLectureDto {
  @ApiProperty({
    description: 'Title of the lecture',
    example: 'Introduction to Web Development',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the lecture',
    example: 'A comprehensive introduction to modern web development',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Objectives of the lecture',
    example: 'Understand basics of HTML, CSS, and JavaScript',
  })
  @IsNotEmpty()
  @IsString()
  objectives: string;

  @ApiProperty({
    description: 'Target audience for the lecture',
    example: 'Beginner programmers and CS students',
  })
  @IsNotEmpty()
  @IsString()
  targetAudience: string;

  @ApiProperty({
    description: 'Prerequisites for the lecture',
    example: 'Basic computer knowledge',
  })
  @IsOptional()
  @IsString()
  prerequisites?: string;

  @ApiProperty({
    description: 'Proposed date for the lecture',
    example: '2023-12-15T14:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  proposedDate: string;

  @ApiProperty({
    description: 'Duration of the lecture in minutes',
    example: 60,
  })
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    description: 'Additional notes for the lecture',
    example: 'Will need projector and audio setup',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Course ID related to the lecture',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  courseId?: string;
}
