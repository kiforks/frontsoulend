import { FormControl, Validators } from '@angular/forms';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { FormErrorComponent } from './form-error.component';

import { FormErrorComponentConfigMock } from '../../mocks';

describe('FormErrorComponent', () => {
	let spectator: SpectatorHost<FormErrorComponent>;

	const createHost = createHostFactory(FormErrorComponent);

	it('should show valid class when control is valid', () => {
		const { control, message } = new FormErrorComponentConfigMock();

		spectator = createHost(`<ui-form-error [message]="message" [control]="control" />`, {
			hostProps: {
				control,
				message,
			},
		});

		const { element } = spectator;

		expect(element).toHaveClass('is-valid');
		expect(element).toHaveExactTrimmedText(message);
		expect(spectator.component.control()).toEqual(control);

		spectator.setHostInput({
			control: new FormControl('', { validators: [Validators.required] }),
		});

		expect(element).not.toHaveClass('is-valid');
	});

	describe('required inputs validation', () => {
		it('should throw error when control input is missing', () => {
			const { control } = new FormErrorComponentConfigMock();

			expect(() => {
				spectator = createHost(`<ui-form-error [control]="control" />`, {
					hostProps: {
						control,
					},
				});
			}).toThrow();
		});

		it('should throw error when message input is missing', () => {
			const { message } = new FormErrorComponentConfigMock();

			expect(() => {
				spectator = createHost(`<ui-form-error [message]="message" />`, {
					hostProps: {
						message,
					},
				});
			}).toThrow();
		});
	});
});
