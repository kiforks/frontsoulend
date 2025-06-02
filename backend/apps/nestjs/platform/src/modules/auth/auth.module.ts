import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services';

import { UserModule } from '../user';
import { AuthController } from './controllers';
import { AuthLocalStrategy } from './strategies';

@Module({
	controllers: [AuthController],
	imports: [UserModule, PassportModule],
	providers: [AuthService, AuthLocalStrategy],
})
export class AuthModule {}
