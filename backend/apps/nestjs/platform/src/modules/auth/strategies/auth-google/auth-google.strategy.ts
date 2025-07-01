import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class AuthGoogleStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService) {
		super({
			clientID: configService.get('GOOGLE_CLIENT_ID') as string,
			clientSecret: configService.get('GOOGLE_CLIENT_SECRET') as string,
			callbackURL: configService.get('GOOGLE_CALLBACK_URL') as string,
			scope: 'email',
		});
	}

	public validate(_accessToken: string, _refreshToken: string, profile: Profile): Profile {
		return profile;
	}
}
