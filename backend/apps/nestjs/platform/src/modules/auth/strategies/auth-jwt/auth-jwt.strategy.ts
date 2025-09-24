import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { User } from '~prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
	constructor(public readonly configService: ConfigService) {
		const secretOrKey = configService.get('JWT_SECRET');

		if (!secretOrKey) {
			throw new Error('JWT_SECRET is not defined');
		}

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey,
		});
	}

	public validate({ id, email }: User): Pick<User, 'email' | 'id'> {
		return { id, email };
	}
}
