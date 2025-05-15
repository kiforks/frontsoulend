import { compilerOptions } from './tsconfig.spec.json';

import { pathsToModuleNameMapper } from 'ts-jest';

export default {
	displayName: 'frontend/libs/utilities',
	preset: '../../../jest.preset.js',
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	coverageDirectory: '../../../../coverage/frontend/libs/utilities',
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
			prefix: '<rootDir>/../../',
		}),
	},
};
