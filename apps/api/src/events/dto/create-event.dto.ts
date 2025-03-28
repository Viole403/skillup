import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventType } from '@prisma/client';

export class CreateEventDto {
  @ApiProperty({
    description: 'The title of the event',
    example: 'Advanced Machine Learning Workshop',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the event',
    example:
      'Join us for an intensive workshop on advanced machine learning techniques...',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Date and time of the event',
    example: '2023-12-15T10:00:00Z',
    type: Date,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  eventDate: Date;

  @ApiProperty({
    description: 'Location of the event',
    example: 'Virtual (Zoom)',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Type of event',
    enum: EventType,
    example: EventType.WORKSHOP,
  })
  @IsNotEmpty()
  @IsEnum(EventType)
  eventType: EventType;

  @ApiProperty({
    description: 'URL to event image (optional)',
    required: false,
    example: 'https://example.com/events/workshop.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
