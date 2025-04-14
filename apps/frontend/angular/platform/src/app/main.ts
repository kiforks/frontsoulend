import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app.config';

import { RootComponent } from './components';

bootstrapApplication(RootComponent, appConfig).catch(err => console.error(err));
