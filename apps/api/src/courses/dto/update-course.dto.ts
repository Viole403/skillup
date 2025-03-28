import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateCourseDto {
  @ApiPropertyOptional({
    description: 'Course title',
    example: 'Advanced Web Development',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Course description',
    example: 'Take your web development skills to the next level',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Course price',
    example: 69.99,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'Course image URL',
    example: 'https://example.com/new-image.jpg',
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
