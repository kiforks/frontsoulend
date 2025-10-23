import { Binding, inputBinding } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';

import { Nullable } from '@libs/core/interfaces';

import { EMPTY, fromEvent, merge, Observable } from 'rxjs';

import { FormErrorComponentConfig, FormErrorComponentData, FormErrorConfig } from '../../interfaces';

export abstract class FormErrorHelper {
	/**
	 * Returns an array of input bindings for the error component.
	 *
	 * @param message - The error message to be shown in the component.
	 * @param control - The form control associated with the error.
	 * @returns Array of bindings for the error component.
	 */
	public static getComponentBindings(message: string, control: FormErrorComponentConfig['control']): Binding[] {
		return [
			inputBinding(
				'message' satisfies keyof FormErrorComponentData,
				() => message satisfies FormErrorComponentConfig['message']
			),
			inputBinding(
				'control' satisfies keyof FormErrorComponentData,
				() => control satisfies FormErrorComponentConfig['control']
			),
		];
	}

	/**
	 * Creates an observable that emits when the control's status changes,
	 * the host element loses focus, or the form is submitted.
	 *
	 * @param control - The form control to observe for status changes.
	 * @param form - The parent form containing the control.
	 * @param hostElement - The DOM element to observe for blur events.
	 * @returns An observable emitting on status change, blur, or form submit.
	 */
	public static getTrigger$(
		control: AbstractControl,
		form: Nullable<NgForm>,
		hostElement: HTMLElement
	): Observable<unknown> {
		const statusChanges$ = control.statusChanges;
		const focusout$ = fromEvent(hostElement, 'focusout', { capture: true });
		const formSubmit$: Observable<unknown> = form?.ngSubmit ?? EMPTY;

		return merge(statusChanges$, focusout$, formSubmit$);
	}

	/**
	 * Renders the error component in the specified view container with the given bindings.
	 *
	 * @param message - The error message to display in the component.
	 * @param config - The configuration for the error component (container and optional custom component).
	 * @param control - The form control associated with the error.
	 */
	public static renderComponent(
		message: string,
		{ viewContainerRef, component }: FormErrorConfig,
		control: AbstractControl
	): void {
		const bindings = FormErrorHelper.getComponentBindings(message, control);

		viewContainerRef.createComponent(component, { bindings });
	}
}
