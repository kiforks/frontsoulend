import { HttpParams } from '@angular/common/http';

import { ApiHelper } from './api.helper';

describe(ApiHelper, () => {
	describe('toHttpParams', () => {
		it('should return empty HttpParams when input is null', () => {
			const result = ApiHelper.toHttpParams(null);

			expect(result).toBeInstanceOf(HttpParams);
			expect(result.keys()).toHaveLength(0);
		});

		it('should convert flat object to HttpParams', () => {
			const obj = { alpha: 1, bravoText: 'test' };
			const result = ApiHelper.toHttpParams(obj);

			expect(result.get('alpha')).toBe('1');
			expect(result.get('bravoText')).toBe('test');
		});

		it('should convert nested object to HttpParams', () => {
			const obj = { alpha: { bravo: 2, charlie: 'x' } };
			const result = ApiHelper.toHttpParams(obj);

			expect(result.get('alpha[bravo]')).toBe('2');
			expect(result.get('alpha[charlie]')).toBe('x');
		});

		it('should handle arrays correctly', () => {
			const obj = { itemsArray: ['x', 'y'] };
			const result = ApiHelper.toHttpParams(obj);

			expect(result.get('itemsArray[0]')).toBe('x');
			expect(result.get('itemsArray[1]')).toBe('y');
		});

		it('should convert Date to ISO string', () => {
			const date = new Date('2025-10-21T00:00:00Z');
			const obj = { createdAt: date };
			const result = ApiHelper.toHttpParams(obj);

			expect(result.get('createdAt')).toBe(date.toISOString());
		});

		it('should include null values as empty string when clearNull is false', () => {
			const obj = { alpha: null };
			const result = ApiHelper.toHttpParams(obj, false);

			expect(result.get('alpha')).toBe('');
		});

		it('should skip null values when clearNull is true', () => {
			const obj = { alpha: null, bravo: 1 };
			const result = ApiHelper.toHttpParams(obj, true);

			expect(result.get('alpha')).toBeNull();
			expect(result.get('bravo')).toBe('1');
		});

		it('should skip undefined values', () => {
			// eslint-disable-next-line no-undefined
			const obj = { alpha: undefined, bravo: 'ok' };
			const result = ApiHelper.toHttpParams(obj);

			expect(result.get('alpha')).toBeNull();
			expect(result.get('bravo')).toBe('ok');
		});

		it('should handle complex nested structure', () => {
			const obj = {
				alpha: { bravo: { charlie: 1 }, delta: null },
				echo: [10, 20],
				isActive: true,
			};
			const result = ApiHelper.toHttpParams(obj);

			expect(result.get('alpha[bravo][charlie]')).toBe('1');
			expect(result.get('alpha[delta]')).toBe('');
			expect(result.get('echo[0]')).toBe('10');
			expect(result.get('echo[1]')).toBe('20');
			expect(result.get('isActive')).toBe('true');
		});

		it('should return empty HttpParams for empty object', () => {
			const result = ApiHelper.toHttpParams({});

			expect(result.keys()).toHaveLength(0);
		});

		it('should skip nested null when clearNull is true', () => {
			const obj = { alpha: { bravo: null, charlie: 1 } };
			const result = ApiHelper.toHttpParams(obj, true);

			expect(result.get('alpha[bravo]')).toBeNull();
			expect(result.get('alpha[charlie]')).toBe('1');
		});

		it('should convert nested Date to ISO string', () => {
			const date = new Date('2025-10-21T00:00:00Z');
			const obj = { metadata: { createdAt: date } };
			const result = ApiHelper.toHttpParams(obj);

			expect(result.get('metadata[createdAt]')).toBe(date.toISOString());
		});

		it('should handle array of objects', () => {
			const obj = { items: [{ itemId: 1 }, { itemId: 2 }] };
			const result = ApiHelper.toHttpParams(obj);

			expect(result.get('items[0][itemId]')).toBe('1');
			expect(result.get('items[1][itemId]')).toBe('2');
		});

		it('should handle empty array', () => {
			const obj = { items: [] };
			const result = ApiHelper.toHttpParams(obj);

			expect(result.keys()).not.toContain('items[0]');
		});

		it('should keep falsy primitives 0 and false', () => {
			const obj = { zero: 0, isEnabled: false };
			const result = ApiHelper.toHttpParams(obj);

			expect(result.get('zero')).toBe('0');
			expect(result.get('isEnabled')).toBe('false');
		});

		it('should skip undefined inside nested object and arrays', () => {
			// eslint-disable-next-line no-undefined
			const obj = { alpha: { bravo: undefined, charlie: 'ok' }, values: [undefined, 'v'] };
			const result = ApiHelper.toHttpParams(obj);

			expect(result.get('alpha[bravo]')).toBeNull();
			expect(result.get('alpha[charlie]')).toBe('ok');
			expect(result.get('values[0]')).toBeNull();
			expect(result.get('values[1]')).toBe('v');
		});
	});
});
