import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
	@ApiOperation({ summary: 'Register a new user' })
	@ApiBody({ type: UserCreateDto, description: 'User registration data' })
	@ApiOkResponse({ description: 'Register successful', type: UserEntity })
	@ApiBadRequestResponse({ description: 'Validation error or user already exists' })
	public register(@Body() dto: UserCreateDto): Promise<User> {
		return this.userService.create(dto);
	}

	@Post('login')
	@ApiOperation({ summary: 'Login with email and password' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: { type: 'string', example: 'user@example.com' },
				password: { type: 'string', example: 'your_password' },
			},
			required: ['email', 'password'],
		},
		description: 'Credentials for login',
	})
	@UseGuards(AuthLocalGuard)
	@ApiOkResponse({ description: 'Login successful', type: UserEntity })
	@ApiUnauthorizedResponse({ description: 'Invalid credentials' })
	public login(@Req() { user }: { user: User }): AuthLogin {
		return this.authService.login(user);
	}

	@Get('profile')
	@ApiOperation({ summary: 'Get authenticated user profile' })
	@UseGuards(AuthJwtGuard)
	@ApiOkResponse({ description: 'Returns the authenticated user', type: UserEntity })
	@ApiUnauthorizedResponse({ description: 'Unauthorized or token expired' })
	public profile(@UserCurrent() user: User): User {
		return user;
	}

	@Get('google/callback')
	@ApiOperation({ summary: 'Authenticate via Google OAuth2' })
	@UseGuards(AuthGoogleGuard)
	@ApiOkResponse({ description: 'Returns JWT token as string' })
	@ApiUnauthorizedResponse({ description: 'Google authentication failed' })
	public googleAuth(@Req() { user }: AuthGoogleRequest): Promise<string> {
		const email = user.emails?.at(0)?.value;

		if (!email) {
			throw new Error('Google email not found');
		}

		return this.authService.googleAuth(email);
	}
}
