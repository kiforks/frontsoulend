import { Global, Module } from '@nestjs/common';

import { EnvironmentService } from './services';

@Global()
@Module({
	providers: [EnvironmentService],
	exports: [EnvironmentService],
})
export class EnvironmentModule {}
