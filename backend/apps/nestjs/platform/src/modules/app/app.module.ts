import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma';
import { UserModule } from '../user';

import { LoggerModule } from 'nestjs-pino';

@Module({
	imports: [
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
	],
})
export class AppModule {}
