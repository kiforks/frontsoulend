import { Injectable } from '@nestjs/common';

import { BrandCreateDto, BrandUpdateDto } from '../../dto';

import { PrismaService } from '../../../prisma';

@Injectable()
export class BrandService {
	constructor(private readonly prismaService: PrismaService) {}

	public create(dto: BrandCreateDto) {
		return this.prismaService.brand.create({ data: dto });
	}

	public findAll() {
		return this.prismaService.brand.findMany();
	}

	public findOne(id: number) {
		return this.prismaService.brand.findUnique({ where: { id } });
	}

	public update(id: number, dto: BrandUpdateDto) {
		return this.prismaService.brand.update({ where: { id }, data: dto });
	}

	public remove(id: number) {
		return this.prismaService.brand.delete({ where: { id } });
	}
}
