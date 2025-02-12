import { MockProvider } from 'ng-mocks';

import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaService } from '../../../services';
import { MediaMobileDirective } from '../media-mobile.directive';
import { MediaMobileDirectivePo } from './media-mobile.directive.po';

import { MediaServiceMock } from '../../../mocks';

describe('MediaMobileDirective', () => {
	let spectator: SpectatorDirective<MediaMobileDirective>;
	let directivePo: MediaMobileDirectivePo;

	const mediaServiceMock = new MediaServiceMock().setMediaMobile(false);
	const createDirective = createDirectiveFactory({
		directive: MediaMobileDirective,
		providers: [MockProvider(MediaService, mediaServiceMock)],
	});

	it('should show or hide the element based on breakpoint changes', () => {
		spectator = createDirective(`<div *appMediaMobile data-po="test"></div>`);
		directivePo = new MediaMobileDirectivePo(spectator);

		expect(directivePo.element).not.toExist();

		mediaServiceMock.setMediaMobile(true);
		spectator.detectChanges();

		expect(directivePo.element).toExist();

		mediaServiceMock.setMediaMobile(false);
		spectator.detectChanges();

		expect(directivePo.element).not.toExist();
	});
});
