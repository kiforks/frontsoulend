import { Route } from '@angular/router';

import { RootRoute } from './routes';

export const Routes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: RootRoute.Auth,
	},
	{
		path: '',
		children: [
			{
				path: RootRoute.Auth,
				loadChildren: () => import('~modules/auth/pages').then(m => m.Routes),
			},
		],
	},
];
