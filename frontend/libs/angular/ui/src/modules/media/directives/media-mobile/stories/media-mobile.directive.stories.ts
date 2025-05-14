import type { Meta, StoryObj } from '@storybook/angular';

import { MediaMobileDirective } from '../media-mobile.directive';

import { ConditionInputs } from '../../../../condition/storybook';

interface StoryInstance extends ConditionInputs, MediaMobileDirective {}

type Story = StoryObj<StoryInstance>;

export default {
	component: MediaMobileDirective,
	title: 'Media/Directives/MediaMobile',
	tags: ['directives'],
} satisfies Meta<StoryInstance>;

export const Overview: Story = {
	render: () => ({
		template: `
			Resize the viewport to a <b>mobile</b> width to see the content.
			
      <div *uiMediaMobile>
         This content is only visible on mobile devices.
      </div>
    `,
	}),
};
