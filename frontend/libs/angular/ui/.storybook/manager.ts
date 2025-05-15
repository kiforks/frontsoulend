import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { StorybookConfig } from '../../../../storybook';

addons.setConfig({
	theme: create(StorybookConfig.Theme),
});
