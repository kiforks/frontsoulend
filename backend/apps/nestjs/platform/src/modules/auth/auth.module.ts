import { EnvironmentService } from '@libs/nestjs/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services';

import { UserModule } from '../user';
import { AuthController } from './controllers';
import { AuthGoogleStrategy, AuthJwtStrategy, AuthLocalStrategy } from './strategies';

@Module({
	controllers: [AuthController],
	imports: [
		UserModule,
		PassportModule,
		JwtModule.registerAsync({
			useFactory: (environmentService: EnvironmentService) => ({
				secret: environmentService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: environmentService.get('JWT_EXPIRATION_TIME'),
				},
			}),
			inject: [EnvironmentService],
		}),
	],
	providers: [AuthService, AuthLocalStrategy, AuthJwtStrategy, AuthGoogleStrategy],
})
export class AuthModule {}
