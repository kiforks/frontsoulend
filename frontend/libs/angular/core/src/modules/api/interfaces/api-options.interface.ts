import { HttpContext, HttpHeaders } from '@angular/common/http';

export interface ApiOptions<P extends object = object> {
	cache?: RequestCache;
	context?: HttpContext;
	credentials?: RequestCredentials;
	headers?: HttpHeaders | Record<string, string[] | string>;
	integrity?: string;
	keepalive?: boolean;
	mode?: RequestMode;
	observe?: 'body';
	params?: P;
	priority?: RequestPriority;
	redirect?: RequestRedirect;
	referrer?: string;
	reportProgress?: boolean;
	responseType?: 'json';
	timeout?: number;
	transferCache?: boolean | { includeHeaders?: string[] };
	withCredentials?: boolean;
}
