import { TemplateRef } from '@angular/core';

import { Nullable } from '@core';

import { ConditionDirective } from '../../directives';

export type ConditionElse = {
	[K in keyof Pick<ConditionDirective, 'else'>]: Nullable<TemplateRef<unknown>>;
};

export type ConditionLogicalOperators = {
	[K in keyof Pick<ConditionDirective, 'and' | 'or'>]: boolean;
};

export interface ConditionInputs extends ConditionElse, ConditionLogicalOperators {}
