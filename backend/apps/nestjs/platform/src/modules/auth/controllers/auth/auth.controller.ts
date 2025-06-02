import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserEntity, UserModel } from '../../../user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	@Post('login')
	@UseGuards(AuthGuard('local'))
	@ApiOkResponse({ description: 'Login successful', type: UserEntity })
	public login(@Req() request: { user: UserModel }) {
		return request.user;
	}
}
