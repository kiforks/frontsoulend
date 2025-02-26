import { Breakpoint } from '@kiforks/core';
import { Viewport } from '@storybook/addon-viewport';

import { MediaConfig } from '../../src/modules/media/configs';

export const BREAKPOINTS = {
	xs: {
		name: `Extra small (xs) | 375px`,
		styles: {
			width: `375px`,
			height: '100%',
		},
		type: 'mobile',
	},
	sm: {
		name: `Small (sm) | ${MediaConfig.BREAKPOINTS.sm}px`,
		styles: {
			width: `${MediaConfig.BREAKPOINTS.sm}px`,
			height: '100%',
		},
		type: 'mobile',
	},
	md: {
		name: `Medium (md) | ${MediaConfig.BREAKPOINTS.md}px`,
		styles: {
			width: `${MediaConfig.BREAKPOINTS.md}px`,
			height: '100%',
		},
		type: 'tablet',
	},
	lg: {
		name: `Large (lg) | ${MediaConfig.BREAKPOINTS.lg}px`,
		styles: {
			width: `${MediaConfig.BREAKPOINTS.lg}px`,
			height: '100%',
		},
		type: 'desktop',
	},
	xl: {
		name: `Extra-Large (xl) | ${MediaConfig.BREAKPOINTS.xl}px`,
		styles: {
			width: `${MediaConfig.BREAKPOINTS.xl}px`,
			height: '100%',
		},
		type: 'desktop',
	},
	xxl: {
		name: `Extra-Extra-Large (xxl) | ${MediaConfig.BREAKPOINTS.xxl}px`,
		styles: {
			width: `${MediaConfig.BREAKPOINTS.xxl}px`,
			height: '100%',
		},
		type: 'desktop',
	},
} satisfies Record<Breakpoint, Viewport>;
