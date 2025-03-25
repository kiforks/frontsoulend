import { MockProvider } from 'ng-mocks';

import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { faker } from '@faker-js/faker';

import { ConditionDirective } from '../condition.directive';
import { ConditionDirectivePo } from './condition.directive.po';

import { Condition } from '../../../mocks';
import { CONDITION_KEYWORD } from '../../../tokens';

interface HostContext {
	and: boolean;
	condition: boolean;
	or: boolean;
}

describe('ConditionDirective', () => {
	let spectator: SpectatorDirective<ConditionDirective>;
	let directivePo: ConditionDirectivePo;

	const createDirective = createDirectiveFactory(ConditionDirective);
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
        <div data-po="test" *uiCondition="condition; or: or; and: and; else: stubRef;">
          {{ contextValue }}
        </div>

        <ng-template #stubRef>
          <div data-po="stub"></div>
        </ng-template>
      `,
			{ hostProps: { or: false, and: true, condition: true } satisfies HostContext }
		);

		directivePo = new ConditionDirectivePo(spectator);

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
		const condition = new Condition().setContext({ $implicit: contextValue }).setCondition(true);

		spectator = createDirective(
			`
        <div data-po="test" *uiCondition="true; or: or; and: and; else: stubRef; let contextValue;">
          {{ contextValue }}
        </div>

        <ng-template #stubRef>
          <div data-po="stub"></div>
        </ng-template>
      `,
			{
				hostProps: { or: false, and: true, condition: true },
				providers: [MockProvider(CONDITION_KEYWORD, condition)],
			}
		);

		directivePo = new ConditionDirectivePo(spectator);

		expect(directivePo.element).toHaveExactTrimmedText(contextValue);

		checkVisibility(true);

		spectator.setHostInput({ condition: false } satisfies Partial<HostContext>);

		checkVisibility(true);

		condition.setCondition(false);
		spectator.detectChanges();

		checkVisibility(false);

		spectator.setHostInput({ or: true, and: false } satisfies Partial<HostContext>);

		checkVisibility(true);

		spectator.setHostInput({ or: false } satisfies Partial<HostContext>);

		checkVisibility(false);

		condition.setCondition(true);
		spectator.detectChanges();

		checkVisibility(false);

		spectator.setHostInput({ and: true } satisfies Partial<HostContext>);

		checkVisibility(true);

		spectator.setHostInput({ and: false } satisfies Partial<HostContext>);

		checkVisibility(false);
	});
});
