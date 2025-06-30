import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UserCreateDto, UserUpdateDto } from '../../dto';

import { PrismaService } from '../../../prisma';

import { hash } from 'bcrypt';
import { PrismaError } from 'prisma-error-enum';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	public async create(user: UserCreateDto) {
		const salt = 10;
		const password = user.password ? await hash(user.password, salt) : null;

		try {
			return await this.prismaService.user.create({
				data: { email: user.email, password, name: user.name ?? null },
			});
		} catch (error: unknown) {
			const prismaError = error as Prisma.PrismaClientKnownRequestError;

			if (prismaError.code === PrismaError.UniqueConstraintViolation) {
				throw new BadRequestException(`The following email "${user.email}" is already registered`);
			}

			throw error;
		}
	}

	public findAll() {
		return this.prismaService.user.findMany();
	}

	public findOne(id: number) {
		return this.prismaService.user.findUnique({ where: { id } });
	}

	public findByEmail(email: string) {
		return this.prismaService.user.findUnique({ where: { email } });
	}

	public update(id: number, dto: UserUpdateDto) {
		return this.prismaService.user.update({ where: { id }, data: dto });
	}

	public remove(id: number) {
		return this.prismaService.user.delete({ where: { id } });
	}
}
