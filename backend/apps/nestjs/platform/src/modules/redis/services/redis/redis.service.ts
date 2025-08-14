import { Inject, Injectable } from '@nestjs/common';

import { REDIS_CLIENT } from '../../tokens';

import Redis from 'ioredis';

@Injectable()
export class RedisService {
	constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

	public async get<T>(key: string): Promise<T | null> {
		const value = await this.redis.get(key);

		return value ? (JSON.parse(value) as T) : null;
	}

	public set(key: string, value: unknown, ttl = 3600): Promise<'OK'> {
		const data = JSON.stringify(value);

		return this.redis.set(key, data, 'EX', ttl);
	}

	public del(key: string): Promise<number> {
		return this.redis.del(key);
	}
}
