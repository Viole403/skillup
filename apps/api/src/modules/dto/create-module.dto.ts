import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({
    description: 'The title of the module',
    example: 'Introduction to HTML',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The order of the module in the course',
    example: 1,
  })
  @IsNumber()
  @Min(1)
  order: number;

  @ApiProperty({
    description: 'The ID of the course this module belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  courseId: string;
}
