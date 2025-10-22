import { ApiEncoderUtility } from './api-encoder.utility';

describe(ApiEncoderUtility, () => {
	const codec = new ApiEncoderUtility();

	it('should encode keys exactly like encodeURIComponent', () => {
		const rawKey = 'space + plus & and = equals ? query / slash : colon Hi 🌍';
		const expected = encodeURIComponent(rawKey);
		const actual = codec.encodeKey(rawKey);

		expect(actual).toBe(expected);
	});

	it('should encode values exactly like encodeURIComponent', () => {
		const rawValue = 'a b+c&d=e?f/g:Hi🌍%';
		const expected = encodeURIComponent(rawValue);
		const actual = codec.encodeValue(rawValue);

		expect(actual).toBe(expected);
	});

	it('should decode keys exactly like decodeURIComponent', () => {
		const encodedKey = 'a%20b%2Bc%26d%3De%3Ff%2Fg%3A%D0%9F%D1%80%D0%B8%D0%B2%D1%96%D1%82%F0%9F%8C%8D%25';
		const expected = decodeURIComponent(encodedKey);
		const actual = codec.decodeKey(encodedKey);

		expect(actual).toBe(expected);
	});

	it('should decode values exactly like decodeURIComponent', () => {
		const encodedValue = '%E2%9C%93%20ok%20%2B%20plus%20%26%20amp%20%3D%20eq%20%3F%20q%20%2F%20s%20%3A%20c%25';
		const expected = decodeURIComponent(encodedValue);
		const actual = codec.decodeValue(encodedValue);

		expect(actual).toBe(expected);
	});

	it('should round-trip encode/decode for arbitrary text (key)', () => {
		const original = 'Key: !@#$%^&*()[]{}|;\'",.<>`~';
		const encoded = codec.encodeKey(original);
		const decoded = codec.decodeKey(encoded);

		expect(decoded).toBe(original);
	});

	it('should round-trip encode/decode for arbitrary text (value)', () => {
		const original = 'Value 100% safe → test 😊 / ? & = + %';
		const encoded = codec.encodeValue(original);
		const decoded = codec.decodeValue(encoded);

		expect(decoded).toBe(original);
	});

	it('should handle empty strings', () => {
		expect(codec.encodeKey('')).toBe('');
		expect(codec.encodeValue('')).toBe('');
		expect(codec.decodeKey('')).toBe('');
		expect(codec.decodeValue('')).toBe('');
	});

	it('should encode percent signs and not lose information', () => {
		const original = '%';
		const encodedKey = codec.encodeKey(original);
		const encodedValue = codec.encodeValue(original);

		expect(encodedKey).toBe('%25');
		expect(encodedValue).toBe('%25');
		expect(codec.decodeKey(encodedKey)).toBe('%');
		expect(codec.decodeValue(encodedValue)).toBe('%');
	});

	it('should "double-encode" already encoded sequences consistently (by design of encodeURIComponent)', () => {
		const alreadyEncoded = 'a%20b';
		const encodedKey = codec.encodeKey(alreadyEncoded);
		const encodedValue = codec.encodeValue(alreadyEncoded);

		expect(encodedKey).toBe('a%2520b');
		expect(encodedValue).toBe('a%2520b');
		expect(codec.decodeKey(codec.decodeKey(encodedKey))).toBe('a b');
		expect(codec.decodeValue(codec.decodeValue(encodedValue))).toBe('a b');
	});

	it('should throw URIError on malformed percent-encoding (decodeKey)', () => {
		const malformed = '%';

		expect(() => codec.decodeKey(malformed)).toThrow(URIError);
	});

	it('should throw URIError on malformed percent-encoding (decodeValue)', () => {
		const malformed = '%E0%A4';

		expect(() => codec.decodeValue(malformed)).toThrow(URIError);
	});
});
