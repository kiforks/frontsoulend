import { Module } from '@nestjs/common';

import { UserSearchService, UserService } from './services';

import { UserController } from './controllers';

@Module({
	controllers: [UserController],
	providers: [UserService, UserSearchService],
	exports: [UserService, UserSearchService],
})
export class UserModule {}
