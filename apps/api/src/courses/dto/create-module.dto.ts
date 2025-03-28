import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({
    description: 'The title of the module',
    example: 'Getting Started with TypeScript',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The order of the module in the course',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  order: number;
}
