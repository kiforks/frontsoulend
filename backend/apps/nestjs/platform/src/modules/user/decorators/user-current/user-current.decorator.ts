import { createParamDecorator } from '@nestjs/common';

import { User } from '../../types';

export const UserCurrent = createParamDecorator(
	(_data: unknown, context): User => context.switchToHttp().getRequest().user
);
