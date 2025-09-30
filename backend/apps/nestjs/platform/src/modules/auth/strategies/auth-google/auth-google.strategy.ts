import { EnvironmentService } from '@libs/nestjs/environment/services';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class AuthGoogleStrategy extends PassportStrategy(Strategy) {
	constructor(public readonly environmentService: EnvironmentService) {
		super({
			clientID: environmentService.get('GOOGLE_CLIENT_ID'),
			clientSecret: environmentService.get('GOOGLE_CLIENT_SECRET'),
			callbackURL: environmentService.get('GOOGLE_CALLBACK_URL'),
			scope: 'email',
		});
	}

	public validate(_accessToken: string, _refreshToken: string, profile: Profile): Profile {
		return profile;
	}
}
