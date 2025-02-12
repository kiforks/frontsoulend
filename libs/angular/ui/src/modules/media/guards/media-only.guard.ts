import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';

import { MediaService } from '../services';

import { MediaBreakpoint } from '../interfaces';

/**
 * Guard to activate only on a specific media breakpoint.
 * This guard restricts access to a route based on the current screen width matching the specified breakpoint.
 *
 * @example
 * const routes: Routes = [
 *   { path: 'example', component: ExampleComponent, canActivate: [mediaOnlyGuard('md')] }
 * ];
 */
export const mediaOnlyGuard: (breakpoint: MediaBreakpoint) => CanActivateFn =
	(breakpoint: MediaBreakpoint) => (): boolean => {
		const mediaService = inject(MediaService);
		const isMatched = toSignal(mediaService.mediaOnly(breakpoint));

		return !!isMatched();
	};
