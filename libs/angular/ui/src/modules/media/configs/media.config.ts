import { MediaBreakpoint, MediaBreakpoints } from '../interfaces';

export abstract class MediaConfig {
	public static readonly BreakpointCollection: MediaBreakpoint[] = ['sm', 'md', 'lg', 'xl', 'xxl'];
	public static readonly DeviceBreakpoint: MediaBreakpoint = 'md';

	/*
	 * Browsers don’t currently support range context queries, so we work around the
	 * limitations of min- and max- prefixes and viewports with fractional widths
	 * (which can occur under certain conditions on high-dpi devices, for instance)
	 * by using values with higher precision.
	 */
	public static readonly MaxScreenRange = 0.02;
	/**
	 * Breakpoints were taken from:
	 * @see libs/ui/scss/utilities/media/variables/_breakpoints.scss
	 * */
	public static readonly BREAKPOINTS: MediaBreakpoints = {
		/**
		 * Medium breakpoint (≥768px).
		 */
		md: 768,

		/**
		 * Small breakpoint (≥576px).
		 */
		sm: 576,

		/**
		 * Large breakpoint (≥992px).
		 */
		lg: 992,

		/**
		 * Extra-large breakpoint (≥1200px).
		 */
		xl: 1200,

		/**
		 * Extra-extra-large breakpoint (≥1400px).
		 */
		xxl: 1400,
	};
}
