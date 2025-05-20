import type { Meta, StoryObj } from '@storybook/angular';

import { StorybookIntroComponent } from './storybook-intro.component';

type Story = StoryObj;

export default {
	component: StorybookIntroComponent,
	title: 'Components/Storybook Intro',
	args: {},
	tags: ['components'],
} satisfies Meta<Story>;

export const Overview: Story = {
	render: () => ({
		template: `
      <storybook-intro></storybook-intro>
    `,
	}),
};
