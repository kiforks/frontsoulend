import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const provideSwagger = (app: INestApplication): void => {
	const config = new DocumentBuilder()
		.setTitle('Frontsoulend')
		.setDescription('API description')
		.setVersion('1.0')
		.addTag('frontsoulend')
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('nestjs/platform', app, documentFactory);
};
