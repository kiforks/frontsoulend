export abstract class DataTypeHelper {
	/**
	 * Checks whether the given value is a primitive (string, number, boolean, symbol, bigint).
	 *
	 * @param value Value to check.
	 * @returns `true` if value is one of JS primitives (excluding `null` and `undefined`), otherwise `false`.
	 *
	 * @example
	 * DataTypeHelper.isPrimitive('hi'); // true
	 * DataTypeHelper.isPrimitive(0); // true
	 * DataTypeHelper.isPrimitive(false); // true
	 * DataTypeHelper.isPrimitive(Symbol('x')); // true
	 * DataTypeHelper.isPrimitive(10n); // true
	 * DataTypeHelper.isPrimitive(null); // false
	 * DataTypeHelper.isPrimitive(undefined);   // false
	 * DataTypeHelper.isPrimitive({}); // false
	 */
	public static isPrimitive(value: unknown): value is bigint | boolean | number | string | symbol {
		return ['string', 'number', 'boolean', 'symbol', 'bigint'].includes(typeof value);
	}
}
