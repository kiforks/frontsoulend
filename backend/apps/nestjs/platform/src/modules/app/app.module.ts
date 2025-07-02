import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth';
import { ChatModule } from '../chat';
import { ElasticModule } from '../elastic';
import { PaymentModule } from '../payment';
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
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get('MONGO_URI'),
			}),
			inject: [ConfigService],
		}),
		ElasticModule,
		PrismaModule,
		UserModule,
		AuthModule,
		RedisModule,
		PaymentModule,
		ChatModule,
	],
})
export class AppModule {}
