import { Provider } from '@angular/core';

import { MediaService } from '../services';

import { MediaConfigData } from '../interfaces';

import { MEDIA_CONFIG } from '../tokens/media.token';

/**
 * Provides a configuration object for the MediaService.
 *
 * @remarks this function generates a provider array to configure the MediaService with the provided partial configuration.
 */
export const provideMediaConfig = (config: Partial<MediaConfigData>): Provider[] => [
	MediaService,
	{
		provide: MEDIA_CONFIG,
		useValue: config,
	},
];
