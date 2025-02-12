import type { Meta, StoryObj } from '@storybook/angular';

import { MediaMaxDirective } from '../media-max.directive';
import { MediaBreakpoint } from '../../../interfaces';

import { ConditionInputs } from '../../../../condition/storybook';

interface StoryInstance extends ConditionInputs, MediaMaxDirective {}

type Story = StoryObj<StoryInstance>;

export default {
	component: MediaMaxDirective,
	title: 'Media/Directives/MediaMax',
	args: {
		breakpoint: 'sm',
		and: true,
		or: false,
		else: null,
	},
	argTypes: {
		breakpoint: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl', 'xxl'] satisfies MediaBreakpoint[],
			description: 'Defines the screen size (`max-width`) from which the content should be displayed.',
		},
		and: {
			control: 'boolean',
			description: 'Combines conditions with a logical AND.',
		},
		or: {
			control: 'boolean',
			description: 'Combines conditions with a logical OR.',
		},
		else: {
			table: { readonly: true },
			control: 'object',
			description: 'Defines the fallback template if conditions are not met.',
		},
	},
} satisfies Meta<StoryInstance>;

export const Overview: Story = {
	render: ({ breakpoint, and, or, else: elseTemplate }) => ({
		props: { breakpoint, and, or, elseTemplate },
		template: `
      <div *appMediaMax="'${breakpoint}'; or: ${or}; and: ${and}; else: elseRef">
				This content will be visible up to the {{ breakpoint }} breakpoint.
      </div>
      
      <ng-template #elseRef>
        <p>Fallback content when the conditions are not met.</p>
      </ng-template>
    `,
	}),
};
