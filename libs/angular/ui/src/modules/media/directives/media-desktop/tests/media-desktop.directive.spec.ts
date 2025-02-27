import { MockProvider } from 'ng-mocks';

import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaService } from '../../../services';
import { MediaDesktopDirective } from '../media-desktop.directive';
import { MediaDesktopDirectivePo } from './media-desktop.directive.po';

import { MediaServiceMock } from '../../../mocks';

describe('MediaDesktopDirective', () => {
	let spectator: SpectatorDirective<MediaDesktopDirective>;
	let directivePo: MediaDesktopDirectivePo;

	const mediaServiceMock = new MediaServiceMock().setMediaDesktop(false);
	const createDirective = createDirectiveFactory({
		directive: MediaDesktopDirective,
		providers: [MockProvider(MediaService, mediaServiceMock)],
	});

	it('should show or hide the element based on breakpoint changes', () => {
		spectator = createDirective(`<div *appMediaDesktop data-po="test"></div>`);
		directivePo = new MediaDesktopDirectivePo(spectator);

		expect(directivePo.element).not.toExist();

		mediaServiceMock.setMediaDesktop(true);
		spectator.detectChanges();

		expect(directivePo.element).toExist();

		mediaServiceMock.setMediaDesktop(false);
		spectator.detectChanges();

		expect(directivePo.element).not.toExist();
	});
});
