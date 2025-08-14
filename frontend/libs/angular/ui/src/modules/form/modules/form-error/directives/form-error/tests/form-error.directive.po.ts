import { SpectatorDirective } from '@ngneat/spectator';

import { Spectator, SpectatorHost } from '@ngneat/spectator/jest';

import { FormErrorComponent } from '../../../components';
import { FormErrorDirective } from '../form-error.directive';
import { FormErrorConfigSpecComponent, FormErrorHostSpecComponent, FormErrorWrapperSpecComponent } from './components';

import { FormErrorOptionsConfig } from '../../../configs';

export class FormErrorDirectivePO {
	constructor(
		private readonly spectator:
			| Spectator<FormErrorHostSpecComponent>
			| SpectatorDirective<FormErrorDirective>
			| SpectatorHost<FormErrorWrapperSpecComponent>
	) {}

	public get component(): FormErrorComponent {
		return this.spectator.query(FormErrorComponent)!;
	}

	public get configComponent(): FormErrorConfigSpecComponent {
		return this.spectator.query(FormErrorConfigSpecComponent)!;
	}

	public get passwordInput(): HTMLInputElement {
		return this.spectator.query('[data-po="ui-form-error-password"]')!;
	}

	public get containerComponent(): FormErrorComponent {
		return this.spectator.query(FormErrorComponent, {
			parentSelector: '[data-po="ui-form-error-container"]',
		})!;
	}

	public get group(): HTMLElement {
		return this.spectator.query('[data-po="ui-form-error-password"]')!;
	}

	public typePassword(value: string, debounceTime = FormErrorOptionsConfig.DebounceTime): void {
		this.spectator.typeInElement(value, this.passwordInput);

		this.spectator.tick(debounceTime);
	}

	public blurPassword(debounceTime = FormErrorOptionsConfig.DebounceTime): void {
		this.spectator.blur(this.passwordInput);

		this.spectator.tick(debounceTime);
	}
}
