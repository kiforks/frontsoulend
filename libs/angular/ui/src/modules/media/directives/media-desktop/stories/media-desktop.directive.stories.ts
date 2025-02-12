import type { Meta, StoryObj } from '@storybook/angular';

import { MediaDesktopDirective } from '../media-desktop.directive';

import { ConditionKeywordInputs } from '../../../../condition/storybook';

interface StoryInstance extends ConditionKeywordInputs, MediaDesktopDirective {}

type Story = StoryObj<StoryInstance>;

export default {
	component: MediaDesktopDirective,
	title: 'Media/Directives/MediaDesktop',
} satisfies Meta<StoryInstance>;

export const Overview: Story = {
	render: () => ({
		template: `
			Resize the viewport to a <b>desktop</b> width to see the content.
			
      <div *appMediaDesktop>
         This content is only visible on mobile devices.
      </div>
    `,
	}),
};
