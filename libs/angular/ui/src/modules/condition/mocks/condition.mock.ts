import { signal } from '@angular/core';

import { faker } from '@faker-js/faker';

import { Condition as ConditionInterface } from '../interfaces';

export class Condition implements ConditionInterface {
	public readonly condition = signal(false);

	public readonly context = { $implicit: faker.company.name() };

	public setContext({ $implicit }: { $implicit: string }): this {
		this.context.$implicit = $implicit;

		return this;
	}

	public setCondition(value: boolean): this {
		this.condition.set(value);

		return this;
	}
}
