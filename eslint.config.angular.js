import kiforAngularTemplate from '@kiforks/eslint-config/angular-template.js';
import kiforAngularTypescript from '@kiforks/eslint-config/angular-typescript.js';

import baseConfig from './eslint.config.js';

/** @type { import("eslint").Linter.Config[] } */
export default [...baseConfig, ...kiforAngularTemplate, ...kiforAngularTypescript];
