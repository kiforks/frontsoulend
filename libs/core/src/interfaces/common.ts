import { IntRange, Opaque } from './utils';

/**
 * Represents an IP address as a unique string type.
 *
 * @example
 * // Valid example
 * const validIpAddress: Ip = "127.0.0.1" as Ip;
 *
 * // Invalid example
 * const invalidIpAddress: Ip = "999.999.999.999" as Ip; // Invalid IP address
 */
export type Ip = Opaque<'Ip', string>;

/**
 * Represents a URL string as a unique type.
 *
 * @example
 * // Valid example
 * const validUrl: Url = "https://example.com" as Url;
 *
 * // Invalid example
 * const invalidUrl: Url = "invalid_url" as Url; // Not a proper URL
 */
export type Url = Opaque<'Url', string>;

/**
 * Represents a string containing valid HTML content.
 *
 * @example
 * // Valid example
 * const validHtmlContent: HTMLString = "<div>Some content</div>" as HTMLString;
 *
 * // Invalid example
 * const invalidHtmlContent: HTMLString = "plain text content" as HTMLString; // Not valid HTML
 */
export type HTMLString = Opaque<'HTMLString', string>;

/**
 * Represents a string containing valid JSON content.
 *
 * @example
 * // Valid example
 * const validJsonContent: JSONString = '{"key": "value"}' as JSONString;
 *
 * // Invalid example
 * const invalidJsonContent: JSONString = "key: value" as JSONString; // Not valid JSON
 */
export type JSONString = Opaque<'JSONString', string>;

/**
 * Represents a day of the month as an integer range from 1 to 31.
 *
 * @example
 * // Valid examples
 * const validDay1: DayNumber = 15;
 * const validDay2: DayNumber = 1;
 * const validDay3: DayNumber = 31;
 *
 * // Invalid examples
 * const invalidDay1: DayNumber = 32; // Outside the range
 * const invalidDay2: DayNumber = 0;  // Outside the range
 */
export type DayNumber = IntRange<1, 32>;

/**
 * Represents a month of the year as an integer range from 1 to 12.
 *
 * @example
 * // Valid examples
 * const validMonth1: MonthNumber = 7;  // July
 * const validMonth2: MonthNumber = 1;  // January
 * const validMonth3: MonthNumber = 12; // December
 *
 * // Invalid examples
 * const invalidMonth1: MonthNumber = 0;  // Outside the range
 * const invalidMonth2: MonthNumber = 13; // Outside the range
 */
export type MonthNumber = IntRange<1, 13>;

export type ID = number | string;
export type BooleanNumber = 0 | 1;

export type Position = 'bottom' | 'left' | 'right' | 'top';
export type Size = 'lg' | 'md' | 'sm' | 'xs';
export type Color = 'danger' | 'default' | 'info' | 'master' | 'neutral' | 'primary' | 'warning';
export type Breakpoint = 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'xxl';
