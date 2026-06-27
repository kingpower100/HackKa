/**
 * Language hooks: mirror of `use-theme.ts`. The active language lives in the
 * app store; `useTr()` hands back a bound resolver so components never thread
 * `lang` around manually. It works for both editorial `Localized` content
 * (projects, quiz, …) and inline UI chrome written as `tr({ de, en })`.
 */

import { useStore } from '@/store/app-store';
import { tr } from '@/i18n/translate';
import type { Lang, Localized } from '@/i18n/types';

/** The active language. */
export function useLanguage(): Lang {
  return useStore().state.language;
}

/** Bound resolver: `tr({ de, en })` or `tr(project.name)` → active-language value. */
export function useTr(): <T>(value: Localized<T>) => T {
  const lang = useLanguage();
  return (value) => tr(value, lang);
}
