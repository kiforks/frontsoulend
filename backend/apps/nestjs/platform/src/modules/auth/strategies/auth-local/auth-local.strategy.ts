import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';

import { AuthService } from '../../services';

import { Strategy } from 'passport-local';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'email' });
	}

	public async validate(email: string, password: string): Promise<User> {
		const user = await this.authService.validateUser(email, password);

		if (!user) {
			throw new Error('Wrong validation');
		}

		return user;
	}
}
