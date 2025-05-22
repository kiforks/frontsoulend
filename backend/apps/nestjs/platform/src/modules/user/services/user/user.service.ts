import { Injectable } from '@nestjs/common';

import { UserCreateDto, UserUpdateDto } from '../../dto';

import { PrismaService } from '../../../prisma';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	public create(dto: UserCreateDto) {
		return this.prismaService.user.create({ data: dto });
	}

	public findAll() {
		return this.prismaService.user.findMany();
	}

	public findOne(id: number) {
		return this.prismaService.user.findUnique({ where: { id } });
	}

	public update(id: number, dto: UserUpdateDto) {
		return this.prismaService.user.update({ where: { id }, data: dto });
	}

	public remove(id: number) {
		return this.prismaService.user.delete({ where: { id } });
	}
}
