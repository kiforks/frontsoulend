import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { environmentConfig } from '../../configs';

@Injectable()
export class EnvironmentService extends ConfigService<typeof environmentConfig, true> {
	public override get<K extends keyof typeof environmentConfig>(key: K): (typeof environmentConfig)[K] {
		return super.get(key, { infer: true });
	}
}
