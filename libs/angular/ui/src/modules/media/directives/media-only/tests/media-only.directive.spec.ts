import { MockProvider } from 'ng-mocks';

import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaService } from '../../../services';
import { MediaOnlyDirective } from '../media-only.directive';
import { MediaOnlyDirectivePo } from './media-only.directive.po';

import { MediaServiceMock } from '../../../mocks';

describe('MediaOnlyDirective', () => {
	let spectator: SpectatorDirective<MediaOnlyDirective>;
	let directivePo: MediaOnlyDirectivePo;

	const mediaServiceMock = new MediaServiceMock().setMediaOnly(false);
	const createDirective = createDirectiveFactory({
		directive: MediaOnlyDirective,
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
		spectator = createDirective(`<div *uiMediaOnly="'xs'" data-po="test"></div>`);
		directivePo = new MediaOnlyDirectivePo(spectator);

		expect(directivePo.element).not.toExist();

		mediaServiceMock.setMediaOnly(true);
		spectator.detectChanges();

		expect(directivePo.element).toExist();

		mediaServiceMock.setMediaOnly(false);
		spectator.detectChanges();

		expect(directivePo.element).not.toExist();
	});

	it('should correctly handle "and"/"or" conditions and the else template', () => {
		spectator = createDirective(
			`
	      <div
	        *uiMediaOnly="'xs'; and: and; or: or; else: elementRef;"
	        data-po="test"
	      ></div>
	
	      <ng-template #elementRef>
	        <div data-po="stub"></div>
	      </ng-template>
      `,
			{ hostProps: { and: false, or: false } }
		);

		directivePo = new MediaOnlyDirectivePo(spectator);

		mediaServiceMock.setMediaOnly(false);
		spectator.detectChanges();

		checkVisibility(true);

		spectator.setHostInput({ or: true });

		checkVisibility(false);

		mediaServiceMock.setMediaOnly(true);
		spectator.setHostInput({ and: false, or: false });

		checkVisibility(true);

		spectator.setHostInput({ and: false, or: true });

		checkVisibility(false);
	});
});
