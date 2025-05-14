import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { RootComponent } from './root.component';

describe('RootComponent', () => {
	let spectator: Spectator<RootComponent>;

	const createComponent = createComponentFactory({
		component: RootComponent,
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create', () => {
		expect(spectator.component).toBeTruthy();
	});
});
