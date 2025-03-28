import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'The updated content of the comment',
    example: 'This is the updated comment content.',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
