import { ViewContainerRef } from '@angular/core';

import { FormErrorComponent, FormErrorComponentData } from './form-error-component.interface';
import { FormErrorValidationType } from './form-error-validation.interface';

export interface FormErrorConfig<C extends FormErrorComponentData = FormErrorComponentData> {
	component: FormErrorComponent<C>;
	debounceTime: number;
	validationType: FormErrorValidationType;
	viewContainerRef: ViewContainerRef;
}
