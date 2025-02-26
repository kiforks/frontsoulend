import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
	stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		'@storybook/addon-queryparams',
		'@storybook/addon-storysource',
	],
	framework: {
		name: '@storybook/angular',
		options: {},
	},
};

export default config;
