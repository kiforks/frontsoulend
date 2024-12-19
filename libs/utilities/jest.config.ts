export default {
	'^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
	coverageDirectory: '../../coverage/libs/utilities',
	displayName: 'utilities',
	moduleFileExtensions: ['ts', 'js', 'html'],
	preset: '../../jest.preset.js',
	testEnvironment: 'node',
	transform: {},
};
