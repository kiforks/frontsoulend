import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { AuthService } from '../../services';
import { AuthJwtGuard, AuthLocalGuard } from '../../guards';

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
	public register(@Body() dto: UserCreateDto) {
		return this.userService.create(dto);
	}

	@Post('login')
	@UseGuards(AuthLocalGuard)
	@ApiOkResponse({ description: 'Login successful', type: UserEntity })
	public login(@Req() { user }: { user: User }) {
		return this.authService.login(user);
	}

	@Get('profile')
	@UseGuards(AuthJwtGuard)
	@ApiOkResponse({ description: 'Returns the authenticated user', type: UserEntity })
	public profile(@UserCurrent() user: User) {
		return user;
	}
}
