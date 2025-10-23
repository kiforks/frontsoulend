import { environmentConfig } from '@libs/core';
import { EnvironmentModule, EnvironmentService } from '@libs/nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth';
import { ChatModule } from '../chat';
import { ElasticModule } from '../elastic';
import { PrismaModule } from '../prisma';
import { RedisModule } from '../redis';
import { UserModule } from '../user';

import { LoggerModule } from 'nestjs-pino';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate: () => environmentConfig,
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
		MongooseModule.forRootAsync({
			imports: [EnvironmentModule],
			useFactory: (environmentService: EnvironmentService) => ({
				uri: environmentService.get('MONGO_URI'),
			}),
			inject: [EnvironmentService],
		}),
		EnvironmentModule,
		ElasticModule,
		PrismaModule,
		UserModule,
		AuthModule,
		RedisModule,
		ChatModule,
	],
})
export class AppModule {}
