import { Injectable } from '@nestjs/common';

import { ProductCreateDto, ProductUpdateDto } from '../../dto';

import { PrismaService } from '../../../prisma';

@Injectable()
export class ProductService {
	constructor(private readonly prismaService: PrismaService) {}

	public create(dto: ProductCreateDto) {
		return this.prismaService.product.create({ data: dto });
	}

	public findAll() {
		return this.prismaService.product.findMany();
	}

	public findOne(id: number) {
		return this.prismaService.product.findUnique({ where: { id } });
	}

	public update(id: number, dto: ProductUpdateDto) {
		return this.prismaService.product.update({ where: { id }, data: dto });
	}

	public remove(id: number) {
		return this.prismaService.product.delete({ where: { id } });
	}
}
