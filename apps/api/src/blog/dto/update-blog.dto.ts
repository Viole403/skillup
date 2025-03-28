import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
  @ApiProperty({
    description: 'The updated title of the blog post',
    required: false,
    example: 'Updated: How to Master Programming in 30 Days',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The updated content of the blog post',
    required: false,
    example: 'This is the updated content of the blog post...',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'URL to an image for the blog post',
    required: false,
    example: 'https://example.com/images/updated-blog-image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
