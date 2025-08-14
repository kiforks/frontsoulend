import { AbstractControl } from '@angular/forms';

import { Nullable } from '@core';

import { FormErrorMessageConfig, FormErrorMessages } from '../../interfaces';

export abstract class FormErrorMessageHelper {
	/**
	 * Returns the error message for the first validation error found on the control, if any.
	 *
	 * @template M - Mapping of error keys to parameter object types.
	 * @param control - The Angular form control to extract errors from.
	 * @param messages - A map of error handlers or configs for each error type.
	 * @returns The error message string, or null if there are no errors.
	 */
	public static getMessage<M extends { [K in keyof M]: object }>(
		control: AbstractControl,
		messages: FormErrorMessages<M>
	): Nullable<string> {
		const errorKey = FormErrorMessageHelper.getFirstErrorKey(control);

		if (!errorKey) {
			return null;
		}

		return FormErrorMessageHelper.resolveErrorMessage<M>(errorKey as string, control, messages);
	}

	/**
	 * Returns the key of the first validation error on the control, or null if there are none.
	 *
	 * @param control - The Angular form control to check for errors.
	 * @returns The key of the first error found, or null.
	 */
	public static getFirstErrorKey(control: AbstractControl): Nullable<string> {
		const { errors } = control;

		if (!errors) {
			return null;
		}

		const [firstErrorKey] = Object.keys(errors);

		return firstErrorKey || null;
	}

	/**
	 * Resolves and returns the error message for a specific error key on the control.
	 *
	 * @template M - Mapping of error keys to parameter object types.
	 * @param errorKey - The error key to resolve.
	 * @param control - The Angular form control containing the error.
	 * @param messages - A map of error handlers or configs for each error type.
	 * @returns The error message string, or null if no handler is found.
	 */
	public static resolveErrorMessage<M extends { [K in keyof M]: object }>(
		errorKey: string,
		control: AbstractControl,
		messages: FormErrorMessages<M>
	): Nullable<string> {
		const { errors } = control;

		if (!errors) {
			return null;
		}

		const data = messages[errorKey as keyof M];

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!data) {
			return null;
		}

		const error: M[keyof M] = errors[errorKey];

		if (typeof data === 'function') {
			return data(error);
		}

		return FormErrorMessageHelper.handleConfigMessage<M[keyof M]>(error, control, data);
	}

	/**
	 * Handles error message resolution for a FormErrorMessageConfig object.
	 *
	 * @template P - Parameter object type for the error.
	 * @param error - The error parameters object.
	 * @param control - The Angular form control containing the error.
	 * @param config - The error message config containing a message function and optional filter.
	 * @returns The error message string, or null if filter returns false.
	 */
	public static handleConfigMessage<P extends object>(
		error: P,
		control: AbstractControl,
		config: FormErrorMessageConfig<P>
	): Nullable<string> {
		const { message: messageFn, filter } = config;

		if (!filter) {
			return messageFn(error);
		}

		const isValid = filter(error, control);

		return isValid ? messageFn(error) : null;
	}
}
