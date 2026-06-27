/**
 * Pure translation helpers (no React) so data-layer builders
 * (`buildImpactMoment`, `buildAgentFeed`, …) can resolve copy too.
 */

import type { Lang, Localized } from './types';

/** Resolve a localized value to the active language. */
export function tr<T>(value: Localized<T>, lang: Lang): T {
  return value[lang];
}

/** Pick singular/plural form for a count, per language. */
export function plural(
  lang: Lang,
  n: number,
  forms: Localized<[one: string, other: string]>
): string {
  const [one, other] = forms[lang];
  return n === 1 ? one : other;
}
