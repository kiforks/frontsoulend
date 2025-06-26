import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { PrismaService } from '../../../prisma';

import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService
	) {}

	public login(user: User): Pick<User, 'email' | 'id'> & { token: string } {
		const { id, email } = user;

		return {
			id,
			email,
			token: this.jwtService.sign({ id, email }),
		};
	}

	public async validateUser(email: string, password: string): Promise<User | null> {
		const user = await this.prismaService.user.findUnique({ where: { email } });

		if (!user) {
			return null;
		}

		const isValidPassword = await compare(password, user.password);

		if (!isValidPassword) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
