import { SpectatorDirective } from '@ngneat/spectator';

export class MediaBaseDirectivePo {
	constructor(private readonly spectator: SpectatorDirective<unknown>) {}

	public get element(): HTMLElement {
		return this.spectator.query('[data-po="test"]') as HTMLElement;
	}
}
