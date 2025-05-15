import { Directive, inject, input, signal } from '@angular/core';

import { MediaService } from '../../services';
import { MediaBreakpoint, MediaElement } from '../../interfaces';

import { Condition, CONDITION_KEYWORD, ConditionDirective } from '../../../condition';
import { MEDIA_ELEMENT } from '../../tokens';
import { MediaBaseDirective } from '../media-base';

/**
 * The `MediaOnlyDirective` is designed to handle media queries that target specific breakpoints (e.g., `only`).
 * It uses the `MediaBaseDirective` as a host directive to leverage its logic for media query handling.
 * Additionally, it incorporates `ConditionDirective` for conditional rendering based on logical conditions.
 *
 * This directive is intended for responsive design, allowing content to be displayed only at a specific screen size.
 *
 * Example usage in the DOM:
 * ```html
 * <div *uiMediaOnly="'md'">
 *   This content will only be displayed for the 'md' breakpoint.
 * </div>
 * ```
 *
 * Usage with conditions in the DOM:
 * ```html
 * <div *uiMediaOnly="'md'; or true; and false; else templateRef">
 *   This content will only be displayed for the 'md' breakpoint
 *   or if the specified conditions are met.
 * </div>
 *
 * <ng-template #templateRef>
 *   This content will be displayed if the conditions are not met.
 * </ng-template>
 * ```
 */
@Directive({
	selector: '[uiMediaOnly]',
	standalone: true,
	providers: [
		{ provide: MEDIA_ELEMENT, useExisting: MediaOnlyDirective },
		{ provide: CONDITION_KEYWORD, useExisting: MediaOnlyDirective },
	],
	hostDirectives: [
		MediaBaseDirective,
		{
			directive: ConditionDirective,
			inputs: ['uiConditionAnd: uiMediaOnlyAnd', 'uiConditionElse: uiMediaOnlyElse', 'uiConditionOr: uiMediaOnlyOr'],
		},
	],
})
export class MediaOnlyDirective implements MediaElement<MediaBreakpoint>, Condition {
	public readonly breakpoint = input.required<MediaBreakpoint>({ alias: 'uiMediaOnly' });

	public readonly condition = signal(false);

	// eslint-disable-next-line @typescript-eslint/unbound-method
	public readonly checkMedia = inject(MediaService).mediaOnly;
}
