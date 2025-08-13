import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormErrorComponentData } from '../../interfaces';

@Component({
	selector: 'ui-form-error',
	templateUrl: './form-error.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { '[class.is-valid]': 'control().status === "VALID"' },
})
export class FormErrorComponent implements FormErrorComponentData {
	public readonly message = input.required<string>();
	public readonly control = input.required<AbstractControl>();
}
