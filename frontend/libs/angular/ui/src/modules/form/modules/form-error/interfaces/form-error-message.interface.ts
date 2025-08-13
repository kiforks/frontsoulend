import { AbstractControl } from '@angular/forms';

export type FormErrorMessageHandler<P extends object> = (params: P) => string;
export type FormErrorMessageFilter<P extends object> = (params: P, control: AbstractControl) => boolean;
export type FormErrorMessageData<P extends object> = FormErrorMessageConfig<P> | FormErrorMessageHandler<P>;
export type FormErrorMessages<M extends { [K in keyof M]: object }> = {
	[K in keyof M]: FormErrorMessageData<M[K]>;
};

export interface FormErrorMessageConfig<P extends object> {
	filter?: FormErrorMessageFilter<P>;
	message: FormErrorMessageHandler<P>;
}
