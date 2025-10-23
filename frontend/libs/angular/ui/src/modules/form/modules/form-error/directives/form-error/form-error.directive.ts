import { computed, DestroyRef, Directive, ElementRef, inject, input, OnInit, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlContainer, NgControl, NgForm } from '@angular/forms';

import { Nullable } from '@libs/core/interfaces';

import { debounceTime, distinctUntilChanged, filter, map, skip, startWith, tap } from 'rxjs';
import { isEqual } from 'lodash';

import { FormErrorHelper, FormErrorMessageHelper, FormErrorValidationHelper } from '../../helpers';
import { FormErrorConfig, FormErrorMessages } from '../../interfaces';

import { FormErrorOptionsConfig } from '../../configs';
import { FORM_ERROR_CONFIG, FORM_ERROR_MESSAGES } from '../../tokens';

@Directive({
	selector: `
		[uiFormError][formControl],
		[uiFormError][formControlName],
		[uiFormError][formGroup],
		[uiFormError][formGroupName],
		[uiFormError][ngModel],
	`,
})
export class FormErrorDirective<M extends { [K in keyof M]: object } = object> implements OnInit {
	private readonly formErrorMessages = inject<FormErrorMessages<M>>(FORM_ERROR_MESSAGES, { optional: true });
	private readonly formErrorConfig = inject<Partial<FormErrorConfig>>(FORM_ERROR_CONFIG, { optional: true });
	private readonly ngControl = inject(NgControl, { self: true, optional: true });
	private readonly controlContainer = inject(ControlContainer, { self: true, optional: true });
	private readonly parentControlContainer = inject(ControlContainer, { skipSelf: true, optional: true, host: true });
	private readonly destroyRef = inject(DestroyRef);
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly elementRef = inject(ElementRef);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly messages = input(this.formErrorMessages, { alias: 'uiFormErrorMessages' });
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly config = input(this.formErrorConfig, { alias: 'uiFormErrorConfig' });

	private readonly configValue = computed<FormErrorConfig>(() => ({
		viewContainerRef: this.viewContainerRef,
		component: FormErrorOptionsConfig.Component,
		debounceTime: FormErrorOptionsConfig.DebounceTime,
		validationType: FormErrorOptionsConfig.ValidationType,
		...this.config(),
	}));

	private get control(): AbstractControl {
		const control = this.ngControl ?? this.controlContainer;

		if (!control?.control) {
			throw new Error('[FormErrorDirective]: Control is not defined');
		}

		return control.control;
	}

	private get form(): Nullable<NgForm> {
		return this.parentControlContainer?.formDirective as Nullable<NgForm>;
	}

	public ngOnInit(): void {
		this.setup();
	}

	private setup(): void {
		const messages = this.messages();

		if (!messages) {
			throw new Error('[FormErrorDirective]: Messages are not defined');
		}

		this.observeChanges(this.control, messages);
	}

	private observeChanges(control: AbstractControl, messages: FormErrorMessages<M>): void {
		const errorMessageTrigger$ = FormErrorHelper.getTrigger$(control, this.form, this.elementRef.nativeElement);

		errorMessageTrigger$
			.pipe(
				startWith(control.status),
				skip(1),
				debounceTime(this.configValue().debounceTime),
				map(() => ({
					message: FormErrorMessageHelper.getMessage(control, messages),
					isValid: FormErrorValidationHelper.isValid(this.configValue().validationType, control, this.form),
				})),
				distinctUntilChanged((previous, current) => isEqual(previous, current)),
				tap(() => this.configValue().viewContainerRef.clear()),
				filter(({ isValid }) => isValid),
				map(({ message }) => message),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe(message => message && FormErrorHelper.renderComponent(message, this.configValue(), control));
	}
}
