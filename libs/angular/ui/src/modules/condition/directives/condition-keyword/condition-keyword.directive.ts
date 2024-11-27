import { Directive, effect, inject, input, TemplateRef, untracked, ViewContainerRef } from '@angular/core';
import { Nullable } from '@frontsoulend/core';

import { ConditionKeyword } from '../../models';

import { CONDITION_KEYWORD } from '../../tokens';

/**
 * The `ConditionKeywordDirective` is designed to be used as a `hostDirective` to provide complex conditional rendering logic.
 * It evaluates logical conditions (`and`, `or`, `else`) and controls the rendering of templates accordingly.
 *
 * This directive is intended to be used within other directives to augment their functionality with conditional logic.
 *
 * Example usage in combination with another directive:
 * ```typescript
 * interface Context {
 *   $implicit: string;
 * }
 *
 * @Directive({
 *   selector: '[someDirective]',
 *   standalone: true,
 *   providers: [{ provide: CONDITION_KEYWORD, useExisting: SomeDirective }],
 *   hostDirectives: [
 *     {
 *       directive: ConditionKeywordDirective,
 *       inputs: [
 *         'appConditionKeywordAnd: someDirectiveAnd',
 *         'appConditionKeywordElse: someDirectiveElse',
 *         'appConditionKeywordOr: someDirectiveOr',
 *       ],
 *     },
 *   ],
 * })
 * export class SomeDirective implements ConditionKeyword<Context> {
 *   public readonly condition = input.required<boolean>({ alias: 'someDirective' });
 *   public readonly context: Context = { $implicit: 'some value' }; // optional
 * }
 * ```
 * Example DOM:
 * ```html
 * <div *someDirective="value; or true; and false; else templateRef; let contextData">
 *   This content will only be displayed if the combined condition is true
 *   {{ contextData }} - some value from the context
 * </div>
 *
 * <ng-template #templateRef>
 *   This content will be displayed if the combined condition is false.
 * </ng-template>
 * ```
 *
 * In this example, `ConditionKeywordDirective` provides conditional rendering logic to `SomeDirective`.
 */
@Directive({
	selector: '[appConditionKeyword]',
	standalone: true,
})
export class ConditionKeywordDirective<C extends object = object> {
	/**
	 * If set to `true`, it allows the directive to render the template
	 * if either the primary condition or this condition is satisfied.
	 */
	public or = input<boolean>(false, {
		alias: 'appConditionKeywordOr',
	});

	/**
	 * If set to `true`, it requires both the primary condition
	 * and this condition to be satisfied for the directive to render the template.
	 */
	public and = input<boolean>(true, {
		alias: 'appConditionKeywordAnd',
	});

	/**
	 * This allows specifying an alternative template to render
	 * if the primary condition is not satisfied.
	 */
	public elseTemplateRef = input<Nullable<TemplateRef<unknown>>>(null, {
		alias: 'appConditionKeywordElse',
	});

	private readonly element = inject<ConditionKeyword<C>>(CONDITION_KEYWORD);
	private readonly viewContainerRef = inject(ViewContainerRef);

	constructor(private readonly templateRef: TemplateRef<C>) {
		effect(() => this.render());
	}

	/**
	 * This method evaluates the combined conditions (`or` and `and`), and conditionally renders
	 * either the primary template or the alternative template specified by `elseTemplateRef`.
	 */
	private render(): void {
		const context = this.element?.context || {};
		const condition = (this.element.condition() || this.or()) && this.and();
		const elseTemplateRef = this.elseTemplateRef();

		untracked(() => {
			this.viewContainerRef.clear();

			if (condition) {
				this.viewContainerRef.createEmbeddedView(this.templateRef, context);

				return;
			}

			if (elseTemplateRef) {
				this.viewContainerRef.createEmbeddedView(elseTemplateRef, context);

				return;
			}

			this.viewContainerRef.clear();
		});
	}
}
