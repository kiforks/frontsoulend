import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

import { Nullable } from '@kiforks/core';

import { ConditionKeyword } from '../../interfaces';

import { CONDITION_KEYWORD } from '../../tokens';

/**
 * `ConditionKeywordDirective` – a directive for conditional rendering of elements.
 * It controls template visibility based on logical operators (`and`, `or`, `else`).
 * Can be used as a `hostDirective` to extend functionality of other directives.
 *
 * ## Example Usage:
 *
 * ### **Standalone Usage**
 * ```html
 * <div *appConditionKeyword="condition; or: true; and: false; else: fallbackRef;">
 *   ...
 * </div>
 *
 * <ng-template #fallbackRef>
 *   <p>Fallback content</p>
 * </ng-template>
 * ```
 * The above template will be displayed only if `condition` is `true`, or `or` is `true`, and `and` is `true`.
 *
 * ### **Usage with Another Directive**
 * ```typescript
 * interface Context {
 *   $implicit: string;
 * }
 *
 * @Directive({
 *   selector: '[customDirective]',
 *   standalone: true,
 *   providers: [{ provide: CONDITION_KEYWORD, useExisting: CustomDirective }],
 *   hostDirectives: [
 *     {
 *       directive: ConditionKeywordDirective,
 *       inputs: [
 *         'appConditionKeywordAnd: customDirectiveAnd',
 *         'appConditionKeywordElse: customDirectiveElse',
 *         'appConditionKeywordOr: customDirectiveOr',
 *       ],
 *     },
 *   ],
 * })
 * export class CustomDirective implements ConditionKeyword<Context> {
 *   public readonly condition = input.required<boolean>({ alias: 'customDirective' });
 *   public readonly context: Context = { $implicit: 'Injected value' };
 * }
 * ```
 * This allows `customDirective` to inherit the conditional rendering logic.
 *
 * #### **Corresponding HTML Usage**
 * ```html
 * <div *customDirective="someCondition; or: anotherCondition; and: mainCondition; else: fallbackRef; let contextValue">
 *   Rendered when the condition is met. Context value: {{ contextValue }}
 * </div>
 *
 * <ng-template #fallbackRef>
 *   <p>This is shown when conditions are not met.</p>
 * </ng-template>
 * ```
 * In this example, the directive `customDirective` passes a contextual value (`$implicit`),
 * which can be accessed as `contextValue` inside the template.
 */
@Directive({
	selector: '[appConditionKeyword]',
	standalone: true,
})
export class ConditionKeywordDirective<C extends object = object> {
	/**
	 * The primary condition that controls the visibility of the template.
	 * If `true`, the template is displayed unless additional conditions override it.
	 */
	public readonly condition = input(false, { alias: 'appConditionKeyword' });

	/**
	 * Allows rendering the template if either the primary condition (`condition`)
	 * or this `or` condition is `true`.
	 */
	public readonly or = input<boolean>(false, {
		alias: 'appConditionKeywordOr',
	});

	/**
	 * Requires both the primary condition (`condition`) and this `and` condition to be `true`
	 * for the template to be rendered.
	 */
	public readonly and = input<boolean>(true, {
		alias: 'appConditionKeywordAnd',
	});

	/**
	 * Specifies an alternative template to render if the primary condition is not met.
	 */
	public readonly else = input<Nullable<TemplateRef<unknown>>>(null, {
		alias: 'appConditionKeywordElse',
	});

	private readonly element = inject<ConditionKeyword<C>>(CONDITION_KEYWORD, { optional: true });
	private readonly viewContainerRef = inject(ViewContainerRef);

	constructor(private readonly templateRef: TemplateRef<C>) {
		effect(() => this.render());
	}

	/**
	 * Evaluates conditions (`condition`, `or`, `and`) and renders the appropriate template.
	 * - If `condition && and` or `or` is `true`, it renders the main template.
	 * - If the conditions fail, it renders the fallback (`else`) template, if provided.
	 * - If no conditions are met and no fallback exists, the template is cleared.
	 */
	private render(): void {
		const context = this.element?.context || {};
		const value = this.element?.condition() ?? this.condition();
		const condition = (value && this.and()) || this.or();
		const elseTemplateRef = this.else();

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
	}
}
