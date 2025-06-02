import { Test, TestingModule } from '@nestjs/testing';

import { BrandService } from '../../services';

import { BrandController } from './brand.controller';

describe('BrandController', () => {
	let controller: BrandController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BrandController],
			providers: [BrandService],
		}).compile();

		controller = module.get<BrandController>(BrandController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
