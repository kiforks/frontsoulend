import { Prisma } from '@prisma/client';

import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserCreateDto implements Prisma.UserCreateInput {
	@IsEmail()
	public email!: string;

	@IsString()
	// eslint-disable-next-line no-magic-numbers
	@MinLength(6)
	public password!: string;

	@IsString()
	public name!: string;
}
