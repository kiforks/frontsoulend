import { Directive, inject, input, signal } from '@angular/core';

import { MediaService } from '../../services';

import { MediaBreakpoint, MediaElement } from '../../models';

import { CONDITION_KEYWORD, ConditionKeyword, ConditionKeywordDirective } from '../../../condition';
import { MEDIA_ELEMENT } from '../../tokens';
import { MediaBaseDirective } from '../media-base';

/**
 * The `MediaMaxDirective` is designed to handle `max-width` media queries.
 * It uses the `MediaBaseDirective` as a host directive to leverage its logic for media query handling.
 * Additionally, it incorporates `ConditionKeywordDirective` for conditional rendering based on logical conditions.
 *
 * This directive is intended for responsive design, allowing content to be displayed only up to a specific screen size.
 *
 * Example usage in the DOM:
 * ```html
 * <div *appMediaMax="'lg'">
 *   This content will only be displayed for screen sizes up to the 'lg' breakpoint.
 * </div>
 * ```
 *
 * Usage with conditions in the DOM:
 * ```html
 * <div *appMediaMax="'lg'; or true; and false; else templateRef">
 *   This content will only be displayed for screen sizes up to the 'lg' breakpoint
 *   or if the specified conditions are met.
 * </div>
 *
 * <ng-template #templateRef>
 *   This content will be displayed if the conditions are not met.
 * </ng-template>
 * ```
 */
@Directive({
	selector: '[appMediaMax]',
	standalone: true,
	providers: [
		{ provide: MEDIA_ELEMENT, useExisting: MediaMaxDirective },
		{ provide: CONDITION_KEYWORD, useExisting: MediaMaxDirective },
	],
	hostDirectives: [
		MediaBaseDirective,
		{
			directive: ConditionKeywordDirective,
			inputs: [
				'appConditionKeywordAnd: appMediaMaxAnd',
				'appConditionKeywordElse: appMediaMaxElse',
				'appConditionKeywordOr: appMediaMaxOr',
			],
		},
	],
})
export class MediaMaxDirective implements MediaElement, ConditionKeyword {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'appMediaMax' });

	public readonly condition = signal(false);

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaMax;
}
