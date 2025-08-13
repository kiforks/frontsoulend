import { ViewContainerRef } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

import { faker } from '@faker-js/faker';

import { Subject } from 'rxjs';

import { FormErrorHelper } from './form-error.helper';
import { FormErrorComponentConfig } from '../../interfaces';

import { FormErrorConfigMock } from '../../mocks';

describe('FormErrorHelper', () => {
	describe('getComponentBindings', () => {
		it('should return an array of input bindings', () => {
			const message = 'Test error';
			const control = {} as FormErrorComponentConfig['control'];
			const bindings = FormErrorHelper.getComponentBindings(message, control);

			expect(bindings).toHaveLength(2);
		});
	});

	describe('getTrigger$', () => {
		it('should emit when statusChanges, focusout, or form submit occur', () => {
			const control = new FormControl('');
			const hostElement = document.createElement('input');
			const submit$ = new Subject<void>();
			const form = { ngSubmit: submit$.asObservable() } as NgForm;
			const emitted: unknown[] = [];
			const trigger$ = FormErrorHelper.getTrigger$(control, form, hostElement);
			const subscription = trigger$.subscribe(value => emitted.push(value));
			const focusout = new FocusEvent('focusout', { bubbles: true });

			document.body.appendChild(hostElement);

			control.setErrors({ error: 'Test error' });
			hostElement.dispatchEvent(focusout);
			submit$.next();

			subscription.unsubscribe();
			document.body.removeChild(hostElement);

			expect(emitted.length).toBe(3);
		});
	});

	describe('renderComponent', () => {
		it('should create component with provided bindings', () => {
			const message = faker.lorem.sentence();
			const control = new FormControl('');
			const createComponent = jest.fn() as ViewContainerRef['createComponent'];
			const viewContainerRef = { createComponent } as ViewContainerRef;
			const config = new FormErrorConfigMock({ viewContainerRef });
			const { component } = config;

			FormErrorHelper.renderComponent(message, config, control);

			expect(createComponent).toHaveBeenNthCalledWith(
				1,
				component,
				expect.objectContaining({ bindings: expect.any(Array) })
			);
		});
	});
});
