import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

import { StorybookConfig } from '../configs';

addons.setConfig({ theme: create(StorybookConfig.Theme) });
