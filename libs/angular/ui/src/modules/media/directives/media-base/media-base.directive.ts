import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { distinctUntilChanged, switchMap } from 'rxjs';

import { MEDIA_ELEMENT } from '../../tokens';

/**
 * The `MediaBaseDirective` is designed to manage the display of elements based on media queries (like screen size breakpoints).
 * This directive listens to breakpoint changes and conditionally displays or hides elements based on whether the media query matches
 *
 * Example of using `MediaBaseDirective` as a host directive in combination with the token and interface it implements.
 * ```typescript
 * @Directive({
 *     selector: '[someDirective]',
 *     standalone: true,
 *     providers: [{ provide: MEDIA_ELEMENT, useExisting: MediaMaxDirective }],
 *     hostDirectives: [MediaBaseDirective],
 * })
 * export class MediaMaxDirective implements MediaElement {
 *     public readonly breakpoint = input.required<MediaBreakpoint>();
 *     public readonly checkMedia = inject(MediaService).mediaMax;
 *     public readonly condition = signal(false);
 * }
 * ```
 */
@Directive({
	selector: '[uiMediaBase]',
	standalone: true,
})
export class MediaBaseDirective {
	private readonly mediaElement = inject(MEDIA_ELEMENT);
	private readonly breakpoint$ = toObservable(this.mediaElement.breakpoint);

	constructor() {
		this.observeBreakpoint();
	}

	private observeBreakpoint(): void {
		this.breakpoint$
			.pipe(
				// Each time the breakpoint is changed, it destroys the old subscription and works only with the new value.
				switchMap(breakpoint => this.mediaElement.checkMedia(breakpoint)),
				// Prevents double rendering of the template
				distinctUntilChanged(),
				takeUntilDestroyed()
			)
			.subscribe(isMatched => this.mediaElement.condition.set(isMatched));
	}
}
