import { InputSignal, Signal } from '@angular/core';

export interface ConditionKeyword<C extends object = object, I = unknown> {
	readonly condition: InputSignal<I> | Signal<boolean>;
	readonly context?: C;
}
