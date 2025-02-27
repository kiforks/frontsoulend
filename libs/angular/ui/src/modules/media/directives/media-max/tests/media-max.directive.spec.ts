import { MockProvider } from 'ng-mocks';

import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaService } from '../../../services';
import { MediaMaxDirective } from '../media-max.directive';
import { MediaMaxDirectivePo } from './media-max.directive.po';

import { MediaServiceMock } from '../../../mocks';

describe('MediaMaxDirective', () => {
	let spectator: SpectatorDirective<MediaMaxDirective>;
	let directivePo: MediaMaxDirectivePo;

	const mediaServiceMock = new MediaServiceMock().setMediaMax(false);
	const createDirective = createDirectiveFactory({
		directive: MediaMaxDirective,
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
		spectator = createDirective(`<div *appMediaMax="'xs'" data-po="test"></div>`);
		directivePo = new MediaMaxDirectivePo(spectator);

		expect(directivePo.element).not.toExist();

		mediaServiceMock.setMediaMax(true);
		spectator.detectChanges();

		expect(directivePo.element).toExist();

		mediaServiceMock.setMediaMax(false);
		spectator.detectChanges();

		expect(directivePo.element).not.toExist();
	});

	it('should correctly handle "and"/"or" conditions and the else template', () => {
		spectator = createDirective(
			`
	      <div
	        *appMediaMax="'xs'; and: and; or: or; else: elementRef;"
	        data-po="test"
	      ></div>
	
	      <ng-template #elementRef>
	        <div data-po="stub"></div>
	      </ng-template>
      `,
			{ hostProps: { and: false, or: false } }
		);

		directivePo = new MediaMaxDirectivePo(spectator);

		mediaServiceMock.setMediaMax(false);
		spectator.detectChanges();

		checkVisibility(true);

		spectator.setHostInput({ or: true });

		checkVisibility(false);

		mediaServiceMock.setMediaMax(true);
		spectator.setHostInput({ and: false, or: false });

		checkVisibility(true);

		spectator.setHostInput({ and: false, or: true });

		checkVisibility(false);
	});
});
