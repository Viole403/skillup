import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to the newsletter' })
  @ApiResponse({
    status: 201,
    description: 'Successfully subscribed to the newsletter',
  })
  @ApiResponse({
    status: 409,
    description: 'Email is already subscribed to the newsletter',
  })
  subscribe(@Body() subscribeNewsletterDto: SubscribeNewsletterDto) {
    return this.newsletterService.subscribe(subscribeNewsletterDto);
  }

  @Delete('unsubscribe/:email')
  @ApiOperation({ summary: 'Unsubscribe from the newsletter' })
  @ApiResponse({
    status: 200,
    description: 'Successfully unsubscribed from the newsletter',
  })
  @ApiResponse({
    status: 404,
    description: 'Email not found in newsletter subscriptions',
  })
  @ApiParam({
    name: 'email',
    description: 'Email to unsubscribe',
    example: 'user@example.com',
  })
  unsubscribe(@Param('email') email: string) {
    return this.newsletterService.unsubscribe(email);
  }

  @Get('verify/:email')
  @ApiOperation({
    summary: 'Verify if an email is subscribed to the newsletter',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns subscription status',
  })
  @ApiParam({
    name: 'email',
    description: 'Email to verify',
    example: 'user@example.com',
  })
  verifySubscription(@Param('email') email: string) {
    return this.newsletterService.verifySubscription(email);
  }

  @Get('subscribers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all newsletter subscribers (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Returns all newsletter subscribers',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admins only' })
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
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'Show only active subscriptions',
  })
  getAllSubscribers(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('activeOnly') activeOnly?: boolean,
  ) {
    // Check if user is admin
    if (req.user.role !== UserRole.ADMIN) {
      throw new Error('Forbidden - Admins only');
    }

    return this.newsletterService.getAllSubscribers(
      page ? +page : 1,
      limit ? +limit : 100,
      activeOnly === undefined
        ? true
        : typeof activeOnly === 'string' ? activeOnly === 'true' : Boolean(activeOnly),
    );
  }
}
