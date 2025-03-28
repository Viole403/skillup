import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new event',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admins only' })
  create(@Request() req, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns all events with pagination',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.eventsService.findAll(page ? +page : 1, limit ? +limit : 10);
  }

  @Get('registered')
  @ApiOperation({ summary: 'Get events registered by the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Returns events registered by the authenticated user',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  getRegisteredEvents(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.eventsService.getRegisteredEvents(
      req.user.sub,
      page ? +page : 1,
      limit ? +limit : 10,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiResponse({ status: 200, description: 'Returns the event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Get(':id/attendees')
  @ApiOperation({ summary: 'Get attendees for an event (Admin only)' })
  @ApiResponse({ status: 200, description: 'Returns the event attendees' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admins only' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  getEventAttendees(
    @Request() req,
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.eventsService.getEventAttendees(
      id,
      page ? +page : 1,
      limit ? +limit : 10,
      req.user.role,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the event',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admins only' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto, req.user.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the event',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admins only' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  remove(@Request() req, @Param('id') id: string) {
    return this.eventsService.remove(id, req.user.role);
  }

  @Post(':id/register')
  @ApiOperation({ summary: 'Register for an event' })
  @ApiResponse({
    status: 201,
    description: 'Successfully registered for the event',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiResponse({
    status: 409,
    description: 'Already registered for this event',
  })
  registerForEvent(@Request() req, @Param('id') id: string) {
    return this.eventsService.registerForEvent(req.user.sub, id);
  }

  @Delete(':id/register')
  @ApiOperation({ summary: 'Cancel registration for an event' })
  @ApiResponse({
    status: 200,
    description: 'Successfully cancelled registration',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Event or registration not found' })
  cancelRegistration(@Request() req, @Param('id') id: string) {
    return this.eventsService.cancelRegistration(req.user.sub, id);
  }
}
