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
				project: ['./tsconfig.json', 'libs/angular/ui/.storybook/tsconfig.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	})),
	kiforDisableRecommend,
	...kiforTests,

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
							sourceTag: 'scope:ng-ui',
							onlyDependOnLibsWithTags: ['scope:ng-ui', 'scope:utilities', 'scope:core'],
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
