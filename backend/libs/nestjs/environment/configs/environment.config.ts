import { cleanEnv, num, port, str, url } from 'envalid';

export const environmentConfig = cleanEnv(process.env, {
	DATABASE_URL: str(),
	ELASTICSEARCH_URL: url(),
	GOOGLE_CALLBACK_URL: url(),
	GOOGLE_CLIENT_ID: str(),
	GOOGLE_CLIENT_SECRET: str(),
	JWT_EXPIRATION_TIME: num(),
	JWT_SECRET: str(),
	MONGO_URI: str(),
	REDIS_HOST: str(),
	REDIS_PORT: port(),
	STRIPE_API_VERSION: str(),
	STRIPE_SECRET_KEY: str(),
	STRIPE_WEBHOOK_KEY: str(),
});
