import '@angular/compiler';
import '@angular/localize/init';
import '@analogjs/vitest-angular/setup-zone';

import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

export const setupZoneEnvironment = (): void =>
	getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
