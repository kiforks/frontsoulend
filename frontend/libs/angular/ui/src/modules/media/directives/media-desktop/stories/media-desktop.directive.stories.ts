import type { Meta, StoryObj } from '@storybook/angular';

import { MediaDesktopDirective } from '../media-desktop.directive';

import { ConditionInputs } from '../../../../condition/storybook';

interface StoryInstance extends ConditionInputs, MediaDesktopDirective {}

type Story = StoryObj<StoryInstance>;

export default {
	component: MediaDesktopDirective,
	title: 'Media/Directives/MediaDesktop',
	tags: ['directives'],
} satisfies Meta<StoryInstance>;

export const Overview: Story = {
	render: () => ({
		template: `
			Resize the viewport to a <b>desktop</b> width to see the content.
			
      <div *uiMediaDesktop>
         This content is only visible on mobile devices.
      </div>
    `,
	}),
};
