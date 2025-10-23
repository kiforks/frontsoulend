import { HttpParams } from '@angular/common/http';

import { Nullable } from '@libs/core/interfaces';
import { DataTypeHelper } from '@libs/core/modules';

import { toPairs } from 'lodash';

import { ApiEncoderUtility } from '../../utilities';

export class ApiHelper {
	/**
	 * Converts a nullable object into Angular `HttpParams`, supporting nested structures.
	 *
	 * - Recursively flattens nested objects into key-value pairs.
	 * - Converts `Date` values to ISO strings.
	 * - Replaces `null` with empty string (`''`) unless `clearNull = true`.
	 * - Skips `undefined` values entirely.
	 *
	 * @param data - Object to convert into `HttpParams`.
	 * @param clearNull - Whether to exclude `null` keys (default: `false`).
	 * @returns `HttpParams` with all encoded key/value pairs.
	 *
	 * @example
	 * ```ts
	 * const result = ApiHelper.toHttpParams({
	 *   id: 42,
	 *   details: { created: new Date('2025-10-21T12:00:00Z'), tags: ['one', 'two'] },
	 *   comment: null,
	 * });
	 *
	 * // Resulting params:
	 * // id=42
	 * // details[created]=2025-10-21T12:00:00.000Z
	 * // details[tags][0]=one
	 * // details[tags][1]=two
	 * // comment=
	 *
	 * // If clearNull = true → comment is omitted entirely
	 * ```
	 */
	public static toHttpParams(data: Nullable<object>, clearNull = false): HttpParams {
		const httpParams = new HttpParams({ encoder: new ApiEncoderUtility() });

		if (!data) {
			return httpParams;
		}

		const pairs = toPairs(data).flatMap(([key, value]) => ApiHelper.toKeyValuePairs(key, value, clearNull));

		return pairs.reduce((params, { key, value }) => params.append(key, value), httpParams);
	}

	/**
	 * Recursively converts any data structure into a flat list of `{ key, value }` pairs.
	 *
	 * - Handles primitives, dates, objects, and nested structures.
	 * - Produces fully qualified keys like `filters[age]` or `user[address][city]`.
	 *
	 * @param prefix - Current key prefix (used during recursion).
	 * @param data - Any value (primitive, object, date, null, etc.).
	 * @param clearNull - Whether to skip `null` values entirely.
	 * @returns Array of `{ key: string, value: string }` pairs.
	 */
	private static toKeyValuePairs(
		prefix: string,
		data: unknown,
		clearNull = false
	): Array<{ key: string; value: string }> {
		// eslint-disable-next-line no-undefined
		if (data === undefined) {
			return [];
		}

		if (data === null) {
			return clearNull ? [] : [{ key: prefix, value: '' }];
		}

		if (data instanceof Date) {
			return [{ key: prefix, value: data.toISOString() }];
		}

		if (DataTypeHelper.isPrimitive(data)) {
			return [{ key: prefix, value: String(data) }];
		}

		if (typeof data !== 'object') {
			return [];
		}

		return toPairs(data).flatMap(([key, value]) => ApiHelper.toKeyValuePairs(`${prefix}[${key}]`, value, clearNull));
	}
}
