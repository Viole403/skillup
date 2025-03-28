import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateLessonDto {
  @ApiPropertyOptional({
    description: 'The title of the lesson',
    example: 'Updated: Introduction to HTML Tags',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'The content of the lesson',
    example:
      '# Updated HTML Tags\n\nHTML tags are the building blocks of web pages...',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'The order of the lesson in the module',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  order?: number;
}
