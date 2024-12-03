/**
 * Decorator for automatically binding class methods to their instance.
 *
 * Example:
 * ```typescript
 * class ExampleClass {
 *   @Bind public method(): void {
 *     console.log(this instanceof Example); // true
 *   }
 * }
 *
 * const instance = new ExampleClass();
 * const boundMethod = instance.method;
 * boundMethod(); // logs: true
 * ```
 *
 * Source:
 * @see https://github.com/NoHomey/bind-decorator
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function Bind<T extends Function>(
	_target: unknown,
	propertyKey: string,
	descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
	if (!descriptor || typeof descriptor.value !== 'function') {
		throw new TypeError(`Only methods can be decorated with @bind. <${propertyKey}> is not a method!`);
	}

	return {
		configurable: true,
		get(this: T): T {
			const bound: T = descriptor.value?.bind(this);

			Object.defineProperty(this, propertyKey, {
				value: bound,
				configurable: true,
				writable: true,
			});

			return bound;
		},
	};
}
