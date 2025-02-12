import { Directive, inject, input, signal } from '@angular/core';

import { MediaService } from '../../services';
import { MediaBreakpoint, MediaElement } from '../../interfaces';

import { CONDITION_KEYWORD, ConditionKeyword, ConditionKeywordDirective } from '../../../condition';
import { MEDIA_ELEMENT } from '../../tokens';
import { MediaBaseDirective } from '../media-base';

/**
 * The `MediaMinDirective` is designed to handle `min-width` media queries.
 * It uses the `MediaBaseDirective` as a host directive to leverage its logic for media query handling.
 * Additionally, it incorporates `ConditionKeywordDirective` for conditional rendering based on logical conditions.
 *
 * This directive is intended for responsive design, allowing content to be displayed only from a specific screen size and up.
 *
 * Example usage in the DOM:
 * ```html
 * <div *appMediaMin="'md'">
 *   This content will only be displayed for screen sizes from the 'md' breakpoint and up.
 * </div>
 * ```
 *
 * Usage with conditions in the DOM:
 * ```html
 * <div *appMediaMin="'md'; or true; and false; else templateRef">
 *   This content will only be displayed for screen sizes from the 'md' breakpoint and up
 *   or if the specified conditions are met.
 * </div>
 *
 * <ng-template #templateRef>
 *   This content will be displayed if the conditions are not met.
 * </ng-template>
 * ```
 */
@Directive({
	selector: '[appMediaMin]',
	standalone: true,
	providers: [
		{ provide: MEDIA_ELEMENT, useExisting: MediaMinDirective },
		{ provide: CONDITION_KEYWORD, useExisting: MediaMinDirective },
	],
	hostDirectives: [
		MediaBaseDirective,
		{
			directive: ConditionKeywordDirective,
			inputs: [
				'appConditionKeywordAnd: appMediaMinAnd',
				'appConditionKeywordElse: appMediaMinElse',
				'appConditionKeywordOr: appMediaMinOr',
			],
		},
	],
})
export class MediaMinDirective implements MediaElement, ConditionKeyword {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'appMediaMin' });

	public readonly condition = signal(false);

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaMin;
}
