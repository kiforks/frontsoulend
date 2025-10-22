import { DataTypeHelper } from './data-type.helper';

describe(DataTypeHelper, () => {
	describe('isPrimitive', () => {
		describe('truthy values', () => {
			it('should return true for string', () => {
				expect(DataTypeHelper.isPrimitive('test')).toBe(true);
			});

			it('should return true for number', () => {
				expect(DataTypeHelper.isPrimitive(42)).toBe(true);
			});

			it('should return true for boolean', () => {
				expect(DataTypeHelper.isPrimitive(false)).toBe(true);
			});

			it('should return true for symbol', () => {
				expect(DataTypeHelper.isPrimitive(Symbol('id'))).toBe(true);
			});

			it('should return true for bigint', () => {
				expect(DataTypeHelper.isPrimitive(10n)).toBe(true);
			});
		});

		describe('falsy values', () => {
			it('should return false for null', () => {
				expect(DataTypeHelper.isPrimitive(null)).toBe(false);
			});

			it('should return false for undefined', () => {
				// eslint-disable-next-line no-undefined
				expect(DataTypeHelper.isPrimitive(undefined)).toBe(false);
			});

			it('should return false for object', () => {
				expect(DataTypeHelper.isPrimitive({})).toBe(false);
			});

			it('should return false for array', () => {
				expect(DataTypeHelper.isPrimitive([])).toBe(false);
			});

			it('should return false for function', () => {
				expect(
					DataTypeHelper.isPrimitive(() => {
						/* empty */
					})
				).toBe(false);
			});
		});
	});
});
