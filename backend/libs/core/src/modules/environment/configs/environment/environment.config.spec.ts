describe('environmentConfig', () => {
	const baseEnv = {
		DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
		ELASTICSEARCH_URL: 'https://es.local:9200',
		GOOGLE_CALLBACK_URL: 'https://example.com/auth/google/callback',
		GOOGLE_CLIENT_ID: 'google-client-id',
		GOOGLE_CLIENT_SECRET: 'google-client-secret',
		JWT_EXPIRATION_TIME: '3600',
		JWT_SECRET: 'supersecret',
		MONGO_URI: 'mongodb://localhost:27017/db',
		REDIS_HOST: '127.0.0.1',
		REDIS_PORT: '6379',
		STRIPE_API_VERSION: '2023-10-16',
		STRIPE_SECRET_KEY: 'sk_test_123',
		STRIPE_WEBHOOK_KEY: 'whsec_123',
	};
	const errorMessage = 'process.exit unexpectedly called with "1"';
	const importConfig = () => {
		vi.resetModules();

		return import('./environment.config');
	};

	const stubEnv = (values: Record<string, string>) => {
		Object.entries(values).forEach(([key, value]) => vi.stubEnv(key, value));
	};

	afterEach(() => {
		vi.unstubAllEnvs();
	});

	/* eslint-disable vitest/max-expects */
	it('should load and parse valid environment', async () => {
		stubEnv(baseEnv);

		const {
			environmentConfig: {
				DATABASE_URL,
				ELASTICSEARCH_URL,
				GOOGLE_CALLBACK_URL,
				GOOGLE_CLIENT_ID,
				GOOGLE_CLIENT_SECRET,
				JWT_EXPIRATION_TIME,
				JWT_SECRET,
				MONGO_URI,
				REDIS_HOST,
				REDIS_PORT,
				STRIPE_API_VERSION,
				STRIPE_SECRET_KEY,
				STRIPE_WEBHOOK_KEY,
			},
		} = await importConfig();

		expect(DATABASE_URL).toBe(baseEnv.DATABASE_URL);
		expect(ELASTICSEARCH_URL).toBe(baseEnv.ELASTICSEARCH_URL);
		expect(GOOGLE_CALLBACK_URL).toBe(baseEnv.GOOGLE_CALLBACK_URL);
		expect(GOOGLE_CLIENT_ID).toBe(baseEnv.GOOGLE_CLIENT_ID);
		expect(GOOGLE_CLIENT_SECRET).toBe(baseEnv.GOOGLE_CLIENT_SECRET);
		expect(JWT_EXPIRATION_TIME).toBe(3600);
		expect(JWT_SECRET).toBe(baseEnv.JWT_SECRET);
		expect(MONGO_URI).toBe(baseEnv.MONGO_URI);
		expect(REDIS_HOST).toBe(baseEnv.REDIS_HOST);
		expect(REDIS_PORT).toBe(6379);
		expect(STRIPE_API_VERSION).toBe(baseEnv.STRIPE_API_VERSION);
		expect(STRIPE_SECRET_KEY).toBe(baseEnv.STRIPE_SECRET_KEY);
		expect(STRIPE_WEBHOOK_KEY).toBe(baseEnv.STRIPE_WEBHOOK_KEY);
	});

	it('should throw on invalid URL', async () => {
		stubEnv({ ...baseEnv, ELASTICSEARCH_URL: 'not-a-url' });

		await expect(importConfig()).rejects.toThrow(errorMessage);
	});

	it('should throw on invalid port', async () => {
		stubEnv({ ...baseEnv, REDIS_PORT: 'abc' });

		await expect(importConfig()).rejects.toThrow(errorMessage);
	});
});
