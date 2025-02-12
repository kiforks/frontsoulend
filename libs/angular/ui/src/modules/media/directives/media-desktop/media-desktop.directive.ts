import { Directive, inject } from '@angular/core';

import { MediaService } from '../../services';
import { MediaDevice } from '../../interfaces';

import { MEDIA_DEVICE } from '../../tokens';
import { MediaDeviceDirective } from '../media-device';

/**
 * The `MediaDesktopDirective` is designed to handle media queries for desktop devices.
 * It uses the `MediaDeviceDirective` as a host directive to leverage its logic for media query handling.
 *
 * Example usage in the DOM:
 * ```html
 * <div *appMediaDesktop>
 *   This content will only be displayed on desktop devices.
 * </div>
 * ```
 */
@Directive({
	selector: '[appMediaDesktop]',
	standalone: true,
	providers: [{ provide: MEDIA_DEVICE, useExisting: MediaDesktopDirective }],
	hostDirectives: [MediaDeviceDirective],
})
export class MediaDesktopDirective implements MediaDevice {
	public readonly checkMedia = inject(MediaService).mediaDesktop;
}
