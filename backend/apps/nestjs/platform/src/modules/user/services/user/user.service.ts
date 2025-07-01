import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UserCreateDto, UserUpdateDto } from '../../dto';
import { UserHelper } from '../../helpers';

import { PrismaService } from '../../../prisma';
import { RedisService } from '../../../redis';
import { UserEntity } from '../../entities';
import { UserSearchService } from '../user-search';

import { hash } from 'bcrypt';
import { PrismaError } from 'prisma-error-enum';

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService,
		private readonly userSearchService: UserSearchService
	) {}

	public async create(user: UserCreateDto) {
		const salt = 10;
		const password = user.password ? await hash(user.password, salt) : null;

		try {
			const createdUser = await this.prismaService.user.create({
				data: { email: user.email, password, name: user.name ?? null },
			});

			await this.redisService.set(UserHelper.getRedisId(createdUser.id), createdUser);
			await this.redisService.set(UserHelper.getRedisEmail(createdUser.email), createdUser);
			await this.userSearchService.index(createdUser);

			return createdUser;
		} catch (error: unknown) {
			const prismaError = error as Prisma.PrismaClientKnownRequestError;

			if (prismaError.code === PrismaError.UniqueConstraintViolation) {
				throw new BadRequestException(`The following email "${user.email}" is already registered`);
			}

			throw error;
		}
	}

	public async findOne(id: number) {
		const cacheKey = UserHelper.getRedisId(id);
		const cached = await this.redisService.get<UserEntity>(cacheKey);

		if (cached) {
			return cached;
		}

		const user = await this.prismaService.user.findUnique({ where: { id } });

		if (user) {
			await this.redisService.set(cacheKey, user);
		}

		return user;
	}

	public async findByEmail(email: string) {
		const cacheKey = UserHelper.getRedisEmail(email);
		const cached = await this.redisService.get<UserEntity>(cacheKey);

		if (cached) {
			return cached;
		}

		const user = await this.prismaService.user.findUnique({ where: { email } });

		if (user) {
			await this.redisService.set(cacheKey, user);
		}

		return user;
	}

	public async update(id: number, dto: UserUpdateDto) {
		const updatedUser = await this.prismaService.user.update({ where: { id }, data: dto });

		await this.redisService.set(UserHelper.getRedisId(updatedUser.id), updatedUser);
		await this.redisService.set(UserHelper.getRedisEmail(updatedUser.email), updatedUser);
		await this.userSearchService.update(updatedUser.id, dto);

		return updatedUser;
	}

	public async remove(id: number) {
		const removedUser = await this.prismaService.user.delete({ where: { id } });

		await this.redisService.del(UserHelper.getRedisId(removedUser.id));
		await this.redisService.del(UserHelper.getRedisEmail(removedUser.email));
		await this.userSearchService.remove(removedUser.id);

		return removedUser;
	}

	public findAll() {
		return this.prismaService.user.findMany();
	}
}
