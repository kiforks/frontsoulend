import { FormControl } from '@angular/forms';

import { faker } from '@faker-js/faker';

import { FormErrorComponentConfig } from '../interfaces';

export class FormErrorComponentConfigMock implements FormErrorComponentConfig {
	public readonly control = new FormControl(faker.lorem.sentence(), { nonNullable: true });
	public readonly message = faker.lorem.sentence();

	constructor(data?: Partial<FormErrorComponentConfig>) {
		Object.assign(this, data);
	}
}
