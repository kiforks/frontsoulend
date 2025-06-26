import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services';

import { UserModule } from '../user';
import { AuthController } from './controllers';
import { AuthJwtStrategy, AuthLocalStrategy } from './strategies';

@Module({
	controllers: [AuthController],
	imports: [
		UserModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.get('JWT_EXPIRATION_TIME'),
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, AuthLocalStrategy, AuthJwtStrategy],
})
export class AuthModule {}
