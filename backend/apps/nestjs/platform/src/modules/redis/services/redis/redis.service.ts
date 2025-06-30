import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
	constructor(configService: ConfigService) {
		super({
			host: configService.get('REDIS_HOST'),
			port: configService.get('REDIS_PORT'),
		});
	}
}
