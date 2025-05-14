import { InputSignal, WritableSignal } from '@angular/core';

import { Breakpoint } from '@libs/frontend/core';

import { Observable } from 'rxjs';

/*
 * For min-width no media-min query necessary for xs breakpoint as it's effectively `@media-min (min-width: 0) { ... }`
 * For max-width no media-min query necessary for xs breakpoint as it's effectively `@media-min (max-width: 0) { ... }`
 * This is the reason why we exclude 'xs' breakpoint from this type
 * */
export type MediaBreakpoint = Exclude<Breakpoint, 'xs'>;
export type MediaBetweenBreakpoints = [MediaBreakpoint, MediaBreakpoint];

export type MediaBreakpoints = Record<MediaBreakpoint, number>;

export interface MediaConfigData {
	breakpoints: MediaBreakpoints;
	deviceBreakpoint: MediaBreakpoint;
}

export interface MediaElement<B = MediaBreakpoint> {
	readonly breakpoint: InputSignal<B>;

	readonly checkMedia: (breakpoint: B) => Observable<boolean>;
	readonly condition: WritableSignal<boolean>;
}

export interface MediaDevice {
	get checkMedia(): Observable<boolean>;
}
