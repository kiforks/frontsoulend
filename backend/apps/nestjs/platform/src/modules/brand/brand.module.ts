import { Module } from '@nestjs/common';

import { BrandService } from './services';

import { BrandController } from './controllers';

@Module({
	controllers: [BrandController],
	providers: [BrandService],
})
export class BrandModule {}
