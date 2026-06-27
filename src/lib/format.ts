import type { Lang } from '@/i18n/types';

/** "1250" -> "1.250" (de) / "1,250" (en) thousands grouping, without Intl. */
export function groupThousands(n: number, lang: Lang = 'de'): string {
  const sign = n < 0 ? '-' : '';
  const s = Math.abs(Math.round(n)).toString();
  const sep = lang === 'en' ? ',' : '.';
  return sign + s.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

/** "1.250 €" (de) / "€1,250" (en). EUR stays the currency (LBBW context). */
export function euro(n: number, lang: Lang = 'de'): string {
  return lang === 'en' ? `€${groupThousands(n, 'en')}` : `${groupThousands(n, 'de')} €`;
}

/** "x = n × unit", choosing singular/plural form (already-localized strings). */
export function impactUnits(amount: number, per: number, unit: string, unitPlural: string) {
  const count = Math.max(1, Math.floor(amount / per));
  return { count, label: count === 1 ? unit : unitPlural };
}
