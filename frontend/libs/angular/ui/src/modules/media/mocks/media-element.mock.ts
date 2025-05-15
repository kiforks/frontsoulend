import { Injector, runInInjectionContext, signal } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { MediaBreakpoint, MediaElement } from '../interfaces';

export class MediaElementMock implements MediaElement {
	public readonly condition = signal(false);

	// @ts-expect-error TODO fix it — using signal instead of input for testing
	public readonly breakpoint = runInInjectionContext(Injector.create({ providers: [] }), () =>
		signal<MediaBreakpoint>('md')
	);

	private readonly isMatched$ = new BehaviorSubject(true);

	public readonly checkMedia = (): Observable<boolean> => this.isMatched$;

	public setCheckMedia(value: boolean): this {
		this.isMatched$.next(value);

		return this;
	}

	public setCondition(value: boolean): void {
		this.condition.set(value);
	}
}
