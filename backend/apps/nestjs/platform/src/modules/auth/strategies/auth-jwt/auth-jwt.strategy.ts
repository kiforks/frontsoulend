import { EnvironmentService } from '@libs/nestjs/environment/services';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { User } from '~prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
	constructor(public readonly environmentService: EnvironmentService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: environmentService.get('JWT_SECRET'),
		});
	}

	public validate({ id, email }: User): Pick<User, 'email' | 'id'> {
		return { id, email };
	}
}
