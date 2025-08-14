import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class AuthGoogleStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService) {
		const clientID = configService.get('GOOGLE_CLIENT_ID');

		if (!clientID) {
			throw new Error('GOOGLE_CLIENT_ID is not defined');
		}

		const clientSecret = configService.get('GOOGLE_CLIENT_SECRET');

		if (!clientSecret) {
			throw new Error('GOOGLE_CLIENT_SECRET is not defined');
		}

		const callbackURL = configService.get('GOOGLE_CALLBACK_URL');

		if (!callbackURL) {
			throw new Error('GOOGLE_CALLBACK_URL is not defined');
		}

		super({
			clientID,
			clientSecret,
			callbackURL,
			scope: 'email',
		});
	}

	public validate(_accessToken: string, _refreshToken: string, profile: Profile): Profile {
		return profile;
	}
}
