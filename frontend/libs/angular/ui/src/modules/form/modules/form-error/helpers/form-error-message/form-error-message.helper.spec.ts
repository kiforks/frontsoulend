import { FormControl } from '@angular/forms';

import { FormErrorMessageHelper } from './form-error-message.helper';

import { FormErrorMessageConfigMock, FormErrorMessagesMock, FormErrorMessagesMockParams } from '../../mocks';

describe('FormErrorMessageHelper', () => {
	describe('getFirstErrorKey', () => {
		it('should return null if no errors', () => {
			const control = new FormControl('');

			control.setErrors(null);

			const result = FormErrorMessageHelper.getFirstErrorKey(control);

			expect(result).toBeNull();
		});

		it('should return first error key', () => {
			const control = new FormControl('');

			control.setErrors({ required: true, email: true });

			const result = FormErrorMessageHelper.getFirstErrorKey(control);

			expect(result).toBe('required');
		});

		it('should return null if errors is empty object', () => {
			const control = new FormControl('');

			control.setErrors({});

			const result = FormErrorMessageHelper.getFirstErrorKey(control);

			expect(result).toBeNull();
		});
	});

	describe('resolveErrorMessage', () => {
		it('should return null if no errors', () => {
			const control = new FormControl('');
			const messages = new FormErrorMessagesMock();

			control.setErrors(null);

			const result = FormErrorMessageHelper.resolveErrorMessage<FormErrorMessagesMockParams>(
				'required',
				control,
				messages
			);

			expect(result).toBeNull();
		});

		it('should return null if no message handler', () => {
			const control = new FormControl('');
			const messages = {};

			control.setErrors({ email: true });

			const result = FormErrorMessageHelper.resolveErrorMessage('email', control, messages);

			expect(result).toBeNull();
		});

		it('should call message function and return string', () => {
			const control = new FormControl('');
			const messages = new FormErrorMessagesMock();

			control.setErrors({ required: { min: 3 } });

			const result = FormErrorMessageHelper.resolveErrorMessage<FormErrorMessagesMockParams>(
				'required',
				control,
				messages
			);

			expect(result).toBe(messages.requiredMessage);
		});

		it('should handle config message with filter returning true', () => {
			const control = new FormControl('');
			const messages = new FormErrorMessagesMock();

			messages.setMaxlengthFilter(true);

			control.setErrors({ maxlength: { requiredLength: 5, actualLength: 10 } });

			const result = FormErrorMessageHelper.resolveErrorMessage<FormErrorMessagesMockParams>(
				'maxlength',
				control,
				messages
			);

			expect(result).toBe(messages.maxlengthMessage);
		});

		it('should handle config message with filter returning false', () => {
			const control = new FormControl('');
			const messages = new FormErrorMessagesMock();

			messages.setMaxlengthFilter(false);

			control.setErrors({ maxlength: { requiredLength: 7, actualLength: 3 } });

			const result = FormErrorMessageHelper.resolveErrorMessage<FormErrorMessagesMockParams>(
				'maxlength',
				control,
				messages
			);

			expect(result).toBeNull();
		});
	});

	describe('getMessage', () => {
		it('should return null if there is no error', () => {
			const control = new FormControl('');
			const messages = new FormErrorMessagesMock();

			control.setErrors(null);

			const result = FormErrorMessageHelper.getMessage<FormErrorMessagesMockParams>(control, messages);

			expect(result).toBeNull();
		});

		it('should return message for first error', () => {
			const control = new FormControl('');
			const messages = new FormErrorMessagesMock();

			control.setErrors({ required: { value: 1 }, maxlength: { requiredLength: 10, actualLength: 3 } });

			const result = FormErrorMessageHelper.getMessage<FormErrorMessagesMockParams>(control, messages);

			expect(result).toBe(messages.requiredMessage);
		});
	});

	describe('getMessage', () => {
		it('should return null if there is no error', () => {
			const control = new FormControl('');

			control.setErrors(null);

			const messages = { required: () => 'Required' };
			const result = FormErrorMessageHelper.getMessage(control, messages);

			expect(result).toBeNull();
		});

		it('should return message for first error', () => {
			const control = new FormControl('');

			control.setErrors({ required: { value: 1 }, email: { value: 2 } });

			const messages = {
				required: (err: { value: number }) => `Required ${err.value}`,
				email: (err: { value: number }) => `Email ${err.value}`,
			};
			const result = FormErrorMessageHelper.getMessage(control, messages);

			expect(result).toBe('Required 1');
		});
	});

	describe('handleConfigMessage', () => {
		it('should return message if no filter', () => {
			const control = new FormControl('');
			const config = new FormErrorMessageConfigMock();
			const result = FormErrorMessageHelper.handleConfigMessage({}, control, config);

			expect(result).toBe(config.messageValue);
		});

		it('should return message if filter is true', () => {
			const control = new FormControl('');
			const config = new FormErrorMessageConfigMock({ filter: () => true });
			const result = FormErrorMessageHelper.handleConfigMessage({}, control, config);

			expect(result).toBe(config.messageValue);
		});

		it('should return null if filter is false', () => {
			const control = new FormControl('');
			const config = new FormErrorMessageConfigMock({ filter: () => false });
			const result = FormErrorMessageHelper.handleConfigMessage({}, control, config);

			expect(result).toBeNull();
		});
	});
});
