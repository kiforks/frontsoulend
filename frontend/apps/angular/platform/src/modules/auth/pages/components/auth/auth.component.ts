import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthPanelComponent } from '../../../widgets';

@Component({
	selector: 'app-auth',
	imports: [AuthPanelComponent],
	templateUrl: './auth.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
