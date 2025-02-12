import { MockProvider } from 'ng-mocks';

import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaService } from '../../../services';
import { MediaBetweenDirective } from '../media-between.directive';
import { MediaBetweenDirectivePo } from './media-between.directive.po';

import { MediaServiceMock } from '../../../mocks';

describe('MediaBetweenDirective', () => {
	let spectator: SpectatorDirective<MediaBetweenDirective>;
	let directivePo: MediaBetweenDirectivePo;

	const mediaServiceMock = new MediaServiceMock().setMediaBetween(false);
	const createDirective = createDirectiveFactory({
		directive: MediaBetweenDirective,
		providers: [MockProvider(MediaService, mediaServiceMock)],
	});

	const checkVisibility = (isStub: boolean): void => {
		if (isStub) {
			expect(directivePo.element).not.toExist();
			expect(directivePo.stubElement).toExist();

			return;
		}

		expect(directivePo.element).toExist();
		expect(directivePo.stubElement).not.toExist();
	};

	it('should show or hide the element based on breakpoint changes', () => {
		spectator = createDirective(`<div *appMediaBetween="['sm', 'lg']" data-po="test"></div>`);
		directivePo = new MediaBetweenDirectivePo(spectator);

		expect(directivePo.element).not.toExist();

		mediaServiceMock.setMediaBetween(true);
		spectator.detectChanges();

		expect(directivePo.element).toExist();

		mediaServiceMock.setMediaBetween(false);
		spectator.detectChanges();

		expect(directivePo.element).not.toExist();
	});

	it('should correctly handle "and"/"or" conditions and the else template', () => {
		spectator = createDirective(
			`
	      <div
	        *appMediaBetween="['sm', 'lg']; and: and; or: or; else: elementRef;"
	        data-po="test"
	      ></div>
	
	      <ng-template #elementRef>
	        <div data-po="stub"></div>
	      </ng-template>
      `,
			{ hostProps: { and: false, or: false } }
		);

		directivePo = new MediaBetweenDirectivePo(spectator);

		mediaServiceMock.setMediaBetween(false);
		spectator.detectChanges();

		checkVisibility(true);

		spectator.setHostInput({ or: true });

		checkVisibility(false);

		mediaServiceMock.setMediaBetween(true);
		spectator.setHostInput({ and: false, or: false });

		checkVisibility(true);

		spectator.setHostInput({ and: false, or: true });

		checkVisibility(false);
	});
});
