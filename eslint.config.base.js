import nxPlugin from '@nx/eslint-plugin';

import kiforDisableRecommend from '@kiforks/eslint-config/disable-recommend.js';
import kiforJavascript from '@kiforks/eslint-config/javascript.js';
import kiforJest from '@kiforks/eslint-config/jest.js';
import kiforTests from '@kiforks/eslint-config/test.js';
import kiforTypescript from '@kiforks/eslint-config/typescript.js';

/** @type { import("eslint").Linter.Config[] } */
export default [
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
				project: ['./tsconfig.base.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	})),
	...kiforTests,
	kiforDisableRecommend,

	{
		plugins: { '@nx': nxPlugin },
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
