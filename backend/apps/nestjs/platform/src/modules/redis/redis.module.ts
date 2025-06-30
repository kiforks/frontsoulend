import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisService } from './services';

import { REDIS_CLIENT } from './tokens';

import Redis from 'ioredis';

@Global()
@Module({
	providers: [
		RedisService,
		{
			provide: REDIS_CLIENT,
			useFactory: (configService: ConfigService) =>
				new Redis({
					host: configService.get('REDIS_HOST'),
					port: configService.get('REDIS_PORT'),
				}),
			inject: [ConfigService],
		},
	],
	exports: [RedisService, REDIS_CLIENT],
})
export class RedisModule {}
