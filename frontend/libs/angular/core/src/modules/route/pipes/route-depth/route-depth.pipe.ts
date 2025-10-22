import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appRouteDepth' })
export class RouteDepthPipe implements PipeTransform {
	public transform(value: string, depth: number): string {
		return RouteDepthPipe.transform(value, depth);
	}

	public static transform(value: string, depth: number): string {
		return `${Array.from({ length: depth }, () => '..').join('/')}/${value}`;
	}
}
