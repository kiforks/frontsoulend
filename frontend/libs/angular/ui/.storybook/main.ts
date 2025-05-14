import type { StorybookConfig } from '@storybook/angular';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { StorybookConfig as Config } from '../../../../../storybook';

const config: StorybookConfig = {
	stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	addons: Config.Addons,
	framework: {
		name: '@storybook/angular',
		options: {},
	},
};

export default config;
