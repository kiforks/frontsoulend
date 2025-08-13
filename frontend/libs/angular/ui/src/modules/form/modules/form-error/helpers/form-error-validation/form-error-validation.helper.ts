import { AbstractControl, NgForm } from '@angular/forms';

import { Nullable } from '@core';

import { FormErrorValidationType } from '../../interfaces';

export abstract class FormErrorValidationHelper {
	/**
	 * Determines whether to show the error message based on the given validation strategy.
	 *
	 * @param type - Validation strategy type ('dirty', 'touched', 'form-submit', 'dirty-or-submit', 'touched-or-submit').
	 * @param control - Angular form control to check.
	 * @param form - Parent form (NgForm) to check submission status.
	 * @returns True if error should be shown for the selected strategy, otherwise false.
	 */
	public static isValid(
		type: FormErrorValidationType,
		control: Nullable<AbstractControl>,
		form: Nullable<NgForm>
	): boolean {
		switch (type) {
			case 'dirty':
				return FormErrorValidationHelper.isDirty(control);
			case 'touched':
				return FormErrorValidationHelper.isTouched(control);
			case 'form-submit':
				return FormErrorValidationHelper.isFormSubmit(control, form);
			case 'dirty-or-submit':
				return FormErrorValidationHelper.isDirtyOrSubmit(control, form);
			case 'touched-or-submit':
				return FormErrorValidationHelper.isTouchedOrSubmit(control, form);
			default:
				return false;
		}
	}

	/**
	 * Show error if control is invalid and dirty.
	 * Typical for showing validation after a field was changed.
	 */
	public static isDirty(control: Nullable<AbstractControl>): boolean {
		return Boolean(control?.invalid && control.dirty);
	}

	/**
	 * Show error if control is invalid and touched.
	 * Good for minimal distraction and after the first interaction.
	 */
	public static isTouched(control: Nullable<AbstractControl>): boolean {
		return Boolean(control?.invalid && control.touched);
	}

	/**
	 * Show error if control is invalid and the form was submitted.
	 * Useful for showing all errors only after trying to submit the form.
	 */
	public static isFormSubmit(control: Nullable<AbstractControl>, form: Nullable<NgForm>): boolean {
		return Boolean(control?.invalid && form?.submitted);
	}

	/**
	 * Show error if control is invalid and either dirty or form was submitted.
	 * One of the most common UX patterns (dirty or submit).
	 */
	public static isDirtyOrSubmit(control: Nullable<AbstractControl>, form: Nullable<NgForm>): boolean {
		return Boolean(control?.invalid && (control.dirty || form?.submitted));
	}

	/**
	 * Show error if control is invalid and either touched or form was submitted.
	 * Alternative to dirty+submit, allows errors after any field interaction or submit.
	 */
	public static isTouchedOrSubmit(control: Nullable<AbstractControl>, form: Nullable<NgForm>): boolean {
		return Boolean(control?.invalid && (control?.touched || form?.submitted));
	}
}
