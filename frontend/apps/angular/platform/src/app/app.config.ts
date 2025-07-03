import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { Routes } from '../pages';

export const appConfig: ApplicationConfig = {
	providers: [provideZonelessChangeDetection(), provideRouter(Routes)],
};
