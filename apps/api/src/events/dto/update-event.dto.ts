import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { EventType } from '@prisma/client';

export class UpdateEventDto {
  @ApiProperty({
    description: 'The title of the event',
    required: false,
    example: 'Updated: Advanced Machine Learning Workshop',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Detailed description of the event',
    required: false,
    example: 'Updated description for the workshop...',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Date and time of the event',
    required: false,
    example: '2023-12-16T11:00:00Z',
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  eventDate?: Date;

  @ApiProperty({
    description: 'Location of the event',
    required: false,
    example: 'Virtual (Google Meet)',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'Type of event',
    required: false,
    enum: EventType,
    example: EventType.WEBINAR,
  })
  @IsOptional()
  @IsEnum(EventType)
  eventType?: EventType;

  @ApiProperty({
    description: 'URL to event image',
    required: false,
    example: 'https://example.com/events/updated-workshop.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
