import { Prisma } from '@prisma/client';

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductCreateDto implements Prisma.ProductCreateInput {
	@IsString()
	public title!: string;

	@IsString()
	@IsOptional()
	public description?: string;

	@IsNumber()
	public price!: number;
}
