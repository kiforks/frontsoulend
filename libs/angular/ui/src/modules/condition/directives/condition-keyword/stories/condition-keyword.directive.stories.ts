import type { Meta, StoryObj } from '@storybook/angular';

import { ConditionKeywordDirective } from '../condition-keyword.directive';

import { ConditionKeywordInputs } from '../../../storybook';

interface StoryInstance extends ConditionKeywordInputs {
	condition: boolean;
}

type Story = StoryObj<StoryInstance>;

export default {
	component: ConditionKeywordDirective,
	title: 'Condition/Directives/ConditionKeyword',
	args: {
		and: true,
		condition: true,
		else: null,
		or: false,
	},
	argTypes: {
		condition: {
			control: 'boolean',
			description: 'Primary condition that determines visibility.',
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
			description: 'Fallback template if conditions are not met.',
		},
	},
} satisfies Meta<StoryInstance>;

export const Overview: Story = {
	render: ({ condition, and, or, else: elseTemplate }) => ({
		props: { condition, and, or, elseTemplate },
		template: `
      <div *appConditionKeyword="${condition}; or: ${or}; and: ${and}; else: fallbackRef">
        The condition is met, so this content is visible.
      </div>

      <ng-template #fallbackRef>
        <p>Fallback content when the conditions are not met.</p>
      </ng-template>
    `,
	}),
};
