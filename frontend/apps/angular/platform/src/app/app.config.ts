import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { Routes } from '../pages';

export const appConfig: ApplicationConfig = {
	// eslint-disable-next-line @angular-eslint/no-developer-preview
	providers: [provideZonelessChangeDetection(), provideRouter(Routes)],
};
