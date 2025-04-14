import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app.config';

import { RootComponent } from './app/components';

bootstrapApplication(RootComponent, appConfig).catch(err => console.error(err));
