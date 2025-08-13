import { faker } from '@faker-js/faker';

import { FormErrorMessageConfig, FormErrorMessages } from '../interfaces';

export interface FormErrorMessagesLengthParams {
	actualLength: number;
	requiredLength: number;
}

export interface FormErrorMessagesMockParams {
	maxlength: FormErrorMessagesLengthParams;
	minlength: FormErrorMessagesLengthParams;
	required: object;
}

export class FormErrorMessagesMock implements FormErrorMessages<FormErrorMessagesMockParams> {
	public maxlength: FormErrorMessageConfig<FormErrorMessagesLengthParams> = {
		message: ({ actualLength, requiredLength }) => {
			const message = `${faker.lorem.sentence()}${requiredLength}${actualLength}`;

			this.maxlengthMessageValue = message;

			return message;
		},
		filter: () => this.maxlengthFilterValue,
	};

	private maxlengthMessageValue = '';
	private maxlengthFilterValue = faker.datatype.boolean();
	private requiredMessageValue = '';
	private minlengthMessageValue = '';

	public get maxlengthMessage(): string {
		return this.maxlengthMessageValue;
	}

	public get maxlengthFilter(): boolean {
		return this.maxlengthFilterValue;
	}

	public get requiredMessage(): string {
		return this.requiredMessageValue;
	}

	public get minlengthMessage(): string {
		return this.minlengthMessageValue;
	}

	public required = (): string => {
		const message = faker.lorem.sentence();

		this.requiredMessageValue = message;

		return message;
	};

	public minlength = ({ requiredLength, actualLength }: FormErrorMessagesLengthParams): string => {
		const message = `${faker.lorem.sentence()}${requiredLength}${actualLength}`;

		this.minlengthMessageValue = message;

		return message;
	};

	public setMaxlengthFilter(value: boolean): this {
		this.maxlengthFilterValue = value;

		return this;
	}
}
