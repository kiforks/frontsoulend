import { TemplateRef } from '@angular/core';

import { Nullable } from '@kiforks/core';

import { ConditionKeywordDirective } from '../../directives';

export type ConditionKeywordElse = {
	[K in keyof Pick<ConditionKeywordDirective, 'else'>]: Nullable<TemplateRef<unknown>>;
};

export type ConditionKeywordLogicalOperators = {
	[K in keyof Pick<ConditionKeywordDirective, 'and' | 'or'>]: boolean;
};

export interface ConditionKeywordInputs extends ConditionKeywordElse, ConditionKeywordLogicalOperators {}
