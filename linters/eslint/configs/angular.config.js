import kiforAngularTemplate from '@kiforks/eslint-config/angular-template.js';
import kiforAngularTypescript from '@kiforks/eslint-config/angular-typescript.js';

import baseConfig from '../../../eslint.config.js';

/** @type { import("eslint").Linter.Config[] } */
export default [
	...baseConfig,
	...kiforAngularTemplate,
	...kiforAngularTypescript,

	/** TODO update global eslint config */
	{
		files: ['**/*.html'],
		rules: {
			'@angular-eslint/template/i18n': [
				'error',
				{
					allowMarkupInContent: true,
					checkAttributes: true,
					checkDuplicateId: true,
					checkId: false,
					checkText: true,
					ignoreAttributes: [
						'href',
						'content',
						'rel',
						'src',
						'id',
						'class',
						'style',
						'target',
						'type',
						'value',
						'width',
						'height',
						'xmlns',
						'tabindex',
						'role',
						'routerLink',
						'routerLinkActive',
						'name',
						'list',
						'fill',
						'stroke',
						'stroke-width',
						'viewBox',
						'svgIcon',
						'autocomplete',
						'charset',
						'colspan',
						'dir',
						'for',
						'lang',
						'formArrayName',
						'formControlName',
						'formGroupName',
						'ngClass',
						'ngProjectAs',
					],
					ignoreTags: ['style', 'script', 'meta', 'link'],
					requireDescription: false,
					requireMeaning: false,
				},
			],
		},
	},
];
