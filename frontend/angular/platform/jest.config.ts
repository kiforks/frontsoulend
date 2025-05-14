// eslint-disable-next-line @nx/enforce-module-boundaries
import { compilerOptions } from '../../../tsconfig.spec.json';

import { pathsToModuleNameMapper } from 'ts-jest';

export default {
	displayName: 'platform',
	preset: '../../../jest.preset.js',
	snapshotSerializers: [
		'jest-preset-angular/build/serializers/no-ng-attributes',
		'jest-preset-angular/build/serializers/ng-snapshot',
		'jest-preset-angular/build/serializers/html-comment',
	],
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	coverageDirectory: '../../../coverage/frontend/angular/platform',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|mjs|js|html)$': [
			'jest-preset-angular',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
				stringifyContentPathRegex: '\\.(html|svg)$',
			},
		],
	},
	transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],

	moduleNameMapper: {
		...pathsToModuleNameMapper(compilerOptions.paths, {
			prefix: '<rootDir>/../../../../',
		}),
	},
};
