import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommunityPostDto {
  @ApiProperty({
    description: 'The updated content of the community post',
    required: false,
    example: 'This is the updated content of my community post.',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'URL to an image for the post',
    required: false,
    example: 'https://example.com/images/updated-post-image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
