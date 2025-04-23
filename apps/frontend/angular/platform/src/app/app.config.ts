import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { Routes } from '../pages';

export const appConfig: ApplicationConfig = {
	providers: [provideExperimentalZonelessChangeDetection(), provideRouter(Routes)],
};
