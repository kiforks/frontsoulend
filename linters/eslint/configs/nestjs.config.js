import eslintNestJsTyped from '@darraghor/eslint-plugin-nestjs-typed';

import nestJsConfig from 'eslint-plugin-nestjs';

export default [
	{
		plugins: {
			nestjs: nestJsConfig,
		},
		rules: {
			'nestjs/parse-int-pipe': 'error',
			'nestjs/deprecated-api-modules': 'error',
			'nestjs/use-dependency-injection': 'error',
			'nestjs/use-validation-pipe': 'error',
		},
	},
	...eslintNestJsTyped.configs.flatRecommended,
].map(config => ({ ...config, files: ['**/*.ts'] }));
