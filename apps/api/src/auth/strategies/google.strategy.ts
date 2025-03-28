import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { GoogleProfile } from '../../common/types/request.types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    } as any); // Type assertion needed for Passport strategy config
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ) {
    if (!profile.emails || profile.emails.length === 0) {
      return done(new Error('No email found from Google profile'), null);
    }

    const email = profile.emails[0].value;
    const name = `${profile.name.givenName} ${profile.name.familyName}`.trim();
    const googleId = profile.id;

    const user = await this.authService.findOrCreateSocialUser({
      email,
      name,
      googleId,
    });

    done(null, user);
  }
}
