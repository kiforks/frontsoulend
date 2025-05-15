import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { MockProvider } from 'ng-mocks';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { firstValueFrom, Observable, of } from 'rxjs';

import { MediaService } from './media.service';

describe('MediaService', () => {
	let spectator: SpectatorService<MediaService>;
	let service: MediaService;

	const createService = createServiceFactory(MediaService);

	describe('mediaMobile', () => {
		it('should return the proper value', async () => {
			spectator = createService({
				providers: [
					MockProvider(BreakpointObserver, {
						observe(value: string | readonly string[]): Observable<BreakpointState> {
							return of({
								matches: value === '(max-width: 767.98px)',
								breakpoints: {
									md: true,
								},
							});
						},
					}),
				],
			});

			service = spectator.service;

			const spyOnMediaMax = jest.spyOn(service, 'mediaMax');
			const isMatched = await firstValueFrom(service.mediaMobile);

			expect(isMatched).toBe(true);
			expect(spyOnMediaMax).toHaveBeenNthCalledWith(1, 'md');
		});
	});

	describe('mediaDesktop', () => {
		it('should return the proper value', async () => {
			spectator = createService({
				providers: [
					MockProvider(BreakpointObserver, {
						observe(value: string | readonly string[]): Observable<BreakpointState> {
							return of({
								matches: value === '(min-width: 768px)',
								breakpoints: {
									md: true,
								},
							});
						},
					}),
				],
			});

			service = spectator.service;

			const spyOnMediaMin = jest.spyOn(service, 'mediaMin');
			const isMatched = await firstValueFrom(service.mediaDesktop);

			expect(isMatched).toBe(true);
			expect(spyOnMediaMin).toHaveBeenNthCalledWith(1, 'md');
		});
	});

	describe('mediaMin', () => {
		const fromLGBreakpoint = '(min-width: 992px)';

		beforeEach(() => {
			spectator = createService({
				providers: [
					MockProvider(BreakpointObserver, {
						observe(value: string | readonly string[]): Observable<BreakpointState> {
							return of({
								matches: value === fromLGBreakpoint,
								breakpoints: {
									md: true,
								},
							});
						},
					}),
				],
			});

			service = spectator.service;
		});

		describe('valid', () => {
			it('should return true when value is "lg"', async () => {
				const isMatched = await firstValueFrom(service.mediaMin('lg'));

				expect(isMatched).toBe(true);
			});
		});

		describe('invalid', () => {
			it('should return false when value is "md"', async () => {
				const isMatched = await firstValueFrom(service.mediaMin('md'));

				expect(isMatched).toBe(false);
			});

			it('should return false when value is "xl"', async () => {
				const isMatched = await firstValueFrom(service.mediaMin('md'));

				expect(isMatched).toBe(false);
			});
		});
	});

	describe('mediaMax', () => {
		const toLGBreakpoint = '(max-width: 991.98px)';

		beforeEach(() => {
			spectator = createService({
				providers: [
					MockProvider(BreakpointObserver, {
						observe(value: string | readonly string[]): Observable<BreakpointState> {
							return of({
								matches: value === toLGBreakpoint,
								breakpoints: {
									md: true,
								},
							});
						},
					}),
				],
			});

			service = spectator.service;
		});

		describe('valid', () => {
			it('should return true when value is "lg"', async () => {
				const isMatched = await firstValueFrom(service.mediaMax('lg'));

				expect(isMatched).toBe(true);
			});
		});

		describe('invalid', () => {
			it('should return false when value is "md"', async () => {
				const isMatched = await firstValueFrom(service.mediaMax('md'));

				expect(isMatched).toBe(false);
			});

			it('should return false when value is "xl"', async () => {
				const isMatched = await firstValueFrom(service.mediaMax('md'));

				expect(isMatched).toBe(false);
			});
		});
	});

	describe('mediaBetween', () => {
		describe('valid', () => {
			const fromSMToXLBreakpoint = '(min-width: 576px) and (max-width: 1199.98px)';

			beforeEach(() => {
				spectator = createService({
					providers: [
						MockProvider(BreakpointObserver, {
							observe(value: string | readonly string[]): Observable<BreakpointState> {
								return of({
									matches: value === fromSMToXLBreakpoint,
									breakpoints: {
										md: true,
									},
								});
							},
						}),
					],
				});

				service = spectator.service;
			});

			describe('valid', () => {
				it('should return true when breakpoints are from "sm" to "xl"', async () => {
					const isMatched = await firstValueFrom(service.mediaBetween(['sm', 'xl']));

					expect(isMatched).toBe(true);
				});
			});

			describe('invalid', () => {
				it('should return false when breakpoints are from "sm" to "md"', async () => {
					const isMatched = await firstValueFrom(service.mediaBetween(['sm', 'md']));

					expect(isMatched).toBe(false);
				});

				it('should return false when breakpoints are from "lg" to "xxl"', async () => {
					const isMatched = await firstValueFrom(service.mediaBetween(['lg', 'xxl']));

					expect(isMatched).toBe(false);
				});
			});
		});

		describe('error', () => {
			beforeEach(() => {
				spectator = createService({
					providers: [
						MockProvider(BreakpointObserver, {
							observe(_value: string | readonly string[]): Observable<BreakpointState> {
								return of({
									matches: false,
									breakpoints: {
										md: false,
									},
								});
							},
						}),
					],
				});

				service = spectator.service;
			});

			it('should throw an error when breakpoints are the same', async () => {
				await expect(async () => {
					await firstValueFrom(service.mediaBetween(['sm', 'sm']));
				}).rejects.toThrow(
					'"MediaService": the minimum value "(min-width: 576px)" cannot be equal to or greater than the maximum value "(max-width: 575.98px)"'
				);
			});

			it('should throw an error when min breakpoint is lower', async () => {
				await expect(async () => {
					await firstValueFrom(service.mediaBetween(['md', 'sm']));
				}).rejects.toThrow(
					'"MediaService": the minimum value "(min-width: 768px)" cannot be equal to or greater than the maximum value "(max-width: 575.98px)"'
				);
			});
		});
	});

	describe('mediaOnly', () => {
		describe('lg', () => {
			const LGBreakpointRange = '(min-width: 992px) and (max-width: 1199.98px)';

			beforeEach(() => {
				spectator = createService({
					providers: [
						MockProvider(BreakpointObserver, {
							observe(value: string | readonly string[]): Observable<BreakpointState> {
								return of({
									matches: value === LGBreakpointRange,
									breakpoints: {
										md: true,
									},
								});
							},
						}),
					],
				});

				service = spectator.service;
			});

			describe('valid', () => {
				it('should return true when breakpoints is "lg"', async () => {
					const isMatched = await firstValueFrom(service.mediaOnly('lg'));

					expect(isMatched).toBe(true);
				});
			});

			describe('invalid', () => {
				it('should return false when breakpoints is "md"', async () => {
					const isMatched = await firstValueFrom(service.mediaOnly('md'));

					expect(isMatched).toBe(false);
				});

				it('should return false when breakpoints is "xl"', async () => {
					const isMatched = await firstValueFrom(service.mediaOnly('xl'));

					expect(isMatched).toBe(false);
				});
			});
		});

		describe('xs', () => {
			const smMaxBreakpoint = '(max-width: 575.98px)';

			beforeEach(() => {
				spectator = createService({
					providers: [
						MockProvider(BreakpointObserver, {
							observe(value: string | readonly string[]): Observable<BreakpointState> {
								return of({
									matches: value === smMaxBreakpoint,
									breakpoints: {
										md: true,
									},
								});
							},
						}),
					],
				});

				service = spectator.service;
			});

			it('should return false when breakpoints is "md"', async () => {
				const isMatched = await firstValueFrom(service.mediaOnly('md'));

				expect(isMatched).toBe(false);
			});

			it('should return false when breakpoints is "xl"', async () => {
				const isMatched = await firstValueFrom(service.mediaOnly('xl'));

				expect(isMatched).toBe(false);
			});
		});

		describe('xxl', () => {
			const xxlMinBreakpoint = '(min-width: 1400px)';

			beforeEach(() => {
				spectator = createService({
					providers: [
						MockProvider(BreakpointObserver, {
							observe(value: string | readonly string[]): Observable<BreakpointState> {
								return of({
									matches: value === xxlMinBreakpoint,
									breakpoints: {
										md: true,
									},
								});
							},
						}),
					],
				});

				service = spectator.service;
			});

			describe('valid', () => {
				it('should return true when breakpoints is "xxl"', async () => {
					const isMatched = await firstValueFrom(service.mediaOnly('xxl'));

					expect(isMatched).toBe(true);
				});
			});

			describe('invalid', () => {
				it('should return false when breakpoints is "md"', async () => {
					const isMatched = await firstValueFrom(service.mediaOnly('md'));

					expect(isMatched).toBe(false);
				});

				it('should return false when breakpoints is "xl"', async () => {
					const isMatched = await firstValueFrom(service.mediaOnly('xl'));

					expect(isMatched).toBe(false);
				});
			});
		});
	});
});
