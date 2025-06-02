import { ApiProperty } from '@nestjs/swagger';
import { Brand as PrismaBrand } from '@prisma/client';

export class BrandEntity implements PrismaBrand {
	@ApiProperty({ example: 1 })
	public id!: number;

	@ApiProperty({ example: 'Title' })
	public title!: string;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
	public createdAt!: Date;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
	public updatedAt!: Date;
}
