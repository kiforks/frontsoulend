import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { faker } from '@faker-js/faker';

import { firstValueFrom } from 'rxjs';

import { ApiService } from './api.service';
import { ApiOptions } from '../../interfaces';

describe(ApiService, () => {
	let spectator: SpectatorHttp<ApiService>;
	let service: ApiService;

	const user = {
		name: 'Patrick',
		isAdmin: false,
		age: 25,
		user: {
			nickname: 'patrick_00',
			isAdmin: true,
			age: 34,
			additionalData: { customField: [1, 2, 3], additionalField: null, url: 'some_url' },
		},
	};
	const paramsData = {
		name: 'Nick',
		isAdmin: true,
		age: 18,
		users: [user],
		additionalData: null,
	};
	const options: ApiOptions = { timeout: faker.number.int({ min: 1, max: 9999 }), params: paramsData };
	const body = { name: '  Patrick  ', user: { name: '  John ' } };
	const response = faker.word.words(1);
	const url = faker.word.words(1);
	const params =
		// eslint-disable-next-line max-len
		'?name=Nick&isAdmin=true&age=18&users%5B0%5D%5Bname%5D=Patrick&users%5B0%5D%5BisAdmin%5D=false&users%5B0%5D%5Bage%5D=25&users%5B0%5D%5Buser%5D%5Bnickname%5D=patrick_00&users%5B0%5D%5Buser%5D%5BisAdmin%5D=true&users%5B0%5D%5Buser%5D%5Bage%5D=34&users%5B0%5D%5Buser%5D%5BadditionalData%5D%5BcustomField%5D%5B0%5D=1&users%5B0%5D%5Buser%5D%5BadditionalData%5D%5BcustomField%5D%5B1%5D=2&users%5B0%5D%5Buser%5D%5BadditionalData%5D%5BcustomField%5D%5B2%5D=3&users%5B0%5D%5Buser%5D%5BadditionalData%5D%5Burl%5D=some_url';
	const expectedUrl = `${url}${params}`;

	const createHttp = createHttpFactory(ApiService);

	beforeEach(() => {
		spectator = createHttp();
		service = spectator.service;
	});

	describe('get', () => {
		it('should perform with encoded params', async () => {
			const requestPromise = firstValueFrom(service.get<string>(url, options));
			const request = spectator.expectOne(expectedUrl, HttpMethod.GET);

			request.flush(response);

			const result = await requestPromise;

			expect(result).toStrictEqual(response);
		});

		it('should perform without options (no params)', async () => {
			const requestPromise = firstValueFrom(service.get<string>(url));
			const request = spectator.expectOne(url, HttpMethod.GET);

			request.flush(response);

			const result = await requestPromise;

			expect(result).toStrictEqual(response);
		});
	});

	describe('post', () => {
		it('should perform with trimmed body and encoded params', async () => {
			const requestPromise = firstValueFrom(service.post<string>(url, body, options));
			const request = spectator.expectOne(expectedUrl, HttpMethod.POST);

			request.flush(response);

			const result = await requestPromise;

			expect(request.request.body).toStrictEqual({ name: 'Patrick', user: { name: 'John' } });
			expect(result).toStrictEqual(response);
		});

		it('should perform without options and trim body', async () => {
			const requestPromise = firstValueFrom(service.post<string>(url, body));
			const request = spectator.expectOne(url, HttpMethod.POST);

			request.flush(response);

			const result = await requestPromise;

			expect(request.request.body).toStrictEqual({ name: 'Patrick', user: { name: 'John' } });
			expect(result).toStrictEqual(response);
		});
	});

	describe('put', () => {
		it('should perform with trimmed body and encoded params', async () => {
			const requestPromise = firstValueFrom(service.put<string>(url, body, options));
			const request = spectator.expectOne(expectedUrl, HttpMethod.PUT);

			request.flush(response);

			const result = await requestPromise;

			expect(request.request.body).toStrictEqual({ name: 'Patrick', user: { name: 'John' } });
			expect(result).toStrictEqual(response);
		});

		it('should perform without options and trim body', async () => {
			const requestPromise = firstValueFrom(service.put<string>(url, body));
			const request = spectator.expectOne(url, HttpMethod.PUT);

			request.flush(response);

			const result = await requestPromise;

			expect(request.request.body).toStrictEqual({ name: 'Patrick', user: { name: 'John' } });
			expect(result).toStrictEqual(response);
		});
	});

	describe('patch', () => {
		it('should perform with trimmed body and encoded params', async () => {
			const requestPromise = firstValueFrom(service.patch<string>(url, body, options));
			const req = spectator.expectOne(expectedUrl, HttpMethod.PATCH);

			req.flush(response);

			const result = await requestPromise;

			expect(req.request.body).toStrictEqual({ name: 'Patrick', user: { name: 'John' } });
			expect(result).toStrictEqual(response);
		});

		it('should perform without options and trim body', async () => {
			const requestPromise = firstValueFrom(service.patch<string>(url, body));
			const request = spectator.expectOne(url, HttpMethod.PATCH);

			request.flush(response);

			const result = await requestPromise;

			expect(request.request.body).toStrictEqual({ name: 'Patrick', user: { name: 'John' } });
			expect(result).toStrictEqual(response);
		});
	});

	describe('delete', () => {
		it('should perform with encoded params', async () => {
			const requestPromise = firstValueFrom(service.delete<string>(url, options));
			const req = spectator.expectOne(expectedUrl, HttpMethod.DELETE);

			req.flush(response);

			const result = await requestPromise;

			expect(result).toStrictEqual(response);
		});

		it('should perform without options (no params)', async () => {
			const requestPromise = firstValueFrom(service.delete<string>(url));
			const request = spectator.expectOne(url, HttpMethod.DELETE);

			request.flush(response);

			const result = await requestPromise;

			expect(result).toStrictEqual(response);
		});
	});
});
