import nxPlugin from '@nx/eslint-plugin';

import kiforDisableRecommend from '@kiforks/eslint-config/disable-recommend.js';
import kiforFsd from '@kiforks/eslint-config/feature-sliced-design.js';
import kiforJavascript from '@kiforks/eslint-config/javascript.js';
import kiforTests from '@kiforks/eslint-config/test.js';
import kiforTypescript from '@kiforks/eslint-config/typescript.js';
import kiforVitest from '@kiforks/eslint-config/vitest.js';

import * as JSONParser from 'jsonc-eslint-parser';

/** @type { import("eslint").Linter.Config[] } */
export default [
	{
		plugins: { '@nx': nxPlugin },
	},

	...kiforVitest,
	...kiforJavascript,
	...kiforTypescript.map(config => ({
		...config,
		rules: {
			...config.rules,
			'@typescript-eslint/prefer-nullish-coalescing': ['error', { ignoreBooleanCoercion: true }],
		},
		languageOptions: {
			...config.languageOptions,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	})),
	kiforDisableRecommend,
	...kiforTests,
	...kiforFsd,

	{
		files: ['**/*.json'],
		languageOptions: {
			parser: JSONParser,
		},
		rules: {
			'@nx/dependency-checks': [
				'error',
				{
					buildTargets: ['build'],
					checkMissingDependencies: true,
					checkObsoleteDependencies: true,
					checkVersionMismatches: true,
					ignoredDependencies: [
						'@angular/router',
						'lodash',
						'lodash-es',
						'rxjs',
						'subsink',
						'@ngneat/spectator',
						'@faker-js/faker',
						'ng-mocks',
					],
				},
			],
		},
	},

	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					checkNestedExternalImports: true,
					depConstraints: [
						{
							sourceTag: '*',
							onlyDependOnLibsWithTags: ['*'],
						},
						{
							sourceTag: 'scope:app',
							onlyDependOnLibsWithTags: ['scope:lib'],
						},
						{
							sourceTag: 'scope:utilities',
							onlyDependOnLibsWithTags: ['scope:utilities', 'scope:core'],
						},
						{
							sourceTag: 'scope:core',
							onlyDependOnLibsWithTags: ['scope:core', 'scope:utilities'],
						},
						{
							sourceTag: 'scope:ui',
							onlyDependOnLibsWithTags: ['scope:ui', 'scope:utilities', 'scope:core'],
						},
						{
							sourceTag: 'type:frontend',
							notDependOnLibsWithTags: ['type:backend', 'type:qa'],
						},
						{
							sourceTag: 'type:backend',
							notDependOnLibsWithTags: ['type:frontend', 'type:qa'],
						},
						{
							sourceTag: 'type:qa',
							notDependOnLibsWithTags: ['type:frontend', 'type:backend'],
						},
					],
				},
			],
		},
	},
	{
		files: [
			'**/eslint.config.{js,cjs,mjs,ts}',
			'**/*.eslintrc.{js,cjs,mjs,json}',
			'**/.eslintrc',
			'**/vite.config.{js,cjs,mjs,ts}',
			'**/vitest.config.{js,cjs,mjs,ts}',
			'**/vitest.environment.{js,cjs,mjs,ts}',
		],
		rules: {
			'@nx/enforce-module-boundaries': 'off',
		},
	},
	{
		ignores: [
			// Compiled output
			'dist/',
			'tmp/',
			'out-tsc/',
			'bazel-out/',

			// Node
			'node_modules/',
			'npm-debug.log',
			'yarn-error.log',

			// IDEs and editors
			'.idea/',
			'.project',
			'.classpath',
			'.c9/',
			'*.launch',
			'.settings/',
			'*.sublime-workspace',

			// Visual Studio Code
			'.vscode/',
			'!.vscode/settings.json',
			'!.vscode/tasks.json',
			'!.vscode/launch.json',
			'!.vscode/extensions.json',
			'.history/',

			// Miscellaneous
			'.angular/cache/',
			'.sass-cache/',
			'connect.lock',
			'coverage/',
			'libpeerconnection.log',
			'testem.log',
			'typings/',

			// System files
			'.DS_Store',
			'Thumbs.db',

			// Storybook і NX
			'*storybook.log',
			'.nx/',
			'.vscode/',
			'.stylelintrc.js',
			'**/vite.config.*.timestamp*',
			'**/vitest.config.*.timestamp*',
		],
	},
];
