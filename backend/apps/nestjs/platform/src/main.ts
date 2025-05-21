import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api';

	app.setGlobalPrefix(globalPrefix);

	const port = 5000;

	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
};

bootstrap();
