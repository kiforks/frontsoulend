import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppConfig, AppModule } from '../modules/app';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(...AppConfig.Pipes);
	app.useGlobalFilters(...AppConfig.Filters);
	app.setGlobalPrefix('api');

	const port = 5000;

	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}`);
};

bootstrap();
