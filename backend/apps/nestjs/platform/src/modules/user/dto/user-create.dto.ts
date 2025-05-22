import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
	@IsEmail()
	public email!: string;

	@IsOptional()
	@IsString()
	// eslint-disable-next-line no-magic-numbers
	@MinLength(6)
	public password?: string;
}
