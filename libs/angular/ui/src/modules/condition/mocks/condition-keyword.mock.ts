import { signal } from '@angular/core';

import { faker } from '@faker-js/faker';

import { ConditionKeyword as ConditionKeywordInterface } from '../interfaces';

export class ConditionKeyword implements ConditionKeywordInterface {
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
