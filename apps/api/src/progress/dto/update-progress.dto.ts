import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProgressDto {
  @ApiProperty({
    description: 'Whether the lesson is completed',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({
    description: 'When the lesson was last viewed',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastViewed?: Date;
}
