import { InjectionToken } from '@angular/core';

import { FormErrorConfig } from '../interfaces';

export const FORM_ERROR_CONFIG = new InjectionToken<Partial<FormErrorConfig>>('FORM_ERROR_CONFIG');
