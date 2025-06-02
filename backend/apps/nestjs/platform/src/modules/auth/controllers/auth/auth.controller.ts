import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { UserEntity } from '../../../user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	@Post('login')
	@UseGuards(AuthGuard('local'))
	@ApiOkResponse({ description: 'Login successful', type: UserEntity })
	public login(@Req() request: { user: User }) {
		return request.user;
	}
}
