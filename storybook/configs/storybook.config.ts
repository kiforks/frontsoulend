import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Preview } from '@storybook/angular';
import { PresetValue, StorybookConfigRaw } from '@storybook/core/types';
import { ThemeVarsPartial } from '@storybook/theming';

export abstract class StorybookConfig {
	public static readonly Theme: ThemeVarsPartial = {
		barBg: '#f0f4f8',
		base: 'light',
		brandTarget: '_self',
		brandTitle: 'Frontsoulend',
		brandUrl: 'https://tenantcloud.com',
		colorPrimary: '#41a541',
		colorSecondary: '#41a541',
		textColor: '#102a43',
		textInverseColor: '#ffffff',
	};

	public static readonly Addons: string[] = [
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
		'@storybook/addon-links',
		'@storybook/addon-queryparams',
		'@storybook/addon-storysource',
	];

	public static readonly Viewports = INITIAL_VIEWPORTS;

	public static readonly Preview = {
		parameters: {
			actions: { argTypesRegex: '^on[A-Z].*' },
			layout: 'centered',
			controls: {
				sort: 'alpha',
				matchers: {
					color: /(?<temp1>background|color)$/iu,
					date: /Date$/u,
				},
			},
			viewport: { viewports: StorybookConfig.Viewports },
		},
	} satisfies Preview;

	public static readonly Composition: PresetValue<StorybookConfigRaw['refs']> = (_config, { configType }) => {
		if (configType === 'DEVELOPMENT') {
			return {
				'angular-ui': {
					title: 'Angular UI',
					url: 'http://localhost:4401',
				},
			};
		}

		return {
			'angular-ui': {
				title: 'Angular UI',
				url: 'https://kiforks.github.io/frontsoulend/ng-ui',
			},
		};
	};
}
