import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/vitest';
import { faker } from '@faker-js/faker';

import { RouteDepthPipe } from './route-depth.pipe';

describe(RouteDepthPipe, () => {
	let spectator: SpectatorPipe<RouteDepthPipe>;

	const route = faker.word.words(1);

	const createPipe = createPipeFactory(RouteDepthPipe);

	beforeEach(() => {
		spectator = createPipe(`<div>{{ route | appRouteDepth: 2 }}</div>`, {
			hostProps: { route },
		});
	});

	it('should render route with the expected depth segments in template', () => {
		expect(spectator.element).toHaveExactTrimmedText(`../../${route}`);
	});

	it('should compute route by prefixing repeated by depth via static transform', () => {
		const result = RouteDepthPipe.transform(route, 2);

		expect(result).toBe(`../../${route}`);
	});
});
