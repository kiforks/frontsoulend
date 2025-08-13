import { InputSignal, Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export type FormErrorComponent<C extends FormErrorComponentData = FormErrorComponentData> = Type<C>;

export interface FormErrorComponentConfig {
	readonly control: AbstractControl;
	readonly message: string;
}

export interface FormErrorComponentData {
	readonly control: InputSignal<FormErrorComponentConfig['control']>;
	readonly message: InputSignal<FormErrorComponentConfig['message']>;
}
