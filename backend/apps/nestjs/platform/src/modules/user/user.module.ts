import { Module } from '@nestjs/common';

import { UserService } from './services';

import { UserController } from './controllers';

@Module({
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
