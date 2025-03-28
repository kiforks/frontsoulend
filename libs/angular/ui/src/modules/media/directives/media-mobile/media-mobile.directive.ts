import { Directive, inject } from '@angular/core';

import { MediaService } from '../../services';
import { MediaDevice } from '../../interfaces';

import { MEDIA_DEVICE } from '../../tokens';
import { MediaDeviceDirective } from '../media-device';

/**
 * The `MediaMobileDirective` is designed to handle media queries for mobile devices.
 * It uses the `MediaDeviceDirective` as a host directive to leverage its logic for media query handling.
 *
 * Example usage in the DOM:
 * ```html
 * <div *uiMediaMobile>
 *   This content will only be displayed on mobile devices.
 * </div>
 * ```
 */
@Directive({
	selector: '[uiMediaMobile]',
	standalone: true,
	providers: [{ provide: MEDIA_DEVICE, useExisting: MediaMobileDirective }],
	hostDirectives: [MediaDeviceDirective],
})
export class MediaMobileDirective implements MediaDevice {
	public readonly checkMedia = inject(MediaService).mediaMobile;
}
