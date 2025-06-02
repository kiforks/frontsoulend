import { ApiProperty } from '@nestjs/swagger';
import { Product as PrismaProduct } from '@prisma/client';

export class ProductEntity implements PrismaProduct {
	@ApiProperty({ example: 1 })
	public id!: number;

	@ApiProperty({ example: 'Title' })
	public title!: string;

	@ApiProperty({ example: 'Description' })
	public description!: string;

	@ApiProperty({ example: 100 })
	public price!: number;

	@ApiProperty({ example: 1 })
	public brandId!: number;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
	public createdAt!: Date;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
	public updatedAt!: Date;
}
