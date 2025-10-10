import { createDirectiveFactory } from '@ngneat/spectator';

import { MediaBaseDirective } from '../media-base.directive';

import { MediaElementMock } from '../../../mocks';
import { MEDIA_ELEMENT } from '../../../tokens';

describe(MediaBaseDirective, () => {
	const createDirective = createDirectiveFactory(MediaBaseDirective);

	it('should dynamically render directive content', () => {
		const mediaElementMock = new MediaElementMock().setCheckMedia(true);

		const spyOnCheckMedia = vi.spyOn(mediaElementMock, 'checkMedia');

		createDirective('<div *uiMediaBase></div>', {
			providers: [{ provide: MEDIA_ELEMENT, useValue: mediaElementMock }],
		});

		expect(mediaElementMock.condition()).toBe(true);

		expect(spyOnCheckMedia).toHaveBeenCalledExactlyOnceWith(mediaElementMock.breakpoint());

		mediaElementMock.setCheckMedia(false);

		expect(mediaElementMock.condition()).toBe(false);
		expect(spyOnCheckMedia).toHaveBeenCalledExactlyOnceWith(mediaElementMock.breakpoint());

		mediaElementMock.setCheckMedia(true);

		expect(mediaElementMock.condition()).toBe(true);
		// eslint-disable-next-line vitest/max-expects
		expect(spyOnCheckMedia).toHaveBeenCalledExactlyOnceWith(mediaElementMock.breakpoint());
	});
});
