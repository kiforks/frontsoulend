import { Prisma } from '@prisma/client';

import { IsString } from 'class-validator';

export class BrandCreateDto implements Prisma.BrandCreateInput {
	@IsString()
	public title!: string;
}
