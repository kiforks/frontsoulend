import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MediaService } from '../../../services';
import { MediaDataDirective } from '../media-data.directive';

import { MediaServiceMock } from '../../../mocks';
import { MockProvider } from "ng-mocks";

describe('MediaDataDirective', () => {
	let spectator: SpectatorDirective<MediaDataDirective>;

	const createDirective = createDirectiveFactory(MediaDataDirective);

	it('should render value when all media-min values are matched', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaAll(true);

		spectator = createDirective(
			`
				<div
					*appMediaData="
						let mediaMobile = mediaMobile;
						let mediaDesktop = mediaMobile;
						let mediaMin = mediaMin;
						let mediaMax = mediaMax;
						let mediaBetween = mediaBetween;
						let mediaOnly = mediaOnly;
					"
				>
					Media mobile: {{ mediaMobile | async }}
					Media desktop: {{ mediaDesktop | async }}
					Media min: {{ mediaMin('md') | async }}
					Media max: {{ mediaMax('md') | async }}
					Media between: {{ mediaBetween(['md', 'xl']) | async }}
					Media only: {{ mediaOnly('md') | async }}
				</div>
			`,
			{ providers: [MockProvider(MediaService, mediaServiceMock)] }
		);

		expect(spectator.element).toHaveExactTrimmedText(
			'Media mobile: true Media desktop: true Media min: true Media max: true Media between: true Media only: true'
		);
	});

	it('should render value when all media-min values are not matched', () => {
		const mediaServiceMock = new MediaServiceMock().setMediaAll(false);

		spectator = createDirective(
			`
				<div
					*appMediaData="
						let mediaMobile = mediaMobile;
						let mediaDesktop = mediaMobile;
						let mediaMin = mediaMin;
						let mediaMax = mediaMax;
						let mediaBetween = mediaBetween;
						let mediaOnly = mediaOnly;
					"
				>
					Media mobile: {{ mediaMobile | async }}
					Media desktop: {{ mediaDesktop | async }}
					Media min: {{ mediaMin('md') | async }}
					Media max: {{ mediaMax('md') | async }}
					Media between: {{ mediaBetween(['md', 'xl']) | async }}
					Media only: {{ mediaOnly('md') | async }}
				</div>
			`,
			{ providers: [MockProvider(MediaService, mediaServiceMock)] }
		);

		expect(spectator.element).toHaveExactTrimmedText(
			'Media mobile: false Media desktop: false Media min: false Media max: false Media between: false Media only: false'
		);
	});
});
