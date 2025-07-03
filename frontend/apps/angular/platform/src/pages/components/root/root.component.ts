import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './root.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent {}
