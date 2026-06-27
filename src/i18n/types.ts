/**
 * Core i18n primitives, kept dependency-free so both `@/constants/theme` and
 * `@/data/*` can import them without import cycles.
 */

/** Supported app languages. */
export type Lang = 'de' | 'en';

/** A value that exists in every supported language. */
export type Localized<T = string> = { de: T; en: T };
