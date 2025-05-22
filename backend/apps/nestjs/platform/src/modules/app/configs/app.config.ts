import { ValidationPipe } from '@nestjs/common';

import { PrismaExceptionFilter } from '../../prisma';

export abstract class AppConfig {
	public static readonly Filters = [new PrismaExceptionFilter()];
	public static readonly Pipes = [new ValidationPipe()];
}
