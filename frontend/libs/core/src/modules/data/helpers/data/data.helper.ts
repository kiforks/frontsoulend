import { mapValues } from 'lodash';

export abstract class DataHelper {
	/**
	 * Deeply trims all string values within strings, arrays, and plain objects.
	 * Does not mutate the input.
	 *
	 * - Strings → `trim()`
	 * - Arrays → map recursively
	 * - Objects → map recursively over own enumerable properties
	 * - `null` / `undefined` / non-string primitives → returned as-is
	 *
	 * @param value unknown value to trim.
	 * @returns New structure with trimmed strings; original is unchanged.
	 *
	 * @example
	 * const input = { name: '  Alice  ', tags: ['  one', 'two  '] };
	 * const out = DataTypeHelper.trimDeep(input);
	 * // out = { name: 'Alice', tags: ['one', 'two'] }
	 *
	 * @example
	 * DataTypeHelper.trimDeep('  hi  '); // 'hi'
	 */
	public static trimDeep(value: unknown): unknown {
		if (typeof value === 'string') {
			return value.trim();
		}

		if (Array.isArray(value)) {
			return value.map(DataHelper.trimDeep);
		}

		if (typeof value === 'object' && value !== null) {
			return mapValues(value, DataHelper.trimDeep);
		}

		return value;
	}
}
