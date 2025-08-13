import { InjectionToken } from '@angular/core';

import { FormErrorMessages } from '../interfaces';

export const FORM_ERROR_MESSAGES = new InjectionToken<FormErrorMessages<object>>('FORM_ERROR_MESSAGES');
