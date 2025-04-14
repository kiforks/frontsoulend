import { StorybookConfig } from '../../configs';

export abstract class StorybookUtils {
	public static getCompositionUrl(url: string, isDevelopment: boolean): string {
		if (isDevelopment) {
			return `${StorybookConfig.CompositionDevUrl}${url}`;
		}

		return `${StorybookConfig.CompositionProdUrl}${url}`;
	}
}
