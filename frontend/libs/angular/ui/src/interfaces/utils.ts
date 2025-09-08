import { input, output } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyInputSignal = ReturnType<typeof input<any>>;
type ValueOf<S> = S extends () => infer V ? V : never;
type AnyOutputRef = ReturnType<typeof output<unknown>> | ReturnType<typeof outputFromObservable<unknown>>;
type EmittedOf<S> = S extends { emit(value: infer V): unknown }
	? V
	: S extends { subscribe(cb: (value: infer V) => unknown): unknown }
		? V
		: never;

export type ComponentOutputs<T extends object> = keyof {
	[K in keyof T as [T[K]] extends [AnyOutputRef] ? K : never]: 1;
} extends never
	? never
	: {
			[K in keyof T as [T[K]] extends [AnyOutputRef] ? K : never]?: EmittedOf<T[K]>;
		};

export type ComponentInputs<T extends object> = keyof {
	[K in keyof T as [T[K]] extends [AnyInputSignal] ? K : never]: 1;
} extends never
	? never
	: {
			[K in keyof T as [T[K]] extends [AnyInputSignal] ? K : never]?: ValueOf<T[K]>;
		};
