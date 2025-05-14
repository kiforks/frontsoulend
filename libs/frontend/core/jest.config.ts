// eslint-disable-next-line @nx/enforce-module-boundaries
import { compilerOptions } from '../../../tsconfig.spec.json';

import { pathsToModuleNameMapper } from 'ts-jest';

export default {
	coverageDirectory: '../../../coverage/libs/frontend/core',
	displayName: 'core',
	moduleFileExtensions: ['ts', 'js', 'html'],
	preset: '../../../jest.preset.js',
	testEnvironment: 'node',
	transform: {},
	moduleNameMapper: {
		...pathsToModuleNameMapper(compilerOptions.paths, {
			prefix: '<rootDir>/../../',
		}),
	},
};
