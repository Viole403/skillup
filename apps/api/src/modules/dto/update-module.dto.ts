import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateModuleDto {
  @ApiPropertyOptional({
    description: 'Module title',
    example: 'Advanced HTML Techniques',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Order of this module in the course',
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  order?: number;
}
