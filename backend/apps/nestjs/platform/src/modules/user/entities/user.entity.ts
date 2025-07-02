import { ApiProperty } from '@nestjs/swagger';

import { User } from '../types';

export class UserEntity implements User {
	@ApiProperty({ example: 1, description: 'Unique identifier of the user' })
	public id!: number;

	@ApiProperty({ example: 'user@example.com', description: 'Email address of the user' })
	public email!: string;

	@ApiProperty({ example: 'Some password', description: 'Hashed password of the user' })
	public password!: string;

	@ApiProperty({ example: 'John', description: 'Name of the user' })
	public name!: string;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Date when the user was created (ISO string)' })
	public createdAt!: Date;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Date when the user was last updated (ISO string)' })
	public updatedAt!: Date;
}
