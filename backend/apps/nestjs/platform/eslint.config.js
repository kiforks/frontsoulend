// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../../../eslint.config.js';
// eslint-disable-next-line @nx/enforce-module-boundaries
import nestJsConfig from '../../../../linters/eslint/configs/nestjs.config.js';

export default [...baseConfig, ...nestJsConfig];
