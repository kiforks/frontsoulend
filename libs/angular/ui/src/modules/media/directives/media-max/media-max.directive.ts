import { Directive, inject, input, signal } from '@angular/core';

import { MediaService } from '../../services';
import { MediaBreakpoint, MediaElement } from '../../interfaces';

import { Condition, CONDITION_KEYWORD, ConditionDirective } from '../../../condition';
import { MEDIA_ELEMENT } from '../../tokens';
import { MediaBaseDirective } from '../media-base';

/**
 * The `MediaMaxDirective` is designed to handle `max-width` media queries.
 * It uses the `MediaBaseDirective` as a host directive to leverage its logic for media query handling.
 * Additionally, it incorporates `ConditionDirective` for conditional rendering based on logical conditions.
 *
 * This directive is intended for responsive design, allowing content to be displayed only up to a specific screen size.
 *
 * Example usage in the DOM:
 * ```html
 * <div *uiMediaMax="'lg'">
 *   This content will only be displayed for screen sizes up to the 'lg' breakpoint.
 * </div>
 * ```
 *
 * Usage with conditions in the DOM:
 * ```html
 * <div *uiMediaMax="'lg'; or true; and false; else templateRef">
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
	selector: '[uiMediaMax]',
	standalone: true,
	providers: [
		{ provide: MEDIA_ELEMENT, useExisting: MediaMaxDirective },
		{ provide: CONDITION_KEYWORD, useExisting: MediaMaxDirective },
	],
	hostDirectives: [
		MediaBaseDirective,
		{
			directive: ConditionDirective,
			inputs: ['uiConditionAnd: uiMediaMaxAnd', 'uiConditionElse: uiMediaMaxElse', 'uiConditionOr: uiMediaMaxOr'],
		},
	],
})
export class MediaMaxDirective implements MediaElement, Condition {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'uiMediaMax' });

	public readonly condition = signal(false);

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaMax;
}
