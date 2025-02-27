import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';

import { MediaService } from '../../services';

/**
 * Guard to activate based on the desktop media breakpoint.
 * This guard restricts access to a route based on the current screen width being desktop or wider.
 *
 * @example
 * const routes: Routes = [
 *   { path: 'example', component: ExampleComponent, canActivate: [mediaDesktopGuard] }
 * ];
 */
export const mediaDesktopGuard: CanActivateFn = (): boolean => {
	const mediaService = inject(MediaService);
	const isMatched = toSignal(mediaService.mediaDesktop);

	return !!isMatched();
};
