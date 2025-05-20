import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'storybook-intro',
	templateUrl: './storybook-intro.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		style: 'background-color: red;',
	},
})
export class StorybookIntroComponent {}
