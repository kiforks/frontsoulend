import { InjectionToken } from '@angular/core';

import { MediaConfigData, MediaDevice, MediaElement } from '../interfaces';

/**
 * This config is not a part of package
 * Injection token for providing partial configuration for the media service.
 *
 * @remarks this token is used to provide a partial configuration for the media service in Angular applications.
 */
export const MEDIA_CONFIG = new InjectionToken<Partial<MediaConfigData>>('MEDIA_CONFIG');

/**
 * Used here:
 * @see src/features/media/directives/media-base/media-base.directive.ts
 */
export const MEDIA_ELEMENT = new InjectionToken<MediaElement>('MEDIA_ELEMENT');

/**
 * Used here:
 * @see src/features/media/directives/media-device/media-device.directive.ts
 */
export const MEDIA_DEVICE = new InjectionToken<MediaDevice>('MEDIA_DEVICE');
