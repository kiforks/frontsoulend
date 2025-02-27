import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';

import { MediaService } from '../../services';
import { MediaBetweenBreakpoints } from '../../interfaces';

/**
 * Function to create a guard for checking if the screen width is between specified breakpoints.
 * This guard restricts access to a route based on the current screen width.
 *
 * @example
 * const routes: Routes = [
 *   { path: 'example', component: ExampleComponent, canActivate: [mediaBetweenGuard(['sm', 'md'])] }
 * ];
 */
export const mediaBetweenGuard: (breakpoints: MediaBetweenBreakpoints) => CanActivateFn =
	(breakpoints: MediaBetweenBreakpoints) => (): boolean => {
		const mediaService = inject(MediaService);
		const isMatched = toSignal(mediaService.mediaBetween(breakpoints));

		return !!isMatched();
	};
