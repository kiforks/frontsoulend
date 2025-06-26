import { createParamDecorator } from '@nestjs/common';

export const UserCurrent = createParamDecorator((_data: unknown, context) => context.switchToHttp().getRequest().user);
