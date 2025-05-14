import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
	let spectator: Spectator<AuthComponent>;

	const createComponent = createComponentFactory(AuthComponent);

	it('should create', () => {
		spectator = createComponent();

		expect(spectator.component).toBeTruthy();
	});
});
