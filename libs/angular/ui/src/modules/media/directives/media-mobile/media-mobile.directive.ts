import { Directive, inject } from '@angular/core';

import { MediaService } from '../../services';

import { MediaDeviceDirective } from '../media-device/media-device.directive';

import { MediaDevice } from '../../models';

import { MEDIA_DEVICE } from '../../tokens/media.token';

/**
 * The `MediaMobileDirective` is designed to handle media queries for mobile devices.
 * It uses the `MediaDeviceDirective` as a host directive to leverage its logic for media query handling.
 *
 * Example usage in the DOM:
 * ```html
 * <div *appMediaMobile>
 *   This content will only be displayed on mobile devices.
 * </div>
 * ```
 */
@Directive({
	selector: '[appMediaMobile]',
	standalone: true,
	providers: [{ provide: MEDIA_DEVICE, useExisting: MediaMobileDirective }],
	hostDirectives: [MediaDeviceDirective],
})
export class MediaMobileDirective implements MediaDevice {
	public readonly checkMedia = inject(MediaService).mediaMobile;
}
