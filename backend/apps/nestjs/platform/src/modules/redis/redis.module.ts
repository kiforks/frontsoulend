import { EnvironmentService } from '@libs/nestjs/core';
import { Global, Module } from '@nestjs/common';

import { RedisService } from './services';

import { REDIS_CLIENT } from './tokens';

import Redis from 'ioredis';

@Global()
@Module({
	providers: [
		RedisService,
		{
			provide: REDIS_CLIENT,
			useFactory: (environmentService: EnvironmentService) =>
				new Redis({
					host: environmentService.get('REDIS_HOST'),
					port: environmentService.get('REDIS_PORT'),
				}),
			inject: [EnvironmentService],
		},
	],
	exports: [RedisService, REDIS_CLIENT],
})
export class RedisModule {}
