import type { Preview } from '@storybook/angular';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		layout: 'centered',
		controls: {
			matchers: {
				color: /(?<temp1>background|color)$/iu,
				date: /Date$/u,
			},
		},
	},
};

export default preview;
