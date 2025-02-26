import { CommonModule } from '@angular/common';

import { moduleMetadata, Preview } from '@storybook/angular';

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
	},
	decorators: [
		moduleMetadata({
			imports: [CommonModule],
		}),
	],
};

export default preview;
