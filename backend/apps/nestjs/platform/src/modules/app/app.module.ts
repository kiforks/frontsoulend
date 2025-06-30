import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth';
import { PrismaModule } from '../prisma';
import { RedisModule } from '../redis';
import { UserModule } from '../user';

import { LoggerModule } from 'nestjs-pino';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		LoggerModule.forRoot({
			pinoHttp: {
				transport: {
					target: 'pino-pretty',
					options: {
						colorize: true,
						singleLine: true,
						translateTime: 'yyyy-mm-dd HH:MM:ss',
						ignore: 'pid,hostname',
					},
				},
			},
		}),
		PrismaModule,
		UserModule,
		AuthModule,
		RedisModule,
	],
})
export class AppModule {}
