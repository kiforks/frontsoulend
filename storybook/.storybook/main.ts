import type { StorybookConfig } from '@storybook/angular';

import { StorybookConfig as Config } from '../configs';

const config: StorybookConfig = {
	stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	addons: Config.Addons,
	framework: {
		name: '@storybook/angular',
		options: {},
	},
	refs: Config.Composition,
};

export default config;
