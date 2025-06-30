import { Global, Module } from '@nestjs/common';

import { RedisService } from './services';

@Global()
@Module({
	providers: [RedisService],
	exports: [RedisService],
})
export class RedisModule {}
