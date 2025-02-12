import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';

import { MediaService } from '../services';

import { MediaBreakpoint } from '../interfaces';

/**
 * Guard to activate based on the minimum media breakpoint.
 * This guard restricts access to a route based on the current screen width being at least the specified breakpoint or wider.
 *
 * @example
 * const routes: Routes = [
 *   { path: 'example', component: ExampleComponent, canActivate: [mediaMinGuard('md')] }
 * ];
 */
export const mediaMinGuard: (breakpoint: MediaBreakpoint) => CanActivateFn =
	(breakpoint: MediaBreakpoint) => (): boolean => {
		const mediaService = inject(MediaService);
		const isMatched = toSignal(mediaService.mediaMin(breakpoint));

		return !!isMatched();
	};
