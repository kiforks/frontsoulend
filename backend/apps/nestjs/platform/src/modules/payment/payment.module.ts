import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
			useFactory: (configService: ConfigService) => {
				const key = configService.get('STRIPE_API_VERSION');

				if (!key) {
					throw new Error('STRIPE_API_VERSION is not defined');
				}

				return new Stripe(key, {
					apiVersion: '2025-08-27.basil',
				});
			},
			inject: [ConfigService],
		},
	],
	exports: [PaymentService, PAYMENT_CLIENT],
})
export class PaymentModule {}
