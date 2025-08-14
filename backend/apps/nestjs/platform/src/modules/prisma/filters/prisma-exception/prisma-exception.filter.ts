import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
	public catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): this {
		const ctx = host.switchToHttp();
		const response: Response = ctx.getResponse();
		const message = PrismaExceptionFilter.getMessage(exception);
		const statusCode = PrismaExceptionFilter.getCode(exception);

		response.status(statusCode).json({ statusCode, message, error: 'Bad request' });

		return this;
	}

	public static getMessage(exception: Prisma.PrismaClientKnownRequestError): string {
		const target = exception.meta?.['target'];

		if (!target) {
			return 'Database error';
		}

		// eslint-disable-next-line @typescript-eslint/no-base-to-string
		return `Unique constraint failed: ${String(target)}`;
	}

	public static getCode(exception: Prisma.PrismaClientKnownRequestError): number {
		const isExceptionCode = exception.code === 'P2002';
		const successCode = 400;
		const errorCode = 500;

		if (isExceptionCode) {
			return successCode;
		}

		return errorCode;
	}
}
