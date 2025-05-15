import { MediaHelper } from './media.helper';

describe('MediaHelper', () => {
	it('should returns a "media-max" query string for maximum width', () => {
		const result = MediaHelper.getMaxWidth(100);

		expect(result).toBe('(max-width: 99.98px)');
	});

	it('should returns a "media-min" query string for minimum width', () => {
		const result = MediaHelper.getMinWidth(100);

		expect(result).toBe('(min-width: 100px)');
	});
});
