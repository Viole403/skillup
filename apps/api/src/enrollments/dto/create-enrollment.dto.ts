import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEnrollmentDto {
  @ApiProperty({
    description: 'The ID of the course to enroll in',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @ApiProperty({
    description: 'The enrollment date',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  enrollmentDate?: Date;
}
