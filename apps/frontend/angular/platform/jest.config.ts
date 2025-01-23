// eslint-disable-next-line @nx/enforce-module-boundaries
import config from '../jest.config';

export default {
	displayName: 'platform',
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	coverageDirectory: '../../../../coverage/apps/frontend/angular/platform',
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
	...config,
};
