import { Directive, inject, input, signal } from '@angular/core';

import { MediaService } from '../../services';
import { MediaBreakpoint, MediaElement } from '../../interfaces';

import { Condition, CONDITION_KEYWORD, ConditionDirective } from '../../../condition';
import { MEDIA_ELEMENT } from '../../tokens';
import { MediaBaseDirective } from '../media-base';

/**
 * The `MediaMinDirective` is designed to handle `min-width` media queries.
 * It uses the `MediaBaseDirective` as a host directive to leverage its logic for media query handling.
 * Additionally, it incorporates `ConditionDirective` for conditional rendering based on logical conditions.
 *
 * This directive is intended for responsive design, allowing content to be displayed only from a specific screen size and up.
 *
 * Example usage in the DOM:
 * ```html
 * <div *uiMediaMin="'md'">
 *   This content will only be displayed for screen sizes from the 'md' breakpoint and up.
 * </div>
 * ```
 *
 * Usage with conditions in the DOM:
 * ```html
 * <div *uiMediaMin="'md'; or true; and false; else templateRef">
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
	selector: '[uiMediaMin]',
	standalone: true,
	providers: [
		{ provide: MEDIA_ELEMENT, useExisting: MediaMinDirective },
		{ provide: CONDITION_KEYWORD, useExisting: MediaMinDirective },
	],
	hostDirectives: [
		MediaBaseDirective,
		{
			directive: ConditionDirective,
			inputs: ['uiConditionAnd: uiMediaMinAnd', 'uiConditionElse: uiMediaMinElse', 'uiConditionOr: uiMediaMinOr'],
		},
	],
})
export class MediaMinDirective implements MediaElement, Condition {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'uiMediaMin' });

	public readonly condition = signal(false);

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaMin;
}
