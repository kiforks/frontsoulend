import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { RootComponent } from './root.component';

describe(RootComponent, () => {
	let spectator: Spectator<RootComponent>;

	const createComponent = createComponentFactory({
		component: RootComponent,
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create', () => {
		expect(spectator.component).toBe(true);
	});
});
