import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { PaymentService } from '../../services';
import { Payment } from '../../types';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post()
	@ApiCreatedResponse({ description: 'Creates a new payment and returns its details.' })
	public create(@Body('amount') amount: number, @Body('currency') currency: string): Promise<Payment> {
		return this.paymentService.createPayment(amount, currency);
	}

	@Get(':id')
	@ApiNotFoundResponse({ description: 'Payment with the specified ID was not found.' })
	public retrieve(@Param('id') id: string): Promise<Payment> {
		return this.paymentService.retrievePayment(id);
	}
}
