import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';

import { PaymentService } from '../../services';
import { Payment } from '../../types';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new payment' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				amount: { type: 'number', example: 100, description: 'Payment amount' },
				currency: { type: 'string', example: 'USD', description: 'Payment currency code' },
			},
			required: ['amount', 'currency'],
		},
		description: 'Payment creation data',
	})
	@ApiCreatedResponse({
		description: 'Creates a new payment and returns its details.',
	})
	public create(@Body('amount') amount: number, @Body('currency') currency: string): Promise<Payment> {
		return this.paymentService.createPayment(amount, currency);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get payment by ID' })
	@ApiParam({ name: 'id', type: String, description: 'Payment ID' })
	@ApiOkResponse({
		description: 'Returns payment details by ID.',
	})
	@ApiNotFoundResponse({ description: 'Payment with the specified ID was not found.' })
	public retrieve(@Param('id') id: string): Promise<Payment> {
		return this.paymentService.retrievePayment(id);
	}
}
