import { EnvironmentService } from '@libs/nestjs/core';
import { Global, Module } from '@nestjs/common';

import { PaymentService } from './services';

import { PaymentController } from './controllers';
import { PAYMENT_CLIENT } from './tokens';

import Stripe from 'stripe';

@Global()
@Module({
	controllers: [PaymentController],
	providers: [
		PaymentService,
		{
			provide: PAYMENT_CLIENT,
			useFactory: (environmentService: EnvironmentService) =>
				new Stripe(environmentService.get('STRIPE_API_VERSION'), {
					apiVersion: '2025-09-30.clover',
				}),
			inject: [EnvironmentService],
		},
	],
	exports: [PaymentService, PAYMENT_CLIENT],
})
export class PaymentModule {}
