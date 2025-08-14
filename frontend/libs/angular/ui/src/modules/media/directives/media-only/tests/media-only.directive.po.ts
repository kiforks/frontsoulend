import { SpectatorDirective } from '@ngneat/spectator';

export class MediaOnlyDirectivePo {
	constructor(private readonly spectator: SpectatorDirective<unknown>) {}

	public get element(): HTMLElement {
		return this.spectator.query('[data-po="test"]')!;
	}

	public get stubElement(): HTMLElement {
		return this.spectator.query('[data-po="stub"]')!;
	}
}
