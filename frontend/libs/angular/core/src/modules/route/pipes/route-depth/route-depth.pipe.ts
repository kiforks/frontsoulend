import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appRouteDepth' })
export class RouteDepthPipe implements PipeTransform {
	public transform(value: string[] | string, depth: number): string {
		return RouteDepthPipe.transform(value, depth);
	}

	public static transform(value: string[] | string, depth: number): string {
		const base = Array.from({ length: depth }, () => '..').join('/');
		const path = Array.isArray(value) ? value.join('/') : value;

		return `${base}/${path}`;
	}
}
