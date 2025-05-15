import { Meta, StoryObj } from '@storybook/angular';

import { StorybookIntroComponent } from './storybook-intro.component';

const meta: Meta<StorybookIntroComponent> = {
	title: '📘 Intro / Storybook Host Overview',
	component: StorybookIntroComponent,
};

export default meta;

type Story = StoryObj<StorybookIntroComponent>;

export const Introduction: Story = {
	args: {},
};
