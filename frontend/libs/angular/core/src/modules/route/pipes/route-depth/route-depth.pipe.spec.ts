import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/vitest';
import { faker } from '@faker-js/faker';

import { RouteDepthPipe } from './route-depth.pipe';

describe(RouteDepthPipe, () => {
	let spectator: SpectatorPipe<RouteDepthPipe>;

	const routes = ['one', 'two', 'three'];
	const routeUrl = 'one/two/three';
	const createPipe = createPipeFactory(RouteDepthPipe);

	it('should render route with the expected depth segments in template', () => {
		const route = faker.word.words(1);

		spectator = createPipe(`<div>{{ route | appRouteDepth: 2 }}</div>`, {
			hostProps: { route },
		});

		expect(spectator.element).toHaveExactTrimmedText(`../../${route}`);
	});

	it('should compute route by prefixing repeated by depth via static transform', () => {
		const route = faker.word.words(1);
		const result = RouteDepthPipe.transform(route, 2);

		expect(result).toBe(`../../${route}`);
	});

	it('should render joined array segments with depth prefix in template', () => {
		spectator = createPipe(`<div>{{ routeUrl | appRouteDepth: 3 }}</div>`, {
			hostProps: { routeUrl },
		});

		expect(spectator.element).toHaveExactTrimmedText(`../../../${routeUrl}`);
	});

	it('should compute joined array segments with depth prefix via static transform', () => {
		const result = RouteDepthPipe.transform(routes, 2);

		expect(result).toBe(`../../${routeUrl}`);
	});
});
