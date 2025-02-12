import type { Meta, StoryObj } from '@storybook/angular';

import { MediaDataDirective } from '../index';

type Story = StoryObj<MediaDataDirective>;

export default {
	component: MediaDataDirective,
	title: 'Media/Directives/MediaData',
} satisfies Meta<MediaDataDirective>;

export const Overview: Story = {
	render: () => ({
		template: `
      <p>
          <strong>Resize the viewport</strong> to see these values change dynamically.
      </p>
      
			<div
				*appMediaData="
					let mediaMobile = mediaMobile;
					let mediaDesktop = mediaMobile;
					let mediaMin = mediaMin;
					let mediaMax = mediaMax;
					let mediaBetween = mediaBetween;
					let mediaOnly = mediaOnly;
				"
				>
					<p>Media mobile: <code>{{ mediaMobile | async }}</code></p>
					<p>Media desktop: <code>{{ mediaDesktop | async }}</code></p>
					<p>Media min: <code>{{ mediaMin('md') | async }}</code></p>
					<p>Media max: <code>{{ mediaMax('md') | async }}</code></p>
					<p>Media between: <code>{{ mediaBetween(['md', 'xl']) | async }}</code></p>
					<p>Media only: <code>{{ mediaOnly('md') | async }}</code></p>
			</div>
    `,
	}),
};
