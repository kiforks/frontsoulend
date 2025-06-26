import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { AuthService } from '../../services';
import { AuthJwtGuard, AuthLocalGuard } from '../../guards';

import { UserEntity } from '../../../user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@UseGuards(AuthLocalGuard)
	@ApiOkResponse({ description: 'Login successful', type: UserEntity })
	public login(@Req() { user }: { user: User }) {
		return this.authService.login(user);
	}

	@Get('profile')
	@UseGuards(AuthJwtGuard)
	@ApiOkResponse({ description: 'Returns the authenticated user', type: UserEntity })
	public profile(@Req() { user }: { user: User }) {
		return user;
	}
}
