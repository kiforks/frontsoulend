import { SpectatorDirective } from '@ngneat/spectator/jest';

export class ConditionKeywordDirectivePO {
	constructor(private readonly spectator: SpectatorDirective<unknown>) {}

	public get element(): HTMLElement {
		return this.spectator.query('[data-po="test"]') as HTMLElement;
	}

	public get stub(): HTMLElement {
		return this.spectator.query('[data-po="stub"]') as HTMLElement;
	}
}
