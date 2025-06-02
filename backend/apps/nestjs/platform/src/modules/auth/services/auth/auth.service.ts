import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../../../prisma';
import { UserModel } from '../../../user';

import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private readonly prismaService: PrismaService) {}

	public async validateUser(email: string, password: string): Promise<UserModel | null> {
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
