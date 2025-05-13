import { SpectatorDirective } from '@ngneat/spectator';

export class MediaDesktopDirectivePo {
	constructor(private readonly spectator: SpectatorDirective<unknown>) {}

	public get element(): HTMLElement {
		return this.spectator.query('[data-po="test"]') as HTMLElement;
	}
}
