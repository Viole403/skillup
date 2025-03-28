import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface SocialUserDto {
  email: string;
  name: string;
  googleId?: string;
  appleId?: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { password, ...userData } = createUserDto;

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async createSocialUser(
    socialUserDto: SocialUserDto,
  ): Promise<Omit<User, 'password'>> {
    // Create user with social login
    const user = await this.prisma.user.create({
      data: {
        email: socialUserDto.email,
        name: socialUserDto.name,
        googleId: socialUserDto.googleId,
        appleId: socialUserDto.appleId,
      },
    });

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateSocialIds(
    userId: string,
    socialUserDto: SocialUserDto,
  ): Promise<Omit<User, 'password'>> {
    // Update user with new social IDs
    const updateData: any = {};

    if (socialUserDto.googleId) {
      updateData.googleId = socialUserDto.googleId;
    }

    if (socialUserDto.appleId) {
      updateData.appleId = socialUserDto.appleId;
    }

    // Only update if there are social IDs to update
    if (Object.keys(updateData).length === 0) {
      const user = await this.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          googleId: true,
          appleId: true,
          // Exclude password
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        googleId: true,
        appleId: true,
        // Exclude password
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If updating email, check if the new email already exists
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    // If updating password, hash it
    let hashedPassword;
    if (updateUserDto.password) {
      hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Update user
    return this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        password: hashedPassword,
        name: updateUserDto.name,
        role: updateUserDto.role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        googleId: true,
        appleId: true,
        // Exclude password
      },
    });
  }

  async remove(id: string) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete user
    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }
}
