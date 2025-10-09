import { SpectatorDirective } from '@ngneat/spectator';

export class ConditionDirectivePo {
	constructor(private readonly spectator: SpectatorDirective<unknown>) {}

	public get element(): HTMLElement {
		return this.spectator.query('[data-po="test"]')!;
	}

	public get stub(): HTMLElement {
		return this.spectator.query('[data-po="stub"]')!;
	}
}
