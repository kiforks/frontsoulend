import { SpectatorDirective } from '@ngneat/spectator';

export class MediaBetweenDirectivePo {
	constructor(private readonly spectator: SpectatorDirective<unknown>) {}

	public get element(): HTMLElement {
		return this.spectator.query('[data-po="test"]') as HTMLElement;
	}

	public get stubElement(): HTMLElement {
		return this.spectator.query('[data-po="stub"]') as HTMLElement;
	}
}
