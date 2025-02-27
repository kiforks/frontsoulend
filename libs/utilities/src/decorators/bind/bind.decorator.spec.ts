import { Bind } from './bind.decorator';

class TestClass {
	public value: string;

	constructor(value: string) {
		this.value = value;
	}

	@Bind
	public getValue(): string {
		return this.value;
	}
}

describe('BindDecorator', () => {
	it('should bind the method to the instance', () => {
		const instance = new TestClass('test');
		// eslint-disable-next-line @typescript-eslint/unbound-method
		const { getValue } = instance;

		expect(getValue()).toBe('test');
	});

	it('should not lose context when method is passed as a callback', () => {
		const instance = new TestClass('callback-test');
		// eslint-disable-next-line @typescript-eslint/unbound-method
		const callback = instance.getValue;

		expect(callback()).toBe('callback-test');
	});

	it('should throw error if decorator is used on non-method property', () => {
		expect(() => {
			class InvalidClass {
				// @ts-expect-error: Testing invalid usage of decorator
				@Bind
				public get value() {
					return this.invalidValue;
				}

				private invalidValue = 'invalid';
			}

			// eslint-disable-next-line no-new
			new InvalidClass();
		}).toThrowError(new TypeError('Only methods can be decorated with @bind. <value> is not a method!'));
	});

	it('should cache the bound method to avoid re-binding on every call', () => {
		const instance = new TestClass('cache-test');
		// eslint-disable-next-line @typescript-eslint/unbound-method
		const firstCall = instance.getValue;
		// eslint-disable-next-line @typescript-eslint/unbound-method
		const secondCall = instance.getValue;

		expect(firstCall).toBe(secondCall);
	});

	it('should work correctly when method is called multiple times', () => {
		const instance = new TestClass('multi-call');

		expect(instance.getValue()).toBe('multi-call');
		expect(instance.getValue()).toBe('multi-call');
	});
});
