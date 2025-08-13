import { FormErrorComponent } from '../components';
import { FormErrorConfig } from '../interfaces';

export abstract class FormErrorOptionsConfig {
	public static readonly DebounceTime: FormErrorConfig['debounceTime'] = 50;
	public static readonly ValidationType: FormErrorConfig['validationType'] = 'touched-or-submit';
	public static readonly Component: FormErrorConfig['component'] = FormErrorComponent;
}
