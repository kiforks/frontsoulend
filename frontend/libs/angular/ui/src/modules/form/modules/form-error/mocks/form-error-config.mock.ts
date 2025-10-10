import { faker } from '@faker-js/faker';

import { ViewContainerRef } from '@angular/core';

import { FormErrorComponent, FormErrorConfig, FormErrorValidationType } from '../interfaces';

export class FormErrorConfigMock implements FormErrorConfig {
	public readonly component = {} as FormErrorComponent;
	public readonly debounceTime = faker.number.int({ min: 0, max: 5 });
	public readonly validationType: FormErrorValidationType = 'dirty-or-submit';
	public readonly viewContainerRef = {} as ViewContainerRef;

	constructor(data?: Partial<FormErrorConfig>) {
		Object.assign(this, data);
	}
}
