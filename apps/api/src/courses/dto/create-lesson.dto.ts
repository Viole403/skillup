import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({
    description: 'The title of the lesson',
    example: 'Introduction to TypeScript Types',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the lesson',
    example:
      'TypeScript provides several basic types that you can use to build more complex types...',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The URL of the lesson video',
    example: 'https://example.com/videos/typescript-types.mp4',
    required: false,
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiProperty({
    description: 'The order of the lesson in the module',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  order: number;
}
