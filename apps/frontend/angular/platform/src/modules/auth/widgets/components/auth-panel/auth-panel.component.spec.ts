import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { AuthPanelComponent } from './auth-panel.component';

describe('AuthHeaderComponent', () => {
	let spectator: Spectator<AuthPanelComponent>;

	const createComponent = createComponentFactory(AuthPanelComponent);

	it('should create', () => {
		spectator = createComponent();

		expect(spectator.component).toBeTruthy();
	});
});
