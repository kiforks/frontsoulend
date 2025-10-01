import baseConfig from '../../../../eslint.config.js';
import nestJsConfig from '../../../../linters/eslint/configs/nestjs.config.js';

export default [...baseConfig, ...nestJsConfig];
