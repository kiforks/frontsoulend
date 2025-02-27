import {
	ApplicationConfig,
	provideExperimentalZonelessChangeDetection,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideExperimentalZonelessChangeDetection(),
		provideRouter(appRoutes),
	],
};
