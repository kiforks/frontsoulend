import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';

import { MediaService } from '../../services';

/**
 * Guard to activate based on the mobile media breakpoint.
 * This guard restricts access to a route based on the current screen width being mobile or narrower.
 *
 * @example
 * const routes: Routes = [
 *   { path: 'example', component: ExampleComponent, canActivate: [mediaMobileGuard] }
 * ];
 */
export const mediaMobileGuard: CanActivateFn = (): boolean => {
	const mediaService = inject(MediaService);
	const isMatched = toSignal(mediaService.mediaMobile);

	return !!isMatched();
};
