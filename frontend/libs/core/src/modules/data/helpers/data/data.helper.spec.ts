import { DataHelper } from './data.helper';

describe(DataHelper, () => {
	describe('trimDeep', () => {
		it('should return trimmed string', () => {
			expect(DataHelper.trimDeep('  hi\t')).toBe('hi');
			expect(DataHelper.trimDeep('\nhello  ')).toBe('hello');
		});

		it('should leave non-string primitives unchanged', () => {
			const numberValue = 42;
			const booleanValue = false;
			const bigintValue = 10n;
			const symbolValue = Symbol('x');

			expect(DataHelper.trimDeep(numberValue)).toBe(42);
			expect(DataHelper.trimDeep(booleanValue)).toBe(false);
			expect(DataHelper.trimDeep(bigintValue)).toBe(10n);
			expect(DataHelper.trimDeep(symbolValue)).toBe(symbolValue);
		});

		it('should return null and undefined unchanged', () => {
			expect(DataHelper.trimDeep(null)).toBeNull();
			// eslint-disable-next-line no-undefined
			expect(DataHelper.trimDeep(undefined)).toBeUndefined();
		});

		it('should deeply trim arrays', () => {
			const inputArray: ReadonlyArray<boolean | number | string> = [' a ', 'b  ', 1, true];
			const outputArray = DataHelper.trimDeep(inputArray);

			expect(outputArray).toStrictEqual(['a', 'b', 1, true]);
			expect(outputArray).not.toBe(inputArray);
		});

		it('should deeply trim nested objects', () => {
			const inputObject = {
				meta: {
					flags: { count: 0, isActive: true, label: ' x ' },
					title: '  Developer ',
				},
				name: '  Alice  ',
				tags: [' one', 'two  ', '  three '],
			};

			const outputObject = DataHelper.trimDeep(inputObject) as {
				meta: { flags: { count: number; isActive: boolean; label: string }; title: string };
				name: string;
				tags: string[];
			};

			expect(outputObject).toStrictEqual({
				meta: {
					flags: { count: 0, isActive: true, label: 'x' },
					title: 'Developer',
				},
				name: 'Alice',
				tags: ['one', 'two', 'three'],
			});

			expect(outputObject).not.toBe(inputObject);
			expect(outputObject.meta).not.toBe(inputObject.meta);
			expect(outputObject.meta.flags).not.toBe(inputObject.meta.flags);
			expect(outputObject.tags).not.toBe(inputObject.tags);
		});

		it('should not mutate the original inputs', () => {
			const sourceObject = {
				arrayField: [' z '],
				nestedField: { valueField: ' y  ' },
				rootField: '  x ',
			};

			const snapshot = JSON.parse(JSON.stringify(sourceObject));
			const result = DataHelper.trimDeep(sourceObject);

			expect(sourceObject).toStrictEqual(snapshot);
			expect(result).not.toBe(sourceObject);
		});

		it('should process only own enumerable object properties', () => {
			const prototypeSource: { inheritedField: string } = { inheritedField: '  ignore  ' };
			const inputObject = Object.create(prototypeSource);

			inputObject.ownField = '  keep  ';

			const outputObject = DataHelper.trimDeep(inputObject) as { ownField: string };

			expect(outputObject).toStrictEqual({ ownField: 'keep' });
			expect(Object.hasOwn(outputObject, 'inheritedField')).toBe(false);
		});

		it('should trim strings inside arrays of objects and objects of arrays', () => {
			const inputObject = {
				list: [{ value: ' a ' }, { value: 'b  ' }],
				map: { items: [' y ', 'z  '] },
			};

			const outputObject = DataHelper.trimDeep(inputObject);

			expect(outputObject).toStrictEqual({
				list: [{ value: 'a' }, { value: 'b' }],
				map: { items: ['y', 'z'] },
			});
		});

		it('should return empty structures unchanged by identity type but with new references', () => {
			const emptyObject: Record<string, never> = {};
			const emptyArray: never[] = [];

			const trimmedObject = DataHelper.trimDeep(emptyObject);
			const trimmedArray = DataHelper.trimDeep(emptyArray);

			expect(trimmedObject).toStrictEqual({});
			expect(trimmedArray).toStrictEqual([]);
			expect(trimmedObject).not.toBe(emptyObject);
			expect(trimmedArray).not.toBe(emptyArray);
		});
	});
});
