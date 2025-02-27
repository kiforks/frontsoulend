import { InputSignal, Signal } from '@angular/core';

export interface Condition<C extends object = object, I = unknown> {
	readonly condition: InputSignal<I> | Signal<boolean>;
	readonly context?: C;
}
