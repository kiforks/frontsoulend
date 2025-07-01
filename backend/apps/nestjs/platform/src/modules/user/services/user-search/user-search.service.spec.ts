import { Test, TestingModule } from '@nestjs/testing';

import { UserSearchService } from './user-search.service';

describe('UserSearchService', () => {
	let service: UserSearchService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserSearchService],
		}).compile();

		service = module.get<UserSearchService>(UserSearchService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
