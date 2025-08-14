import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	inject,
	input,
	ViewContainerRef,
} from '@angular/core';

import { FormErrorContainerSpecComponent } from './form-error-container.spec.component';

import { FORM_ERROR_CONFIG } from '../../../../tokens';

@Component({
	selector: 'ui-form-error-wrapper-spec',
	imports: [FormErrorContainerSpecComponent],
	template: `
		<ui-form-error-container-spec [viewContainerRef]="viewContainerRef()" />

		<ng-content />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorWrapperSpecComponent {
	public readonly container = input(ViewContainerRef);
	private readonly childContainerRef = contentChild('containerRef', { read: ViewContainerRef });
	private readonly config = inject(FORM_ERROR_CONFIG, { optional: true });

	// eslint-disable-next-line @typescript-eslint/member-ordering
	protected readonly viewContainerRef = computed(() => {
		const viewContainerRef = this.config?.viewContainerRef ?? this.childContainerRef();

		if (!viewContainerRef) {
			throw new Error('[FormErrorWrapperSpecComponent]: View container ref is not defined');
		}

		return viewContainerRef;
	});
}
