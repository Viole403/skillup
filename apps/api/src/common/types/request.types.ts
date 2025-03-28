import { UserRole } from '@prisma/client';
import { Request } from 'express';

/**
 * Request with authenticated user interface
 */
export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: UserRole;
    name?: string;
  };
}

/**
 * User payload for authentication
 */
export interface UserPayload {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

/**
 * Google OAuth profile
 */
export interface GoogleProfile {
  id: string;
  name: {
    givenName: string;
    familyName: string;
  };
  emails: Array<{ value: string }>;
  photos?: Array<{ value: string }>;
}

/**
 * Apple OAuth profile
 */
export interface AppleProfile {
  id?: string;
  name?: string;
  email?: string;
}

/**
 * Apple OAuth request body
 */
export interface AppleRequestBody {
  firstName?: string;
  lastName?: string;
}

/**
 * JWT payload interface
 */
export interface JwtPayload {
  sub: string;
  email: string;
  role?: UserRole;
}
