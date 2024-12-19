export default {
	'^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
	coverageDirectory: '../../coverage/libs/core',
	displayName: 'core',
	moduleFileExtensions: ['ts', 'js', 'html'],
	preset: '../../jest.preset.js',
	testEnvironment: 'node',
	transform: {},
};
