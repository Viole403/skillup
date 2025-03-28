import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The blog post ID to comment on',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  blogId: string;

  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a great blog post! Thanks for sharing.',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
