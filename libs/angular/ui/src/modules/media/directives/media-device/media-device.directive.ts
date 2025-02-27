import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { distinctUntilChanged } from 'rxjs';

import { MEDIA_DEVICE } from '../../tokens';

/**
 * The `MediaDeviceDirective` is designed to manage the display of elements based on media queries for devices (like mobile or desktop).
 * This directive listens to device media changes and conditionally displays or hides elements based on whether the media query matches.
 *
 * Example of using `MediaDeviceDirective` as a host directive in combination with the token and interface it implements.
 * ```typescript
 * @Directive({
 *     selector: '[someDirective]',
 *     standalone: true,
 *     providers: [{ provide: MEDIA_DEVICE, useExisting: MediaMobileDirective }],
 *     hostDirectives: [MediaDeviceDirective],
 * })
 * export class MediaMobileDirective implements MediaDevice {
 *     public readonly checkMedia = inject(MediaService).mediaMobile;
 * }
 * ```
 */
@Directive({
	selector: '[appMediaDevice]',
	standalone: true,
})
export class MediaDeviceDirective {
	private readonly templateRef = inject(TemplateRef<null>);
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly mediaDevice = inject(MEDIA_DEVICE);

	constructor() {
		this.observeMediaDevice();
	}

	private observeMediaDevice(): void {
		this.mediaDevice.checkMedia
			.pipe(distinctUntilChanged(), takeUntilDestroyed())
			.subscribe(isMatched =>
				isMatched ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
			);
	}
}
