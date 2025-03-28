import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '@prisma/client';
import { UserPayload } from '../common/types/request.types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = (await bcrypt.compare(
      pass,
      user.password,
    )) as boolean;

    if (!isPasswordValid) {
      return null;
    }

    // Remove password from the user object
    const { password: _password, ...result } = user;
    return result;
  }

  async login(
    user: UserPayload,
  ): Promise<{ accessToken: string; user: UserPayload }> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        name: registerDto.name,
        role: UserRole.STUDENT, // Default role
      },
    });

    // Remove password from the user object
    const { password: _password, ...result } = user;

    // Generate JWT
    const payload = {
      sub: result.id,
      email: result.email,
      role: result.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: result,
    };
  }

  async findOrCreateSocialUser(socialUser: {
    email: string;
    name: string;
    googleId?: string;
    appleId?: string;
  }) {
    // Check if user exists with this email
    let user = await this.prisma.user.findUnique({
      where: { email: socialUser.email },
    });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: socialUser.email,
          name: socialUser.name,
          role: UserRole.STUDENT, // Default role
          googleId: socialUser.googleId,
          appleId: socialUser.appleId,
        },
      });
    } else {
      // If user exists but doesn't have googleId/appleId, update the user
      if (
        (socialUser.googleId && !user.googleId) ||
        (socialUser.appleId && !user.appleId)
      ) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: socialUser.googleId || user.googleId,
            appleId: socialUser.appleId || user.appleId,
          },
        });
      }
    }

    // Generate JWT
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Remove password from the user object if it exists
    const { password: _password, ...result } = user;

    return {
      accessToken: this.jwtService.sign(payload),
      user: result,
    };
  }

  async refreshToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Remove password from the user object
    const { password: _password, ...result } = user;

    return {
      accessToken: this.jwtService.sign(payload),
      user: result,
    };
  }
}
