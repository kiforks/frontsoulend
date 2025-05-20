import type { Meta, StoryObj } from '@storybook/angular';

import { MediaBetweenDirective } from '../media-between.directive';
import { MediaBetweenBreakpoints, MediaElement } from '../../../interfaces';

import { ConditionInputs } from '../../../../condition/storybook';

/**
 * Storybook interface that extends `MediaElement`
 */
interface StoryInstance extends ConditionInputs, MediaElement<MediaBetweenBreakpoints> {}

type Story = StoryObj<StoryInstance>;

export default {
	component: MediaBetweenDirective,
	title: 'Media/Directives/MediaBetween',
	args: {
		breakpoint: ['md', 'lg'] as MediaBetweenBreakpoints,
		and: true,
		or: false,
		else: null,
	},
	argTypes: {
		breakpoint: {
			control: 'select',
			options: [
				['sm', 'md'],
				['sm', 'lg'],
				['sm', 'xl'],
				['sm', 'xxl'],
				['md', 'lg'],
				['md', 'xl'],
				['md', 'xxl'],
				['lg', 'xl'],
				['lg', 'xxl'],
				['xl', 'xxl'],
			] satisfies MediaBetweenBreakpoints[],
			description: 'Defines the screen size range in which the content should be displayed.',
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
	tags: ['directives'],
} satisfies Meta<StoryInstance>;

export const Overview: Story = {
	render: ({ breakpoint, and, or, else: elseTemplate }) => ({
		props: { breakpoint, and, or, elseTemplate },
		template: `
      <div *uiMediaBetween="['${breakpoint.at(0)}', '${breakpoint.at(-1)}']; or: ${or}; and: ${and}; else: elseRef">
        This content is visible ONLY the "{{ breakpoint.at(0) }}" and "{{ breakpoint.at(-1) }}" breakpoints.
      </div>
      
      <ng-template #elseRef>
        <p>Fallback content when the conditions are not met.</p>
      </ng-template>
    `,
	}),
};
