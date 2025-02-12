import { MockProvider } from 'ng-mocks';

import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { faker } from '@faker-js/faker';

import { ConditionKeywordDirective } from '../condition-keyword.directive';
import { ConditionKeywordDirectivePO } from './condition-keyword.directive.po';

import { ConditionKeyword } from '../../../mocks';
import { CONDITION_KEYWORD } from '../../../tokens';

interface HostContext {
	and: boolean;
	condition: boolean;
	or: boolean;
}

describe('ConditionKeywordDirective', () => {
	let spectator: SpectatorDirective<ConditionKeywordDirective>;
	let directivePo: ConditionKeywordDirectivePO;

	const createDirective = createDirectiveFactory(ConditionKeywordDirective);
	const checkVisibility = (isShown: boolean): void => {
		if (isShown) {
			expect(directivePo.stub).not.toExist();
			expect(directivePo.element).toExist();

			return;
		}

		expect(directivePo.stub).toExist();
		expect(directivePo.element).not.toExist();
	};

	it('should correctly toggle element visibility based on condition, or, and values', () => {
		spectator = createDirective(
			`
        <div data-po="test" *appConditionKeyword="condition; or: or; and: and; else: stubRef;">
          {{ contextValue }}
        </div>

        <ng-template #stubRef>
          <div data-po="stub"></div>
        </ng-template>
      `,
			{ hostProps: { or: false, and: true, condition: true } satisfies HostContext }
		);

		directivePo = new ConditionKeywordDirectivePO(spectator);

		checkVisibility(true);

		spectator.setHostInput({ condition: false, or: true, and: false } satisfies Partial<HostContext>);

		checkVisibility(true);

		spectator.setHostInput({ or: false } satisfies Partial<HostContext>);

		checkVisibility(false);

		spectator.setHostInput({ condition: true } satisfies Partial<HostContext>);

		checkVisibility(false);

		spectator.setHostInput({ and: true } satisfies Partial<HostContext>);

		checkVisibility(true);

		spectator.setHostInput({ and: false } satisfies Partial<HostContext>);

		checkVisibility(false);
	});

	it('should correctly use CONDITION_KEYWORD token for context and condition evaluation', () => {
		const contextValue = faker.company.name();
		const conditionKeyword = new ConditionKeyword().setContext({ $implicit: contextValue }).setCondition(true);

		spectator = createDirective(
			`
        <div data-po="test" *appConditionKeyword="true; or: or; and: and; else: stubRef; let contextValue;">
          {{ contextValue }}
        </div>

        <ng-template #stubRef>
          <div data-po="stub"></div>
        </ng-template>
      `,
			{
				hostProps: { or: false, and: true, condition: true },
				providers: [MockProvider(CONDITION_KEYWORD, conditionKeyword)],
			}
		);

		directivePo = new ConditionKeywordDirectivePO(spectator);

		expect(directivePo.element).toHaveExactTrimmedText(contextValue);

		checkVisibility(true);

		spectator.setHostInput({ condition: false } satisfies Partial<HostContext>);

		checkVisibility(true);

		conditionKeyword.setCondition(false);
		spectator.detectChanges();

		checkVisibility(false);

		spectator.setHostInput({ or: true, and: false } satisfies Partial<HostContext>);

		checkVisibility(true);

		spectator.setHostInput({ or: false } satisfies Partial<HostContext>);

		checkVisibility(false);

		conditionKeyword.setCondition(true);
		spectator.detectChanges();

		checkVisibility(false);

		spectator.setHostInput({ and: true } satisfies Partial<HostContext>);

		checkVisibility(true);

		spectator.setHostInput({ and: false } satisfies Partial<HostContext>);

		checkVisibility(false);
	});
});
