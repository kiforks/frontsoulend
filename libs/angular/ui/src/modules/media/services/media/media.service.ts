import { inject, Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { Bind } from '@frontsoulend/utilities';

import { distinctUntilChanged, map, Observable } from 'rxjs';

import { MediaHelper } from '../../helpers';
import { MediaBetweenBreakpoints, MediaBreakpoint, MediaConfigData } from '../../interfaces';

import { MediaConfig } from '../../configs';
import { MEDIA_CONFIG } from '../../tokens';

@Injectable({ providedIn: 'root' })
export class MediaService {
	private readonly breakpointObserver = inject(BreakpointObserver);
	private readonly config: MediaConfigData = {
		breakpoints: MediaConfig.BREAKPOINTS,
		deviceBreakpoint: MediaConfig.DeviceBreakpoint,
		...inject(MEDIA_CONFIG, { optional: true }),
	};

	private readonly breakpoints = this.config.breakpoints;
	private readonly deviceBreakpoint = this.config.deviceBreakpoint;

	/**
	 * Media of mobile screen maximum breakpoint width
	 * No query for the largest breakpoint
	 * Makes the content apply to the given breakpoint and narrower.
	 */
	public get mediaMobile(): Observable<boolean> {
		return this.mediaMax(this.deviceBreakpoint);
	}

	/**
	 * Media of desktop screen maximum breakpoint width.
	 * No query for the smallest breakpoint.
	 * Makes the content apply to the given breakpoint and wider.
	 */
	public get mediaDesktop(): Observable<boolean> {
		return this.mediaMin(this.deviceBreakpoint);
	}

	/**
	 * Media of at least the minimum breakpoint width.
	 * No query for the smallest breakpoint
	 * Is matched apply to the given breakpoint and wider.
	 */
	@Bind public mediaMin(breakpoint: MediaBreakpoint): Observable<boolean> {
		return this.getBreakpointValue(breakpoint, 'min');
	}

	/**
	 * Media of at most the maximum breakpoint width.
	 * No query for the largest breakpoint.
	 * Is matched apply to the given breakpoint and narrower.
	 */
	@Bind public mediaMax(breakpoint: MediaBreakpoint): Observable<boolean> {
		return this.getBreakpointValue(breakpoint);
	}

	/**
	 * Media that spans multiple breakpoint widths.
	 * Is matched apply between the min and max breakpoints.
	 */
	@Bind public mediaBetween([breakpointFrom, breakpointTo]: MediaBetweenBreakpoints): Observable<boolean> {
		const breakpointMin = this.breakpoints[breakpointFrom];
		const breakpointMax = this.breakpoints[breakpointTo];

		return this.getBreakpointsBetween(breakpointMin, breakpointMax);
	}

	/**
	 * Media between the breakpoints minimum and maximum widths.
	 * No minimum for the smallest breakpoint, and no maximum for the largest one.
	 * Is matched apply only to the given breakpoint, not viewports any wider or narrower.
	 */
	@Bind public mediaOnly(breakpoint: MediaBreakpoint): Observable<boolean> {
		if (breakpoint === 'xxl') {
			return this.getBreakpointValue('xxl', 'min');
		}

		const nextBreakpointIndex = MediaConfig.BreakpointCollection.indexOf(breakpoint) + 1;
		const nextBreakpoint = MediaConfig.BreakpointCollection[nextBreakpointIndex];
		const breakpointMax = this.breakpoints[nextBreakpoint];
		const breakpointMin = this.breakpoints[breakpoint];

		return this.getBreakpointsBetween(breakpointMin, breakpointMax);
	}

	private getBreakpointValue(breakpoint: MediaBreakpoint, width: 'max' | 'min' = 'max'): Observable<boolean> {
		const breakpointValue = this.breakpoints[breakpoint];
		const breakpointMax = MediaHelper.getMaxWidth(breakpointValue);
		const breakpointMin = MediaHelper.getMinWidth(breakpointValue);

		return this.observeBreakpoint(width === 'min' ? breakpointMin : breakpointMax);
	}

	private getBreakpointsBetween(breakpointMin: number, breakpointMax: number): Observable<boolean> {
		const breakpointMinValue = MediaHelper.getMinWidth(breakpointMin);
		const breakpointMaxValue = MediaHelper.getMaxWidth(breakpointMax);

		if (breakpointMin >= breakpointMax) {
			throw new Error(
				`"MediaService": the minimum value "${breakpointMinValue}" cannot be equal to or greater than the maximum value "${breakpointMaxValue}"`
			);
		}

		return this.observeBreakpoint(`${breakpointMinValue} and ${breakpointMaxValue}`);
	}

	private observeBreakpoint(breakpoint: string): Observable<boolean> {
		return this.breakpointObserver.observe(breakpoint).pipe(
			map(({ matches }) => matches),
			distinctUntilChanged()
		);
	}
}
