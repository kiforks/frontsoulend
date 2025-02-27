import { Directive, inject, input, signal } from '@angular/core';

import { MediaService } from '../../services';
import { MediaBetweenBreakpoints, MediaElement } from '../../interfaces';

import { Condition, CONDITION_KEYWORD, ConditionDirective } from '../../../condition';
import { MEDIA_ELEMENT } from '../../tokens';
import { MediaBaseDirective } from '../media-base';

/**
 * The `MediaBetweenDirective` handles media queries that target a range between two breakpoints.
 * It utilizes the `MediaBaseDirective` as a host directive to leverage its core logic for media query handling.
 * Additionally, it incorporates `ConditionDirective` for conditional rendering based on logical conditions.
 *
 * This directive is intended for responsive design, allowing content to be displayed only within specific screen size ranges.
 *
 * Example usage in the DOM:
 * ```html
 * <div *appMediaBetween="['md', 'lg']">
 *   This content will only be displayed for screen sizes between the 'md' and 'lg' breakpoints.
 * </div>
 * ```
 *
 * Usage with conditions in the DOM:
 * ```html
 * <div *appMediaBetween="['md', 'lg']; or true; and false; else templateRef">
 *   This content will only be displayed for screen sizes between the 'md' and 'lg' breakpoints
 *   or if the specified conditions are met.
 * </div>
 *
 * <ng-template #templateRef>
 *   This content will be displayed if the conditions are not met.
 * </ng-template>
 * ```
 */
@Directive({
	selector: '[appMediaBetween]',
	standalone: true,
	providers: [
		{ provide: MEDIA_ELEMENT, useExisting: MediaBetweenDirective },
		{ provide: CONDITION_KEYWORD, useExisting: MediaBetweenDirective },
	],
	hostDirectives: [
		MediaBaseDirective,
		{
			directive: ConditionDirective,
			inputs: [
				'appConditionAnd: appMediaBetweenAnd',
				'appConditionElse: appMediaBetweenElse',
				'appConditionOr: appMediaBetweenOr',
			],
		},
	],
})
export class MediaBetweenDirective implements MediaElement<MediaBetweenBreakpoints>, Condition {
	public readonly breakpoint = input.required<MediaBetweenBreakpoints>({
		alias: 'appMediaBetween',
	});

	public readonly condition = signal(false);

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaBetween;
}
