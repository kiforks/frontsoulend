import storybookConfig from 'eslint-plugin-storybook';

export default [
	...storybookConfig.configs['flat/recommended'],
	...storybookConfig.configs['flat/csf'],
	...storybookConfig.configs['flat/csf-strict'],
	...storybookConfig.configs['flat/addon-interactions'],
].map(config => ({ ...config, files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'] }));
