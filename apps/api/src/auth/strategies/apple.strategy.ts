import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-apple';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import {
  AppleProfile,
  AppleRequestBody,
} from '../../common/types/request.types';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('APPLE_CLIENT_ID'),
      teamID: configService.get<string>('APPLE_TEAM_ID'),
      keyID: configService.get<string>('APPLE_KEY_ID'),
      keyFilePath: configService.get<string>('APPLE_KEY_FILE_PATH'),
      callbackURL: configService.get<string>('APPLE_CALLBACK_URL'),
      passReqToCallback: true,
      scope: ['email', 'name'],
    } as any); // Type assertion needed for Passport strategy config
  }

  async validate(
    request: Request,
    accessToken: string,
    refreshToken: string,
    idToken: string,
    profile: AppleProfile,
    done: (error: Error | null, user: any) => void,
  ) {
    // Apple doesn't provide profile info by default, so we need to get it from the idToken
    // or from the request.body when registering
    let name = '';
    if (profile && profile.name) {
      name = profile.name;
    } else if (request.body) {
      const appleBody = request.body as AppleRequestBody;
      const firstName = appleBody.firstName || '';
      const lastName = appleBody.lastName || '';
      name = `${firstName} ${lastName}`.trim();
    }

    let email: string | null = null;
    if (profile && profile.email) {
      email = profile.email;
    } else if (idToken) {
      email = this.extractEmailFromToken(idToken);
    }

    if (!email) {
      return done(new Error('No email provided by Apple'), null);
    }

    const emailNamePart = email.split('@')[0];
    const userId = profile && profile.id ? profile.id : idToken;

    const user = await this.authService.findOrCreateSocialUser({
      email,
      name: name || emailNamePart, // Use part of email as name if no name provided
      appleId: userId, // Use idToken as id if profile.id not available
    });

    done(null, user);
  }

  private extractEmailFromToken(idToken: string): string | null {
    try {
      // Simple JWT payload extraction - in production, you'd want to verify the token
      const tokenParts = idToken.split('.');
      if (tokenParts.length !== 3) {
        return null;
      }

      const payload = tokenParts[1];
      const decodedBuffer = Buffer.from(payload, 'base64');
      const decodedJson = decodedBuffer.toString('utf8');
      const decoded = JSON.parse(decodedJson);

      return decoded && decoded.email ? decoded.email : null;
    } catch (_error) {
      return null;
    }
  }
}
