import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';

import { MediaService } from '../../services';

/**
 * This directive is intended to enable us to receive our "media" data from the "MediaService" directly into HTML.
 *
 * Example usage in the DOM:
 * ```html
 * <some-component
 * 	 *mediaData="let mediaMobile = mediaMobile; let mediaDesktop = mediaDesktop"
 * 	 [icon]="(mediaMobile | async) ? 'icon-1' : 'icon-2'"
 * 	 [isTransparent]="!!(mediaDesktop | async)"
 * ></some-component>
 * ```
 */
@Directive({
	selector: '[uiMediaData]',
	standalone: true,
})
export class MediaDataDirective {
	private readonly mediaService = inject(MediaService);
	private readonly templateRef = inject(TemplateRef<MediaService>);
	private readonly viewContainerRef = inject(ViewContainerRef);

	constructor() {
		this.createEmbeddedView();
	}

	private createEmbeddedView(): void {
		this.viewContainerRef.createEmbeddedView(this.templateRef, this.mediaService);
	}

	public static ngTemplateContextGuard(_dir: MediaDataDirective, _ctx: unknown): _ctx is MediaService {
		return true;
	}
}
