import { CommonModule } from '@angular/common';

import { moduleMetadata, Preview } from '@storybook/angular';

import { BREAKPOINTS } from './viewports';

const preview: Preview = {
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
		viewport: { viewports: BREAKPOINTS },
	},
	decorators: [
		moduleMetadata({
			imports: [CommonModule],
		}),
	],
};

export default preview;
