import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataHelper } from '@core';

import { Observable } from 'rxjs';

import { ApiHelper } from '../../helpers';
import { ApiOptions } from '../../interfaces';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private readonly httpClient = inject(HttpClient);

	public get<T>(url: string, options?: ApiOptions): Observable<T> {
		return this.httpClient.get<T>(url, { ...options, params: ApiHelper.toHttpParams(options?.params, true) });
	}

	public post<T = void>(url: string, body?: unknown, options: ApiOptions = {}): Observable<T> {
		return this.httpClient.post<T>(url, DataHelper.trimDeep(body), {
			...options,
			params: ApiHelper.toHttpParams(options.params, true),
		});
	}

	public put<T = void>(url: string, body?: unknown, options: ApiOptions = {}): Observable<T> {
		return this.httpClient.put<T>(url, DataHelper.trimDeep(body), {
			...options,
			params: ApiHelper.toHttpParams(options.params, true),
		});
	}

	public patch<T = void>(url: string, body?: unknown, options: ApiOptions = {}): Observable<T> {
		return this.httpClient.patch<T>(url, DataHelper.trimDeep(body), {
			...options,
			params: ApiHelper.toHttpParams(options.params, true),
		});
	}

	public delete<T>(url: string, options?: ApiOptions): Observable<T> {
		return this.httpClient.delete<T>(url, { ...options, params: ApiHelper.toHttpParams(options?.params, true) });
	}
}
