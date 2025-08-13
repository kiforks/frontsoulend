import { FormControl, NgForm } from '@angular/forms';

import { FormErrorValidationHelper } from './form-error-validation.helper';

describe('FormErrorValidationHelper', () => {
	describe('isDirty', () => {
		it('should return true if control is invalid and dirty', () => {
			const control = new FormControl('', []);

			control.markAsDirty();
			control.setErrors({ required: true });

			const result = FormErrorValidationHelper.isDirty(control);

			expect(result).toBe(true);
		});

		it('should return false if control is valid', () => {
			const control = new FormControl('', []);

			control.markAsDirty();

			const result = FormErrorValidationHelper.isDirty(control);

			expect(result).toBe(false);
		});

		it('should return false if control is not dirty', () => {
			const control = new FormControl('', []);

			control.setErrors({ required: true });

			const result = FormErrorValidationHelper.isDirty(control);

			expect(result).toBe(false);
		});

		it('should return false if control is null', () => {
			const result = FormErrorValidationHelper.isDirty(null);

			expect(result).toBe(false);
		});
	});

	describe('isTouched', () => {
		it('should return true if control is invalid and touched', () => {
			const control = new FormControl('', []);

			control.markAsTouched();
			control.setErrors({ required: true });

			const result = FormErrorValidationHelper.isTouched(control);

			expect(result).toBe(true);
		});

		it('should return false if control is valid', () => {
			const control = new FormControl('', []);

			control.markAsTouched();

			const result = FormErrorValidationHelper.isTouched(control);

			expect(result).toBe(false);
		});

		it('should return false if control is not touched', () => {
			const control = new FormControl('', []);

			control.setErrors({ required: true });

			const result = FormErrorValidationHelper.isTouched(control);

			expect(result).toBe(false);
		});

		it('should return false if control is null', () => {
			const result = FormErrorValidationHelper.isTouched(null);

			expect(result).toBe(false);
		});
	});

	describe('isFormSubmit', () => {
		it('should return true if control is invalid and form is submitted', () => {
			const control = new FormControl('', []);

			control.setErrors({ required: true });

			const form = { submitted: true } as NgForm;
			const result = FormErrorValidationHelper.isFormSubmit(control, form);

			expect(result).toBe(true);
		});

		it('should return false if control is valid', () => {
			const control = new FormControl('', []);
			const form = { submitted: true } as NgForm;
			const result = FormErrorValidationHelper.isFormSubmit(control, form);

			expect(result).toBe(false);
		});

		it('should return false if form is not submitted', () => {
			const control = new FormControl('', []);

			control.setErrors({ required: true });

			const form = { submitted: false } as NgForm;
			const result = FormErrorValidationHelper.isFormSubmit(control, form);

			expect(result).toBe(false);
		});

		it('should return false if control or form is null', () => {
			const form = { submitted: true } as NgForm;
			const result1 = FormErrorValidationHelper.isFormSubmit(null, form);
			const result2 = FormErrorValidationHelper.isFormSubmit(new FormControl('', []), null);

			expect(result1).toBe(false);
			expect(result2).toBe(false);
		});
	});

	describe('isDirtyOrSubmit', () => {
		it('should return true if control is invalid and dirty', () => {
			const control = new FormControl('', []);

			control.markAsDirty();
			control.setErrors({ required: true });

			const form = { submitted: false } as NgForm;
			const result = FormErrorValidationHelper.isDirtyOrSubmit(control, form);

			expect(result).toBe(true);
		});

		it('should return true if control is invalid and form is submitted', () => {
			const control = new FormControl('', []);

			control.setErrors({ required: true });

			const form = { submitted: true } as NgForm;
			const result = FormErrorValidationHelper.isDirtyOrSubmit(control, form);

			expect(result).toBe(true);
		});

		it('should return false if control is valid', () => {
			const control = new FormControl('', []);
			const form = { submitted: true } as NgForm;
			const result = FormErrorValidationHelper.isDirtyOrSubmit(control, form);

			expect(result).toBe(false);
		});

		it('should return false if neither dirty nor submitted', () => {
			const control = new FormControl('', []);

			control.setErrors({ required: true });

			const form = { submitted: false } as NgForm;
			const result = FormErrorValidationHelper.isDirtyOrSubmit(control, form);

			expect(result).toBe(false);
		});

		it('should return false if control is null', () => {
			const form = { submitted: true } as NgForm;
			const result = FormErrorValidationHelper.isDirtyOrSubmit(null, form);

			expect(result).toBe(false);
		});
	});

	describe('isTouchedOrSubmit', () => {
		it('should return true if control is invalid and touched', () => {
			const control = new FormControl('', []);

			control.markAsTouched();
			control.setErrors({ required: true });

			const form = { submitted: false } as NgForm;
			const result = FormErrorValidationHelper.isTouchedOrSubmit(control, form);

			expect(result).toBe(true);
		});

		it('should return true if control is invalid and form is submitted', () => {
			const control = new FormControl('', []);

			control.setErrors({ required: true });

			const form = { submitted: true } as NgForm;
			const result = FormErrorValidationHelper.isTouchedOrSubmit(control, form);

			expect(result).toBe(true);
		});

		it('should return false if control is valid', () => {
			const control = new FormControl('', []);
			const form = { submitted: true } as NgForm;
			const result = FormErrorValidationHelper.isTouchedOrSubmit(control, form);

			expect(result).toBe(false);
		});

		it('should return false if neither touched nor submitted', () => {
			const control = new FormControl('', []);

			control.setErrors({ required: true });

			const form = { submitted: false } as NgForm;
			const result = FormErrorValidationHelper.isTouchedOrSubmit(control, form);

			expect(result).toBe(false);
		});

		it('should return false if control is null', () => {
			const form = { submitted: true } as NgForm;
			const result = FormErrorValidationHelper.isTouchedOrSubmit(null, form);

			expect(result).toBe(false);
		});
	});

	describe('isValid', () => {
		const setup = (overrides: Partial<FormControl> & { submitted?: boolean } = {}) => {
			const control = new FormControl('', []);
			const form = { submitted: overrides.submitted ?? false } as NgForm;

			if (overrides.dirty) {
				control.markAsDirty();
			}

			if (overrides.touched) {
				control.markAsTouched();
			}

			if (overrides.invalid) {
				control.setErrors({ err: true });
			}

			return { control, form };
		};

		it('should delegate to isDirty', () => {
			const { control } = setup({ dirty: true, invalid: true });
			const result = FormErrorValidationHelper.isValid('dirty', control, null);

			expect(result).toBe(true);
		});

		it('should delegate to isTouched', () => {
			const { control } = setup({ touched: true, invalid: true });
			const result = FormErrorValidationHelper.isValid('touched', control, null);

			expect(result).toBe(true);
		});

		it('should delegate to isFormSubmit', () => {
			const { control, form } = setup({ invalid: true, submitted: true });
			const result = FormErrorValidationHelper.isValid('form-submit', control, form);

			expect(result).toBe(true);
		});

		it('should delegate to isDirtyOrSubmit', () => {
			const { control, form } = setup({ dirty: true, invalid: true });
			const result = FormErrorValidationHelper.isValid('dirty-or-submit', control, form);

			expect(result).toBe(true);
		});

		it('should delegate to isTouchedOrSubmit', () => {
			const { control, form } = setup({ touched: true, invalid: true });
			const result = FormErrorValidationHelper.isValid('touched-or-submit', control, form);

			expect(result).toBe(true);
		});

		it('should return false for unknown type', () => {
			const { control, form } = setup({ invalid: true });
			// @ts-expect-error: testing default
			const result = FormErrorValidationHelper.isValid('unknown', control, form);

			expect(result).toBe(false);
		});
	});
});
