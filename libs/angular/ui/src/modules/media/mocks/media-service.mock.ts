import { faker } from '@faker-js/faker';
import { Bind } from '@linters';

import { BehaviorSubject, Observable } from 'rxjs';

import { MediaService } from '../services';

/**
 * Mock service for testing `MediaService`.
 * This class simulates media query behavior without relying on actual screen size.
 * It allows manual control over the media state in unit tests.
 *
 * @example
 * ```typescript
 * // Creating a new mock instance
 * const mediaMock = new MediaServiceMock().setMediaMobile(true);;
 *
 * // Using the mock in a test
 * const createDirective = createDirectiveFactory({
 *   directive: TestDirective,
 *   providers: [MockProvider(MediaService, mediaServiceMock)],
 * });
 * ```
 */
export class MediaServiceMock
	implements Pick<MediaService, 'mediaBetween' | 'mediaDesktop' | 'mediaMax' | 'mediaMin' | 'mediaMobile' | 'mediaOnly'>
{
	private readonly mediaMin$ = new BehaviorSubject(faker.datatype.boolean());
	private readonly mediaMax$ = new BehaviorSubject(faker.datatype.boolean());
	private readonly mediaOnly$ = new BehaviorSubject(faker.datatype.boolean());
	private readonly mediaBetween$ = new BehaviorSubject(faker.datatype.boolean());
	private readonly mediaDesktop$ = new BehaviorSubject(faker.datatype.boolean());
	private readonly mediaMobile$ = new BehaviorSubject(faker.datatype.boolean());

	public get mediaDesktop(): Observable<boolean> {
		return this.mediaDesktop$;
	}

	public get mediaMobile(): Observable<boolean> {
		return this.mediaMobile$;
	}

	public setMediaAll(value: boolean): this {
		this.setMediaMin(value);
		this.setMediaMax(value);
		this.setMediaOnly(value);
		this.setMediaBetween(value);
		this.setMediaDesktop(value);
		this.setMediaMobile(value);

		return this;
	}

	public setMediaMobile(value: boolean): this {
		this.mediaMobile$.next(value);

		return this;
	}

	public setMediaDesktop(value: boolean): this {
		this.mediaDesktop$.next(value);

		return this;
	}

	public setMediaMin(value: boolean): this {
		this.mediaMin$.next(value);

		return this;
	}

	public setMediaMax(value: boolean): this {
		this.mediaMax$.next(value);

		return this;
	}

	public setMediaOnly(value: boolean): this {
		this.mediaOnly$.next(value);

		return this;
	}

	public setMediaBetween(value: boolean): this {
		this.mediaBetween$.next(value);

		return this;
	}

	@Bind public mediaMax(): Observable<boolean> {
		return this.mediaMax$;
	}

	@Bind public mediaMin(): Observable<boolean> {
		return this.mediaMin$;
	}

	@Bind public mediaOnly(): Observable<boolean> {
		return this.mediaOnly$;
	}

	@Bind public mediaBetween(): Observable<boolean> {
		return this.mediaBetween$;
	}
}
