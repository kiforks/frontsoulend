import { ChangeDetectionStrategy, Component, inject, ViewContainerRef } from '@angular/core';

import { FormErrorWrapperSpecComponent } from './form-error-wrapper.spec.component';
import { FormErrorConfig } from '../../../../interfaces';

import { FORM_ERROR_CONFIG } from '../../../../tokens';

@Component({
	selector: 'ui-form-error-host-spec',
	imports: [FormErrorWrapperSpecComponent],
	template: `
		<ui-form-error-wrapper-spec />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: FORM_ERROR_CONFIG,
			useFactory: () =>
				({ viewContainerRef: inject(ViewContainerRef, { self: true }) }) satisfies Partial<FormErrorConfig>,
		},
	],
})
export class FormErrorHostSpecComponent {
	private readonly config = inject(FORM_ERROR_CONFIG);

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly viewContainerRef = this.config.viewContainerRef as ViewContainerRef;
}
