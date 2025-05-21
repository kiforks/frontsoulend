import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-auth-panel',
	templateUrl: './auth-panel.component.html',
	styleUrl: './auth-panel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPanelComponent {}
