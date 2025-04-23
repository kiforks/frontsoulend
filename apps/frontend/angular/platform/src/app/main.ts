import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app.config';

import './polyfills';

import { RootComponent } from '../pages';

bootstrapApplication(RootComponent, appConfig).catch(err => console.error(err));
