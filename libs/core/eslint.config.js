import baseConfig from '../../eslint.config.js';
import testsConfig from '../../linters/eslint/configs/tests.config.js';

/** @type { import("eslint").Linter.Config[] } */
export default [...baseConfig, ...testsConfig];
