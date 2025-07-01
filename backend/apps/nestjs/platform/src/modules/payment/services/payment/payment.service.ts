import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { Payment } from '../../types';

import { PAYMENT_CLIENT } from '../../tokens';

import Stripe from 'stripe';

@Injectable()
export class PaymentService {
	constructor(@Inject(PAYMENT_CLIENT) private readonly stripe: Stripe) {}

	public createPayment(amount: number, currency: string): Promise<Payment> {
		if (amount <= 0) {
			throw new BadRequestException('Amount must be greater than zero');
		}

		return this.stripe.paymentIntents.create({
			amount,
			currency,
		});
	}

	public retrievePayment(paymentIntentId: string): Promise<Payment> {
		return this.stripe.paymentIntents.retrieve(paymentIntentId);
	}
}
