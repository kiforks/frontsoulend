import { MockProvider } from 'ng-mocks';

import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { BehaviorSubject, Observable } from 'rxjs';

import { MediaDeviceDirective } from '../media-device.directive';
import { MediaDeviceDirectivePo } from './media-device.directive.po';

import { MEDIA_DEVICE } from '../../../tokens';

describe('MediaDeviceDirective', () => {
	let spectator: SpectatorDirective<MediaDeviceDirective>;
	let directivePo: MediaDeviceDirectivePo;

	const checkMedia = new BehaviorSubject(false);
	const createDirective = createDirectiveFactory({
		directive: MediaDeviceDirective,
		providers: [
			MockProvider(MEDIA_DEVICE, {
				get checkMedia(): Observable<boolean> {
					return checkMedia;
				},
			}),
		],
	});

	it('should show or hide the element based on breakpoint changes', () => {
		spectator = createDirective(`<div *appMediaDevice data-po="test"></div>`);
		directivePo = new MediaDeviceDirectivePo(spectator);

		expect(directivePo.element).not.toExist();

		checkMedia.next(true);
		spectator.detectChanges();

		expect(directivePo.element).toExist();

		checkMedia.next(false);
		spectator.detectChanges();

		expect(directivePo.element).not.toExist();
	});
});
