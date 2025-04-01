import { MockProvider } from 'ng-mocks';

import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaService } from '../../../services';
import { MediaMinDirective } from '../media-min.directive';
import { MediaMinDirectivePO } from './media-min.directive.po';

import { MediaServiceMock } from '../../../mocks';

describe('MediaMinDirective', () => {
	let spectator: SpectatorDirective<MediaMinDirective>;
	let directivePo: MediaMinDirectivePO;

	const mediaServiceMock = new MediaServiceMock().setMediaMin(false);
	const createDirective = createDirectiveFactory({
		directive: MediaMinDirective,
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
		spectator = createDirective(`<div *uiMediaMin="'xs'" data-po="test"></div>`);
		directivePo = new MediaMinDirectivePO(spectator);

		expect(directivePo.element).not.toExist();

		mediaServiceMock.setMediaMin(true);
		spectator.detectChanges();

		expect(directivePo.element).toExist();

		mediaServiceMock.setMediaMin(false);
		spectator.detectChanges();

		expect(directivePo.element).not.toExist();
	});

	it('should correctly handle "and"/"or" conditions and the else template', () => {
		spectator = createDirective(
			`
	      <div
	        *uiMediaMin="'xs'; and: and; or: or; else: elementRef;"
	        data-po="test"
	      ></div>
	
	      <ng-template #elementRef>
	        <div data-po="stub"></div>
	      </ng-template>
      `,
			{ hostProps: { and: false, or: false } }
		);

		directivePo = new MediaMinDirectivePO(spectator);

		mediaServiceMock.setMediaMin(false);
		spectator.detectChanges();

		checkVisibility(true);

		spectator.setHostInput({ or: true });

		checkVisibility(false);

		mediaServiceMock.setMediaMin(true);
		spectator.setHostInput({ and: false, or: false });

		checkVisibility(true);

		spectator.setHostInput({ and: false, or: true });

		checkVisibility(false);
	});
});
