import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    description: 'The title of the blog post',
    example: 'How to Master Programming in 30 Days',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the blog post',
    example: 'This is a detailed guide about mastering programming...',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'URL to an image for the blog post (optional)',
    required: false,
    example: 'https://example.com/images/blog-image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
