import { Module } from '@nestjs/common';

import { ProductService } from './services';

import { ProductController } from './controllers';

@Module({
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule {}
