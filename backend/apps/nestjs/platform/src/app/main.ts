import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppConfig, AppModule } from '../modules/app';
import { provideSwagger } from '../modules/swagger';

import { Logger as PinoLogger } from 'nestjs-pino';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});

	provideSwagger(app);

	app.useLogger(app.get(PinoLogger));
	app.useGlobalPipes(...AppConfig.Pipes);
	app.useGlobalFilters(...AppConfig.Filters);
	app.setGlobalPrefix('v1');

	const port = 3000;

	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}`);
};

bootstrap();
