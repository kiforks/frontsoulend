import { fakeAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {
	createComponentFactory,
	createDirectiveFactory,
	createHostFactory,
	Spectator,
	SpectatorDirective,
	SpectatorHost,
} from '@ngneat/spectator/jest';

import { HTMLString } from '@core';

import { FormErrorDirective } from '../form-error.directive';
import { FormErrorConfigSpecComponent, FormErrorHostSpecComponent, FormErrorWrapperSpecComponent } from './components';
import { FormErrorDirectivePO } from './form-error.directive.po';
import { FormErrorConfig } from '../../../interfaces';

import { FormErrorOptionsConfig } from '../../../configs';
import { FormErrorMessagesMock } from '../../../mocks';
import { FORM_ERROR_CONFIG, FORM_ERROR_MESSAGES } from '../../../tokens';

describe('FormErrorDirective', () => {
	describe('directive', () => {
		let spectator!: SpectatorDirective<FormErrorDirective>;
		let directivePO!: FormErrorDirectivePO;
		let errors: { required: true } | null = { required: true };

		const minlength = 3;
		const maxlength = 3;
		const validators = [Validators.minLength(minlength), Validators.required];

		const createDirective = createDirectiveFactory<FormErrorDirective>({
			directive: FormErrorDirective,
			imports: [FormsModule, ReactiveFormsModule],
		});

		it('should not render error component if debounce time has not passed', fakeAsync(() => {
			const messages = new FormErrorMessagesMock();

			spectator = createDirective(
				`
					<input  
						uiFormError
						type="password" 
						[formControl]="control"
						data-po="ui-form-error-password"
					/>
				`,
				{
					hostProps: {
						control: new FormControl('', validators),
					},
					providers: [{ provide: FORM_ERROR_MESSAGES, useValue: messages }],
				}
			);

			directivePO = new FormErrorDirectivePO(spectator);

			expect(directivePO.component).not.toExist();

			spectator.typeInElement('12', directivePO.passwordInput);
			spectator.blur(directivePO.passwordInput);
			spectator.tick(FormErrorOptionsConfig.DebounceTime - 1);

			expect(directivePO.component).not.toExist();
		}));

		describe('single', () => {
			const checkPasswordErrors = (template: HTMLString, hostProps: Record<string, unknown>) => {
				const messages = new FormErrorMessagesMock();

				spectator = createDirective(template, {
					hostProps,
					providers: [{ provide: FORM_ERROR_MESSAGES, useValue: messages }],
				});

				directivePO = new FormErrorDirectivePO(spectator);

				expect(directivePO.component).not.toExist();

				directivePO.typePassword('12');
				directivePO.blurPassword();
				directivePO.typePassword('12');

				expect(directivePO.component.message()).toBe(messages.minlengthMessage);

				directivePO.typePassword('123');

				expect(directivePO.component).not.toExist();

				directivePO.typePassword('');

				expect(directivePO.component.message()).toBe(messages.requiredMessage);

				directivePO.typePassword('123');

				expect(directivePO.component).not.toExist();
			};

			describe('ngModel', () => {
				it('should display "minlength" and "required" error messages and hide error when value is valid', fakeAsync(() =>
					checkPasswordErrors(
						`
					<input  
						uiFormError
						name="password" 
						required
						type="password" 
						[minlength]="minlength"
						[ngModel]="password"
						data-po="ui-form-error-password"
					/>
				` as HTMLString,
						{
							password: '',
							minlength,
						}
					)));

				it('should dynamically show or hide "maxlength" error depending on filter and input value', fakeAsync(() => {
					const messages = new FormErrorMessagesMock().setMaxlengthFilter(false);

					spectator = createDirective(
						`
					<input  
						uiFormError
						name="password" 
						required
						type="password" 
						[maxlength]="maxlength"
						[(ngModel)]="password"
						data-po="ui-form-error-password"
					/>
				`,
						{
							hostProps: {
								password: '',
								maxlength,
							},
							providers: [{ provide: FORM_ERROR_MESSAGES, useValue: messages }],
						}
					);

					directivePO = new FormErrorDirectivePO(spectator);

					expect(directivePO.component).not.toExist();

					directivePO.typePassword('1234');
					directivePO.blurPassword();
					directivePO.typePassword('1234');

					expect(directivePO.component).not.toExist();

					messages.setMaxlengthFilter(true);

					directivePO.typePassword('1234');

					expect(directivePO.component.message()).toBe(messages.maxlengthMessage);

					messages.setMaxlengthFilter(false);

					directivePO.typePassword('1234');

					expect(directivePO.component).not.toExist();
				}));
			});

			describe('formControl', () => {
				it('should display "minlength" and "required" error messages and hide error when value is valid', fakeAsync(() =>
					checkPasswordErrors(
						`
					<input  
						uiFormError
						type="password" 
						[formControl]="control"
						data-po="ui-form-error-password"
					/>
				` as HTMLString,
						{
							control: new FormControl('', validators),
							minlength,
						}
					)));
			});

			describe('formControlName', () => {
				it('should display "minlength" and "required" error messages and hide error when value is valid', fakeAsync(() =>
					checkPasswordErrors(
						`
					<form [formGroup]="form">
						<input  
							uiFormError
							type="password" 
							formControlName="password"
							data-po="ui-form-error-password"
						/>
					</form>
				` as HTMLString,
						{
							form: new FormGroup({
								password: new FormControl('', validators),
							}),
							minlength,
						}
					)));
			});
		});

		describe('group', () => {
			const checkGroupErrors = (template: HTMLString, hostProps: Record<string, unknown>) => {
				const messages = new FormErrorMessagesMock();

				spectator = createDirective(template, {
					hostProps,
					providers: [{ provide: FORM_ERROR_MESSAGES, useValue: messages }],
				});

				directivePO = new FormErrorDirectivePO(spectator);

				expect(directivePO.component).not.toExist();

				directivePO.typePassword('12');
				directivePO.blurPassword();

				expect(directivePO.component.message()).toBe(messages.requiredMessage);

				errors = null;

				directivePO.typePassword('12');

				expect(directivePO.component).not.toExist();
			};

			beforeEach(() => {
				errors = { required: true };
			});

			describe('formGroup', () => {
				it('should display "required" error message for the group and hide error when valid', fakeAsync(() =>
					checkGroupErrors(
						`
					<form uiFormError [formGroup]="form">
						<input  
							type="password" 
							formControlName="password"
							data-po="ui-form-error-password"
						/>
					</form>
					` as HTMLString,
						{
							form: new FormGroup(
								{
									password: new FormControl(''),
								},
								[() => errors]
							),
						}
					)));
			});

			describe('formGroupName', () => {
				it('should display "required" error message for the nested group and hide error when valid', fakeAsync(() =>
					checkGroupErrors(
						`
						<form [formGroup]="form">
							<input  
								type="email" 
								formControlName="email"
							/>
							<fieldset uiFormError formGroupName="group">
								<input  
									type="password" 
									formControlName="password"
									data-po="ui-form-error-password"
								/>
							</fieldset>
						</form>
					` as HTMLString,
						{
							form: new FormGroup({
								email: new FormControl(''),
								group: new FormGroup(
									{
										password: new FormControl(''),
									},
									[() => errors]
								),
							}),
						}
					)));
			});
		});

		describe('config', () => {
			describe('component', () => {
				const checkComponentRender = (isConfig: boolean) => {
					const messages = new FormErrorMessagesMock();

					spectator = createDirective(
						isConfig
							? `
							<input  
								uiFormError
								type="password" 
								[uiFormErrorConfig]="config"
								[formControl]="control"
								data-po="ui-form-error-password"
							/>
						`
							: `
							<input  
								uiFormError
								type="password" 
								[formControl]="control"
								data-po="ui-form-error-password"
							/>
					`,
						isConfig
							? {
									hostProps: {
										control: new FormControl('', validators),
										config: {
											component: FormErrorConfigSpecComponent,
										} satisfies Partial<FormErrorConfig>,
									},
									providers: [{ provide: FORM_ERROR_MESSAGES, useValue: messages }],
								}
							: {
									hostProps: {
										control: new FormControl('', validators),
									},
									providers: [
										{ provide: FORM_ERROR_MESSAGES, useValue: messages },
										{
											provide: FORM_ERROR_CONFIG,
											useValue: {
												component: FormErrorConfigSpecComponent,
											} satisfies Partial<FormErrorConfig>,
										},
									],
								}
					);

					directivePO = new FormErrorDirectivePO(spectator);

					expect(directivePO.component).not.toExist();
					expect(directivePO.configComponent).not.toExist();

					directivePO.typePassword('12');
					directivePO.blurPassword();
					directivePO.typePassword('12');

					expect(directivePO.component).not.toExist();
					expect(directivePO.configComponent).toExist();
				};

				it('should render custom error component from global config', fakeAsync(() => checkComponentRender(false)));

				it('should render custom error component from input config', fakeAsync(() => checkComponentRender(true)));
			});

			describe('debounce time', () => {
				const debounceTime = FormErrorOptionsConfig.DebounceTime * 2;
				const checkRender = (isConfig: boolean, isShown: boolean) => {
					const messages = new FormErrorMessagesMock();

					spectator = createDirective(
						isConfig
							? `
					<input  
						uiFormError
						type="password" 
						[uiFormErrorConfig]="config"
						[formControl]="control"
						data-po="ui-form-error-password"
					/>
					`
							: `
					<input  
						uiFormError
						type="password" 
						[formControl]="control"
						data-po="ui-form-error-password"
					/>
				`,
						isConfig
							? {
									hostProps: {
										control: new FormControl('', validators),
										config: { debounceTime } satisfies Partial<FormErrorConfig>,
									},
									providers: [{ provide: FORM_ERROR_MESSAGES, useValue: messages }],
								}
							: {
									hostProps: {
										control: new FormControl('', validators),
									},
									providers: [
										{ provide: FORM_ERROR_MESSAGES, useValue: messages },
										{ provide: FORM_ERROR_CONFIG, useValue: { debounceTime } satisfies Partial<FormErrorConfig> },
									],
								}
					);

					directivePO = new FormErrorDirectivePO(spectator);

					expect(directivePO.component).not.toExist();

					spectator.typeInElement('12', directivePO.passwordInput);
					spectator.blur(directivePO.passwordInput);

					if (isShown) {
						spectator.tick(debounceTime);
						expect(directivePO.component).toExist();

						return;
					}

					spectator.tick(debounceTime - 1);
					expect(directivePO.component).not.toExist();
				};

				describe('DI', () => {
					it('should not render error component if debounce time has not passed', fakeAsync(() =>
						checkRender(false, false)));

					it('should render error component if debounce time has not passed', fakeAsync(() =>
						checkRender(false, true)));
				});

				describe('inputs', () => {
					it('should not render error component if debounce time has not passed', fakeAsync(() =>
						checkRender(true, false)));

					it('should render error component if debounce time has not passed', fakeAsync(() => checkRender(true, true)));
				});
			});
		});
	});

	describe('host component', () => {
		let spectator: Spectator<FormErrorHostSpecComponent>;
		let directivePO: FormErrorDirectivePO;

		const messages = new FormErrorMessagesMock();

		const createComponent = createComponentFactory({
			component: FormErrorHostSpecComponent,
			providers: [{ provide: FORM_ERROR_MESSAGES, useValue: messages }],
		});

		it('should render the error component into a DI-provided custom ViewContainerRef and remove it when the container is cleared', fakeAsync(() => {
			spectator = createComponent();

			directivePO = new FormErrorDirectivePO(spectator);

			expect(directivePO.component).not.toExist();

			directivePO.typePassword('12');
			directivePO.blurPassword();
			directivePO.typePassword('');

			expect(directivePO.component).toExist();

			spectator.component.viewContainerRef?.clear();

			expect(directivePO.component).not.toExist();
		}));
	});

	describe('wrapper component', () => {
		let spectator: SpectatorHost<FormErrorWrapperSpecComponent>;
		let directivePO: FormErrorDirectivePO;

		const messages = new FormErrorMessagesMock();

		const createComponent = createHostFactory({
			component: FormErrorWrapperSpecComponent,
			providers: [{ provide: FORM_ERROR_MESSAGES, useValue: messages }],
		});

		it('should render the error component into an input-provided custom ViewContainerRef when validation fails', fakeAsync(() => {
			spectator = createComponent(`
				<ui-form-error-wrapper-spec>
					<div data-po="ui-form-error-container">
						<ng-container #containerRef />
					</div>
				</ui-form-error-wrapper-spec>
			`);

			directivePO = new FormErrorDirectivePO(spectator);

			expect(directivePO.containerComponent).not.toExist();

			directivePO.typePassword('12');
			directivePO.blurPassword();
			directivePO.typePassword('');

			expect(directivePO.containerComponent).toExist();

			directivePO.typePassword('123456');
			directivePO.blurPassword();

			expect(directivePO.containerComponent).not.toExist();
		}));
	});
});
