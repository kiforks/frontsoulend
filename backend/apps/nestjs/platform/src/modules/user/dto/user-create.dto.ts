import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Prisma } from '~prisma/client';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserCreateDto implements Prisma.UserCreateInput {
	@ApiProperty({
		example: 'user@example.com',
		description: 'User email address',
	})
	@IsEmail()
	public email!: string;

	@ApiPropertyOptional({
		example: 'bpqmz_2$t3ka352s',
		description: 'User password (minimum 6 characters)',
		minLength: 6,
	})
	@IsOptional()
	@IsString()
	// eslint-disable-next-line no-magic-numbers
	@MinLength(6)
	public password?: string;

	@ApiPropertyOptional({
		example: 'John',
		description: 'User name',
	})
	@IsOptional()
	@IsString()
	public name?: string;
}
