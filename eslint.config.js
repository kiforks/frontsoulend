import nxPlugin from '@nx/eslint-plugin';

import kiforDisableRecommend from '@kiforks/eslint-config/disable-recommend.js';
import kiforJavascript from '@kiforks/eslint-config/javascript.js';
import kiforJest from '@kiforks/eslint-config/jest.js';
import kiforTests from '@kiforks/eslint-config/test.js';
import kiforTypescript from '@kiforks/eslint-config/typescript.js';

import * as JSONParser from 'jsonc-eslint-parser';

/** @type { import("eslint").Linter.Config[] } */
export default [
	{
		plugins: { '@nx': nxPlugin },
	},

	...kiforJest.map(config => ({
		...config,
		languageOptions: {
			...config.languageOptions,
			globals: {
				jest: true,
			},
		},
	})),
	...kiforJavascript,
	...kiforTypescript.map(config => ({
		...config,
		languageOptions: {
			...config.languageOptions,
			parserOptions: {
				project: [
					'./tsconfig.base.json',
					'libs/angular/ui/.storybook/tsconfig.json',
					'storybook/.storybook/tsconfig.json',
				],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	})),
	kiforDisableRecommend,
	...kiforTests,

	/** TODO update global eslint config */
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
						'jest-preset-angular',
						'@faker-js/faker',
						'ng-mocks',
					],
				},
			],
		},
	},

	/** TODO update global eslint config */
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.js'],
		rules: {
			'id-length': [
				'error',
				{
					min: 2,
					exceptions: ['_', 'i', 'e', 'x', 'y', 'z', 'm'],
				},
			],
		},
	},

	/**
	 * @layer shared
	 * @description The shared layer cannot import from any other layer.
	 */
	{
		files: ['**/shared/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['**/entities', '**/features', '**/widgets', '**/pages', '**/processes', '**/app'],
							message: '❌ Shared layer must not import from any other FSD layer.',
						},
					],
				},
			],
		},
	},

	/**
	 * @layer entities
	 * @description Entities can only use shared.
	 */
	{
		files: ['**/entities/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['**/features', '**/widgets', '**/pages', '**/processes', '**/app'],
							message: '❌ Entities can only import from shared.',
						},
					],
				},
			],
		},
	},

	/**
	 * @layer features
	 * @description Features can use shared and entities.
	 */
	{
		files: ['**/features/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['**/widgets', '**/pages', '**/processes', '**/app'],
							message: '❌ Features can only import from shared and entities.',
						},
					],
				},
			],
		},
	},

	/**
	 * @layer widgets
	 * @description Widgets can use shared, entities, and features.
	 */
	{
		files: ['**/widgets/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['**/pages', '**/processes', '**/app'],
							message: '❌ Widgets can only import from shared, entities, and features.',
						},
					],
				},
			],
		},
	},

	/**
	 * @layer pages
	 * @description Pages can use shared, entities, features, and widgets.
	 */
	{
		files: ['**/pages/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['**/processes', '**/app'],
							message: '❌ Pages can only import from shared, entities, features, and widgets.',
						},
					],
				},
			],
		},
	},

	/**
	 * @layer processes
	 * @description Processes can use shared, entities, features, widgets, and pages.
	 */
	{
		files: ['**/processes/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['**/app'],
							message: '❌ Processes can only import from shared, entities, features, widgets, and pages.',
						},
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
					],
				},
			],
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
		],
	},
];
