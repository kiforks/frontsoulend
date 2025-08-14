import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { AuthLogin } from '../../types';

import { PrismaService } from '../../../prisma';
import { UserService } from '../../../user';

import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	public async validateUser(email: string, password: string): Promise<User | null> {
		const user = await this.prismaService.user.findUnique({ where: { email } });

		if (!user?.password) {
			return null;
		}

		const isValidPassword = await compare(password, user.password);

		if (!isValidPassword) {
			throw new UnauthorizedException();
		}

		return user;
	}

	public async googleAuth(email: string): Promise<string> {
		let user = await this.userService.findByEmail(email);

		user ??= await this.userService.create({ email });

		return this.jwtService.sign({ id: user.id, email });
	}

	public login(user: User): AuthLogin {
		const { id, email } = user;

		return {
			id,
			email,
			token: this.jwtService.sign({ id, email }),
		};
	}
}
