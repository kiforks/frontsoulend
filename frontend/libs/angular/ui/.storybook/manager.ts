// eslint-disable-next-line @nx/enforce-module-boundaries
import { StorybookConfig } from '../../../../storybook';

import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
	theme: create(StorybookConfig.Theme),
});
