import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormErrorDirective } from '../../form-error.directive';
import { FormErrorConfig } from '../../../../interfaces';

@Component({
	selector: 'ui-form-error-container-spec',
	imports: [FormErrorDirective, ReactiveFormsModule],
	template: `
		<input
			type="password"
			uiFormError
			[formControl]="control"
			[uiFormErrorConfig]="config()"
			data-po="ui-form-error-password"
		/>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorContainerSpecComponent {
	public readonly viewContainerRef = input.required<FormErrorConfig['viewContainerRef']>();

	protected readonly control = new FormControl('', [Validators.required]);

	protected readonly config = computed<Partial<FormErrorConfig>>(() => ({
		viewContainerRef: this.viewContainerRef(),
	}));
}
