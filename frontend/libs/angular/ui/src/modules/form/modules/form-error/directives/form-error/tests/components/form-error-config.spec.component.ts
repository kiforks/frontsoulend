import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormErrorComponentData } from '../../../../interfaces';

@Component({
	selector: 'ui-form-error-config-spec',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorConfigSpecComponent implements FormErrorComponentData {
	public readonly message = input.required<string>();
	public readonly control = input.required<AbstractControl>();
}
