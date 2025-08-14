import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app.config';

import { RootComponent } from '../pages';

bootstrapApplication(RootComponent, appConfig).catch((err: unknown) => console.error(err));
