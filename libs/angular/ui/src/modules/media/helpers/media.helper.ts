import { MediaConfig } from '../configs';

export abstract class MediaHelper {
	/**
	 * Returns a media-min query string for maximum width
	 */
	public static getMaxWidth(breakpoint: number): string {
		const value = breakpoint - MediaConfig.MAX_SCREEN_RANGE;

		return `(max-width: ${value}px)`;
	}

	/**
	 * Returns a media-min query string for minimum width.
	 */
	public static getMinWidth(breakpoint: number): string {
		return `(min-width: ${breakpoint}px)`;
	}
}
