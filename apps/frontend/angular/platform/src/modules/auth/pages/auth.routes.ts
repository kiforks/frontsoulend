import { Route } from '@angular/router';

export const Routes: Route[] = [
	{
		path: '',
		loadComponent: () => import('./components').then(m => m.AuthComponent),
	},
];
