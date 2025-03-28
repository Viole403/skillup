import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateProgressDto {
  @ApiProperty({
    description: 'The ID of the lesson to track progress for',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  lessonId: string;

  @ApiProperty({
    description: 'Whether the lesson is completed',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
