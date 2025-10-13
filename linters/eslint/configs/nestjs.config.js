import kiforNestjs from '@kiforks/eslint-config/nestjs.js';

import baseConfig from '../../../eslint.config.js';
import testsConfig from './tests.config.js';

/** @type { import("eslint").Linter.Config[] } */
export default [...baseConfig, ...kiforNestjs, ...testsConfig];
