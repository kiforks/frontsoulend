import { faker } from '@faker-js/faker';

import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { EnvironmentService } from './environment.service';

describe(EnvironmentService, () => {
	let moduleRef: TestingModule;
	let service: EnvironmentService;

	const environment = {
		JWT_SECRET: faker.word.words(1),
		REDIS_PORT: '6379',
	};
	const stubEnv = (values: Record<string, string>) => {
		Object.entries(values).forEach(([key, value]) => vi.stubEnv(key, value));
	};

	beforeEach(async () => {
		moduleRef = await Test.createTestingModule({
			providers: [EnvironmentService],
		}).compile();

		service = moduleRef.get(EnvironmentService);
		stubEnv(environment);
	});

	it('should return configuration value', () => {
		const { JWT_SECRET, REDIS_PORT } = environment;
		const jwtSecret = service.get('JWT_SECRET');
		const redisPort = service.get('REDIS_PORT');

		expect(jwtSecret).toBe(JWT_SECRET);
		expect(redisPort).toBe(REDIS_PORT);
	});

	it('should call ConfigService base class method with the following parameters', () => {
		const spyOnGet = vi.spyOn(ConfigService.prototype, 'get');

		service.get('JWT_SECRET');

		expect(spyOnGet).toHaveBeenCalledExactlyOnceWith('JWT_SECRET', { infer: true });
	});
});
