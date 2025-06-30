import { Prisma } from '@prisma/client';

import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserCreateDto implements Prisma.UserCreateInput {
	@IsEmail()
	public email!: string;

	@IsOptional()
	@IsString()
	// eslint-disable-next-line no-magic-numbers
	@MinLength(6)
	public password?: string;

	@IsOptional()
	@IsString()
	public name?: string;
}
