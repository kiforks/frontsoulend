import { ChangeDetectionStrategy, Component, viewChild, ViewContainerRef } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { FormErrorDirective } from '../form-error.directive';
import { FormErrorConfig, FormErrorMessages } from '../../../interfaces';

import { FormErrorOptionsConfig } from '../../../configs';
import { FORM_ERROR_MESSAGES } from '../../../tokens';

type Story = StoryObj<StoryInstance>;
type StoryInstance = FormErrorDirective<FormErrorMessagesStoryParams>;

interface FormErrorMessagesStoryParams {
	minlength: { actualLength: number; requiredLength: number };
	pattern: { actualValue: string; requiredPattern: string };
	required: object;
}

const formErrorMessages: FormErrorMessages<FormErrorMessagesStoryParams> = {
	required: () => 'Field is required.',
	minlength: ({ requiredLength, actualLength }) => `Minimum ${requiredLength} characters (current ${actualLength}).`,
	pattern: {
		filter: (_, control) => control.dirty || control.touched,
		message: ({ requiredPattern }) => `Invalid format. Expected pattern: ${requiredPattern}`,
	},
};

@Component({
	selector: 'ui-form-error-view-container-story',
	template: `
		This is custom view container
		<ng-container #viewContainer />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		style:
			'display: grid; place-items: center; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-top: 10px;',
	},
	exportAs: 'formErrorViewContainerStoryComponentRef',
})
export class FormErrorViewContainerStoryComponent {
	public readonly viewContainerRef = viewChild('viewContainer', { read: ViewContainerRef });
}

export default {
	component: FormErrorDirective,
	title: 'Form/FormError/Directives/FormError',
	decorators: [
		moduleMetadata({
			imports: [ReactiveFormsModule],
			providers: [{ provide: FORM_ERROR_MESSAGES, useValue: formErrorMessages }],
		}),
	],
	tags: ['directives'],
} satisfies Meta<StoryInstance>;

export const Overview: Story = {
	args: {
		messages: formErrorMessages,
		config: {},
	},
	argTypes: {
		messages: {
			description: `
Set of messages. <br> Can be provided via input: <b><code>[uiFormErrorMessages]</code></b>
<br> 
Or globally: <b><code>FORM___ERROR_MESSAGES</code></b> through the <b><code>DI</code></b> token. 
Each message can be a function or an object with a filter and a message definition.
			`,
			table: {
				readonly: true,
				type: { summary: 'FormErrorMessages<Params>' },
			},
		},
		config: {
			description: `
Rendering configuration. <br> Can be provided via input: <b><code>[uiFormErrorConfig]</code></b>
<br> 
Or globally: <b><code>FORM___ERROR_CONFIG</code></b> through the <b><code>DI</code></b> token.
			`,
			table: {
				readonly: true,
				type: { summary: 'Partial<FormErrorConfig>' },
				defaultValue: {
					summary: 'See inside',
				},
			},
			control: { type: 'object' },
		},
	},
	render: ({ messages, config }) => ({
		props: {
			messages,
			config,
			formControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-z]+$')]),
		},
		template: `
      <input 
        placeholder="Type some text..." 
        type="text" 
        uiFormError
        [formControl]="formControl" 
        [uiFormErrorConfig]="config"
        [uiFormErrorMessages]="messages" 
      />
    `,
	}),
};

export const ConfigValidationType: StoryObj<Pick<FormErrorConfig, 'validationType'>> = {
	args: {
		validationType: 'touched',
	},
	argTypes: {
		validationType: {
			description: 'Validation type.',
			options: ['touched', 'dirty', 'touched-or-submit', 'form-submit', 'dirty-or-submit'] satisfies Array<
				FormErrorConfig['validationType']
			>,
			table: {
				defaultValue: {
					summary: FormErrorOptionsConfig.ValidationType,
				},
			},
			control: { type: 'select' },
		},
	},
	render: ({ validationType }) => ({
		props: {
			config: { validationType } satisfies Partial<FormErrorConfig>,
			formControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-z]+$')]),
		},
		template: `
      <input 
        placeholder="Type some text..." 
        type="text" 
        uiFormError 
        [formControl]="formControl" 
        [uiFormErrorConfig]="config"
      />
    `,
	}),
};

export const ConfigDebounceTime: StoryObj<Pick<FormErrorConfig, 'debounceTime'>> = {
	args: {
		debounceTime: 250,
	},
	argTypes: {
		debounceTime: {
			description: 'Debounce time in milliseconds.',
			table: {
				defaultValue: {
					summary: `${FormErrorOptionsConfig.DebounceTime}`,
				},
			},
			control: { type: 'number' },
		},
	},
	render: ({ debounceTime }) => ({
		props: {
			config: { debounceTime } satisfies Partial<FormErrorConfig>,
			formControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-z]+$')]),
		},
		template: `
      <input 
        placeholder="Type some text..." 
        type="text" 
        uiFormError 
        [formControl]="formControl" 
        [uiFormErrorConfig]="config"
      />
    `,
	}),
};

export const ConfigViewContainerRef: StoryObj<Pick<FormErrorConfig, 'viewContainerRef'>> = {
	decorators: [
		moduleMetadata({
			imports: [ReactiveFormsModule, FormErrorViewContainerStoryComponent],
			providers: [{ provide: FORM_ERROR_MESSAGES, useValue: formErrorMessages }],
		}),
	],
	argTypes: {
		viewContainerRef: {
			description: 'Custom ViewContainerRef.',
			table: {
				type: {
					summary: 'ViewContainerRef',
				},
				readonly: true,
			},
			control: { type: 'object' },
		},
	},
	render: () => ({
		props: {
			formControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-z]+$')]),
		},
		template: `
      <input 
        placeholder="Type some text..." 
        type="text" 
        uiFormError 
        [formControl]="formControl" 
        [uiFormErrorConfig]="{ viewContainerRef: formErrorViewContainerStoryComponentRef.viewContainerRef() }"
      />
      
      <ui-form-error-view-container-story #formErrorViewContainerStoryComponentRef="formErrorViewContainerStoryComponentRef" />
    `,
	}),
};
