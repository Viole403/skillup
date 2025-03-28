import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEnrollmentDto {
  @ApiProperty({
    description: 'The completion date of the enrollment',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  completionDate?: Date;
}
