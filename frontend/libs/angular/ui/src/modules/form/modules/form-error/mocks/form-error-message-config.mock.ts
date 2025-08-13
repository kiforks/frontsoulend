import { faker } from '@faker-js/faker';

import { FormErrorMessageConfig } from '../interfaces';

export class FormErrorMessageConfigMock<P extends Record<string, object>> implements FormErrorMessageConfig<P> {
	public readonly messageValue = faker.lorem.sentence();

	public readonly filter?: FormErrorMessageConfig<P>['filter'];

	constructor(data?: Partial<Omit<FormErrorMessageConfigMock<P>, 'message'>>) {
		Object.assign(this, data);
	}

	public readonly message: FormErrorMessageConfig<P>['message'] = () => this.messageValue;
}
