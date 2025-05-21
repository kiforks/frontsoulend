import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
// eslint-disable-next-line @darraghor/nestjs-typed/controllers-should-supply-api-tags
export class AppController {
	constructor(private readonly appService: AppService) {}

	// eslint-disable-next-line @darraghor/nestjs-typed/api-method-should-specify-api-response
	@Get()
	public getData(): { message: string } {
		return this.appService.getData();
	}
}
