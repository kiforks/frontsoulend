import baseConfig from './eslint.config.base.js';

import * as JSONParser from 'jsonc-eslint-parser';

/** @type { import("eslint").Linter.Config[] } */
export default [
	...baseConfig,
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
					ignoredDependencies: [],
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
