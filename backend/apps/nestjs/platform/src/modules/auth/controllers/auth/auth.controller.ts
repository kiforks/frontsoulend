import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { AuthService } from '../../services';
import { AuthGoogleGuard, AuthJwtGuard, AuthLocalGuard } from '../../guards';
import { AuthGoogleRequest, AuthLogin } from '../../types';

import { UserCreateDto, UserCurrent, UserEntity, UserService } from '../../../user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {}

	@Post('register')
	@ApiOkResponse({ description: 'Register successful', type: UserEntity })
	public register(@Body() dto: UserCreateDto): Promise<User> {
		return this.userService.create(dto);
	}

	@Post('login')
	@UseGuards(AuthLocalGuard)
	@ApiOkResponse({ description: 'Login successful', type: UserEntity })
	public login(@Req() { user }: { user: User }): AuthLogin {
		return this.authService.login(user);
	}

	@Get('profile')
	@UseGuards(AuthJwtGuard)
	@ApiOkResponse({ description: 'Returns the authenticated user', type: UserEntity })
	public profile(@UserCurrent() user: User): User {
		return user;
	}

	@Get('google/callback')
	@UseGuards(AuthGoogleGuard)
	@ApiOkResponse({ description: 'Returns the authenticated user' })
	public googleAuth(@Req() { user }: AuthGoogleRequest): Promise<string> {
		const email = user.emails?.at(0)?.value;

		if (!email) {
			throw new Error('Google email not found');
		}

		return this.authService.googleAuth(email);
	}
}
