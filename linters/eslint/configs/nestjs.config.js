import eslintNestJsTyped from '@darraghor/eslint-plugin-nestjs-typed';

import nestJsConfig from 'eslint-plugin-nestjs';

/* TODO Move to a separate config package */
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
	{
		rules: {
			/* This rule is not working properly */
			'@darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator': 'off',
		},
	},
].map(config => ({ ...config, files: ['**/*.ts'] }));
