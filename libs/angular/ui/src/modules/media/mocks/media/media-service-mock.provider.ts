import { Provider } from '@angular/core';

import { MediaService } from '../../services';

import { MediaServiceMock } from './media-service.mock';

/**
 * Provides a mock version of `MediaService` for unit testing.
 *
 * @example
 * ```typescript
 * const mediaMock = new MediaServiceMock();
 *
 * TestBed.configureTestingModule({
 *   providers: [provideMediaServiceMock(mediaMock)],
 * });
 * ```
 */
export const provideMediaServiceMock = (mock: MediaServiceMock): Provider => ({
	provide: MediaService,
	useValue: mock,
});
