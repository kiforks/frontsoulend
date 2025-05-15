import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { createInjectionContextFactory, SpectatorInjectionContext } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { MediaService } from '../../services';
import { mediaBetweenGuard } from './media-between.guard';

import { MediaServiceMock } from '../../mocks';

describe('MediaBetweenGuard', () => {
	let spectator: SpectatorInjectionContext;
	let route: ActivatedRouteSnapshot;
	let router: Router;

	const getResult = () =>
		spectator.runInInjectionContext(() => mediaBetweenGuard(['md', 'xl'])(route, router.routerState.snapshot));

	const mediaServiceMock = new MediaServiceMock();

	const createContext = createInjectionContextFactory({
		providers: [MockProvider(MediaService, mediaServiceMock), MockProvider(ActivatedRouteSnapshot)],
	});

	it('should allow access when media service returns "true"', () => {
		spectator = createContext();

		route = spectator.inject(ActivatedRouteSnapshot);
		router = spectator.inject(Router);

		mediaServiceMock.setMediaBetween(true);

		const result = getResult();

		expect(result).toBe(true);
	});

	it('should disallow access when media service returns "false"', () => {
		spectator = createContext();

		route = spectator.inject(ActivatedRouteSnapshot);
		router = spectator.inject(Router);

		mediaServiceMock.setMediaBetween(false);

		const result = getResult();

		expect(result).toBe(false);
	});
});
