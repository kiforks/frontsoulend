// eslint-disable-next-line @nx/enforce-module-boundaries
import angularConfig from '../../../linters/eslint/configs/angular.config.js';
// eslint-disable-next-line @nx/enforce-module-boundaries
import storybookConfig from '../../../linters/eslint/configs/storybook.config.js';

/** @type { import("eslint").Linter.Config[] } */
export default [
	...angularConfig,
	...storybookConfig,
	{
		rules: {
			'storybook/no-title-property-in-meta': 'off',
		},
	},
];
