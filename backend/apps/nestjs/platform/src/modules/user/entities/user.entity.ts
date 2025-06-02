import { ApiProperty } from '@nestjs/swagger';
import { User as PrismaUser } from '@prisma/client';

export class UserEntity implements PrismaUser {
	@ApiProperty({ example: 1 })
	public id!: number;

	@ApiProperty({ example: 'user@example.com' })
	public email!: string;

	@ApiProperty({ example: 'Some password' })
	public password!: string;

	@ApiProperty({ example: 'John' })
	public name!: string;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
	public createdAt!: Date;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
	public updatedAt!: Date;
}
