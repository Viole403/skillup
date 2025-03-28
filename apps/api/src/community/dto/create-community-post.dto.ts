import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCommunityPostDto {
  @ApiProperty({
    description: 'The content of the community post',
    example:
      'This is a community post about the new course I just enrolled in!',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'URL to an image for the post (optional)',
    required: false,
    example: 'https://example.com/images/post-image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
