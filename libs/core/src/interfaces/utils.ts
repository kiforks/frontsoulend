export type Nullable<T> = T | null | undefined;
export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
export type NonUndefined<T> = T extends undefined ? never : T;

/**
 * The utility function Opaque<K, T> simply defines a new type that,
 * aside from a variable’s value, also stores a (unique) key.
 *
 * This then allows TypeScript to differentiate between different types,
 * even though all still store plain K type and do not change the compiler’s output.
 *
 * @example
 * const trackLogin = (currentDate: DateISOString, sessionId: Uuid) => { someCode(); }
 *
 * const sessionUuid = currentSession.getUuid() as Uuid;
 * const currentDate = new Date().toISOString() as DateISOString;
 *
 * trackLogin(sessionUuid, currentDate); // TypeScript will now understand this function call and show an error
 */
export type Opaque<K, T> = T & { __TYPE__: K };

/**
 * The utility function IntRange<F, T> simply defines a new type
 * that is a range of int numbers from F to T
 *
 * @example
 * type MonthNumber = IntRange<1, 13>; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
 *
 * @see https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range/70307091#70307091
 */
export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc['length']]>;

/**
 * Replaces a property in an object type with a new property of a different name.
 * @typeparam T The original object type.
 * @typeparam K1 The key of the property to be replaced.
 * @typeparam K2 The key of the new property.
 * @example
 * interface Example {
 *   name: string;
 *   age: number;
 * }
 *
 * type ModifiedExample = Replace<Example, 'name', 'fullName'>;
 * // Result: { fullName: string; age: number; }
 */
export type Replace<T, K1 extends keyof T, K2 extends string> = Omit<T, K1> & { [key in K2]: T[K1] };

/**
 * Represents a partially optional version of an object type where each property is recursively marked as optional.
 * @typeparam T The type for which to create a deep partial version.
 * @example
 * interface Example {
 *   name: string;
 *   nested: {
 *     value: number;
 *   };
 * }
 *
 * type PartialExample = DeepPartial<Example>;
 * // Result: { name?: string; nested?: { value?: number | null | undefined; } | null | undefined; } | null | undefined
 */
export type DeepPartial<T> = {
	[P in keyof T]?: Nullable<DeepPartial<T[P]>>;
};

/**
 * Represents a partially optional version of an object type where each property is nullable.
 * @typeparam T The type for which to create a nullable partial version.
 * @example
 * interface Example {
 *   name: string;
 *   age: number;
 * }
 *
 * type PartialExample = NullablePartial<Example>;
 * // Result: { name?: string | null | undefined; age?: number | null | undefined; } | null | undefined
 */
export type NullablePartial<T> = {
	[P in keyof T]?: Nullable<T[P]>;
};

/**
 * Represents a version of an object type where each property is required and cannot be null or undefined.
 * @typeparam T The type for which to create a required and non-nullable version.
 * @example
 * interface Example {
 *   name?: string | null;
 *   age?: number | null;
 * }
 *
 * type RequiredExample = RequiredNotNullable<Example>;
 * // Result: { name: string; age: number; }
 */
export type RequiredNotNullable<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};
