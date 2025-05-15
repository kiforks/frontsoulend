import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'storybook-intro',
	templateUrl: './storybook-intro.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorybookIntroComponent {}
