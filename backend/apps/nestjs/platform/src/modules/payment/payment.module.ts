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
			useFactory: (configService: ConfigService) =>
				new Stripe(configService.get('STRIPE_SECRET_KEY') as string, {
					apiVersion: '2025-05-28.basil',
				}),
			inject: [ConfigService],
		},
	],
	exports: [PaymentService, PAYMENT_CLIENT],
})
export class PaymentModule {}
