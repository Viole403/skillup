import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Public } from './decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../common/types/request.types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBody({ type: LoginDto })
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user profile',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Returns a new access token',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  refreshToken(@Request() req: RequestWithUser) {
    return this.authService.refreshToken(req.user.id);
  }

  // Google OAuth2 endpoints
  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Login with Google' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Google OAuth',
  })
  googleAuth() {
    // This route initiates the Google OAuth flow
    // The guard handles the authentication
  }

  @Get('google/callback')
  @Public()
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({
    status: 302,
    description: 'Redirects back to the application with authentication token',
  })
  googleAuthCallback(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  // Apple OAuth2 endpoints
  @Get('apple')
  @Public()
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Login with Apple' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Apple OAuth',
  })
  appleAuth() {
    // This route initiates the Apple OAuth flow
    // The guard handles the authentication
  }

  @Get('apple/callback')
  @Public()
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Apple OAuth callback' })
  @ApiResponse({
    status: 302,
    description: 'Redirects back to the application with authentication token',
  })
  appleAuthCallback(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
}
