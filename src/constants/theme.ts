/**
 * Mosaik: Design System (v2)
 *
 * A calm, premium, grown-up language anchored on the real LBBW brand colours,
 * pulled from lbbw.de: deep navy #123250 (structure, ink, weight) and the
 * signal green #37C391 (action, growth, confirmation). Navy carries the
 * seriousness and trust; green is the single accent, used sparingly. Lots of
 * quiet whitespace, a modern grotesk, and restrained motion. No serif, no
 * gold, no warm-craft beige, no glassmorphism, no purple.
 *
 * "LBBW, but for a new, younger generation."
 */

import '@/global.css';

import { Platform } from 'react-native';

import type { Localized } from '@/i18n/types';

/* ----------------------------------------------------------------- colours */
/*
 * Brand anchors (verified from LBBW's production stylesheet):
 *   navy   #123250   primary brand / ink / dark surfaces
 *   green  #37C391   signal accent (with navy text on it, the LBBW pairing)
 *   deep   #237B5C   pressed / green text
 * Neutrals are cool greys derived from the navy so the whole app reads as one
 * family. Dark mode is navy-derived, never pure black.
 *
 * Token roles are stable across the app:
 *   brand*    -> signal green (action, success, selection, progress)
 *   gold*     -> navy accent (premium emphasis; legacy key name, navy values)
 *   feature*  -> navy hero/feature surface + its near-white on-colour
 */

export const Colors = {
  light: {
    bg: '#F5F7F6', // calm cool near-white
    surface: '#FFFFFF',
    surfaceAlt: '#EEF2F1',
    surfaceSunken: '#E4EAE9',
    ink: '#11293D', // deep navy text
    inkSecondary: '#4F6678',
    inkTertiary: '#8597A4',
    line: '#E3E8E9',
    lineStrong: '#D0D9DA',

    brand: '#37C391', // LBBW signal green
    brandPressed: '#237B5C', // LBBW deep green
    brandSoft: '#E2F3EB',
    brandInk: '#1A7553', // green text/icon, AA on light
    onBrand: '#0C2233', // navy on green, the LBBW pairing

    // legacy `gold*` slot, repurposed as the navy emphasis accent
    gold: '#123250',
    goldSoft: '#E5EAEF',
    goldInk: '#123250',

    danger: '#C2392C',
    dangerSoft: '#F7E5E2',

    overlay: 'rgba(11,26,38,0.5)',
    shadow: '#0E2436',

    feature: '#123250', // navy hero surface
    onFeature: '#EAF2F1',
    onFeatureDim: 'rgba(234,242,241,0.66)',
  },
  dark: {
    bg: '#0A1822',
    surface: '#102230',
    surfaceAlt: '#152C3B',
    surfaceSunken: '#071019',
    ink: '#E9F1F1',
    inkSecondary: '#9DB1BD',
    inkTertiary: '#647A86',
    line: '#1E3543',
    lineStrong: '#2C4757',

    brand: '#3FCE99',
    brandPressed: '#2FA87C',
    brandSoft: '#0F3326',
    brandInk: '#54D6A6',
    onBrand: '#07201A',

    gold: '#6E9AC0', // steel-blue navy accent, visible on dark
    goldSoft: '#16303F',
    goldInk: '#9CC0DC',

    danger: '#E8847A',
    dangerSoft: '#2E1614',

    overlay: 'rgba(0,0,0,0.6)',
    shadow: '#000000',

    feature: '#16313F',
    onFeature: '#EAF2F1',
    onFeatureDim: 'rgba(234,242,241,0.62)',
  },
} as const;

export type ThemeColors = { [K in keyof typeof Colors.light]: string };
export type ColorScheme = keyof typeof Colors;

/* -------------------------------------------------------------- categories */
/*
 * Impact themes. Deliberately desaturated and harmonised so seven categories
 * read as one quiet tonal family next to the navy/green brand, not a rainbow.
 * No bright lila; `kultur` is a muted plum-grey.
 */

export type CategoryKey =
  | 'bildung'
  | 'umwelt'
  | 'soziales'
  | 'tierschutz'
  | 'sport'
  | 'kultur'
  | 'gesundheit';

type CategoryDef = {
  key: CategoryKey;
  label: Localized;
  /** Editorial one-liner used in the quiz / profile. */
  blurb: Localized;
  /** Muted accent colour for the tile. */
  color: string;
  /** Soft tint backgrounds (light / dark). */
  tint: { light: string; dark: string };
  /** SF Symbol name (expo-symbols), with a sensible fallback elsewhere. */
  symbol: string;
};

export const Categories: Record<CategoryKey, CategoryDef> = {
  bildung: {
    key: 'bildung',
    label: { de: 'Bildung', en: 'Education' },
    blurb: { de: 'Chancen, die bleiben', en: 'Opportunities that last' },
    color: '#42618E',
    tint: { light: '#E9EDF4', dark: '#16212F' },
    symbol: 'book.closed.fill',
  },
  umwelt: {
    key: 'umwelt',
    label: { de: 'Umwelt', en: 'Environment' },
    blurb: { de: 'Eine Welt, die trägt', en: 'A world that endures' },
    color: '#2E6E51',
    tint: { light: '#E4EEE8', dark: '#12271D' },
    symbol: 'leaf.fill',
  },
  soziales: {
    key: 'soziales',
    label: { de: 'Soziales', en: 'Community' },
    blurb: { de: 'Niemand fällt durch', en: 'No one falls through' },
    color: '#B0654C',
    tint: { light: '#F4E9E3', dark: '#2A1A13' },
    symbol: 'hands.sparkles.fill',
  },
  tierschutz: {
    key: 'tierschutz',
    label: { de: 'Tierschutz', en: 'Animal welfare' },
    blurb: { de: 'Schutz für die Stillen', en: 'Protection for the voiceless' },
    color: '#997C45',
    tint: { light: '#F0EADB', dark: '#231E12' },
    symbol: 'pawprint.fill',
  },
  sport: {
    key: 'sport',
    label: { de: 'Sport & Jugend', en: 'Sport & Youth' },
    blurb: { de: 'Halt durch Bewegung', en: 'Stability through movement' },
    color: '#BB6A42',
    tint: { light: '#F4E8DF', dark: '#291A12' },
    symbol: 'figure.run',
  },
  kultur: {
    key: 'kultur',
    label: { de: 'Kultur', en: 'Culture' },
    blurb: { de: 'Was uns verbindet', en: 'What connects us' },
    color: '#6C5673',
    tint: { light: '#ECE7EE', dark: '#211B25' },
    symbol: 'theatermasks.fill',
  },
  gesundheit: {
    key: 'gesundheit',
    label: { de: 'Gesundheit', en: 'Health' },
    blurb: { de: 'Würde bis zuletzt', en: 'Dignity to the last' },
    color: '#327E7B',
    tint: { light: '#E1EFEE', dark: '#102827' },
    symbol: 'heart.fill',
  },
};

export const CategoryList = Object.values(Categories);

export function categoryTint(key: CategoryKey, scheme: ColorScheme) {
  return Categories[key].tint[scheme];
}

/* ------------------------------------------------------------------ layout */

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 28,
  xxl: 40,
  xxxl: 64,
} as const;

export const Radius = {
  sm: 12,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const MaxContentWidth = 720;
export const BottomTabHeight = Platform.select({ ios: 88, android: 76, default: 76 });

/* --------------------------------------------------------------- typography */
/*
 * One family, Hanken Grotesk, across the whole app. Weights are addressed by
 * their loaded family name (custom fonts don't synthesise weight reliably on
 * Android), so Type tokens set fontFamily, not fontWeight.
 */

export const FontFamily = {
  regular: 'HankenGrotesk_400Regular',
  medium: 'HankenGrotesk_500Medium',
  semibold: 'HankenGrotesk_600SemiBold',
  bold: 'HankenGrotesk_700Bold',
  extrabold: 'HankenGrotesk_800ExtraBold',
} as const;

/** Loaded by useFonts() in the root layout. */
export const FontMap = {
  HankenGrotesk_400Regular: require('@expo-google-fonts/hanken-grotesk/400Regular/HankenGrotesk_400Regular.ttf'),
  HankenGrotesk_500Medium: require('@expo-google-fonts/hanken-grotesk/500Medium/HankenGrotesk_500Medium.ttf'),
  HankenGrotesk_600SemiBold: require('@expo-google-fonts/hanken-grotesk/600SemiBold/HankenGrotesk_600SemiBold.ttf'),
  HankenGrotesk_700Bold: require('@expo-google-fonts/hanken-grotesk/700Bold/HankenGrotesk_700Bold.ttf'),
  HankenGrotesk_800ExtraBold: require('@expo-google-fonts/hanken-grotesk/800ExtraBold/HankenGrotesk_800ExtraBold.ttf'),
} as const;

/** Kept for compatibility; serif intentionally maps to the grotesk now. */
export const Fonts = {
  sans: FontFamily.regular,
  serif: FontFamily.bold,
  rounded: FontFamily.semibold,
  mono: Platform.select({ ios: 'ui-monospace', android: 'monospace', default: 'ui-monospace' })!,
};

type TypeStyle = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight?: '300' | '400' | '500' | '600' | '700' | '800' | 'normal' | 'bold';
  letterSpacing?: number;
  textTransform?: 'uppercase' | 'none';
};

export const Type = {
  /** Big, calm headline / large numbers. */
  display: { fontFamily: FontFamily.extrabold, fontSize: 38, lineHeight: 43, letterSpacing: -1.1 },
  displaySm: { fontFamily: FontFamily.bold, fontSize: 28, lineHeight: 33, letterSpacing: -0.6 },
  /** Section / screen titles. */
  title: { fontFamily: FontFamily.bold, fontSize: 23, lineHeight: 29, letterSpacing: -0.5 },
  headline: { fontFamily: FontFamily.semibold, fontSize: 18.5, lineHeight: 24, letterSpacing: -0.3 },
  subtitle: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22, letterSpacing: -0.1 },
  body: { fontFamily: FontFamily.regular, fontSize: 15.5, lineHeight: 24 },
  bodyStrong: { fontFamily: FontFamily.semibold, fontSize: 15.5, lineHeight: 24, letterSpacing: -0.1 },
  callout: { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 20 },
  small: { fontFamily: FontFamily.medium, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: FontFamily.medium, fontSize: 12, lineHeight: 16 },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 11.5,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  mono: { fontFamily: Fonts.mono, fontSize: 13, lineHeight: 18 },
} satisfies Record<string, TypeStyle>;

export type TypeVariant = keyof typeof Type;

/* ------------------------------------------------------------------ motion */

export const Motion = {
  fast: 160,
  base: 240,
  slow: 420,
} as const;

/** Calm, premium easing: quick out, soft settle. No bounce. */
export const Ease = [0.16, 1, 0.3, 1] as const;

/** Soft, navy-tinted elevation. Light mode stays barely-there. */
export function shadow(scheme: ColorScheme, level: 1 | 2 | 3 = 1) {
  const opacity = scheme === 'dark' ? [0.42, 0.5, 0.58][level - 1] : [0.05, 0.08, 0.12][level - 1];
  const radius = [12, 24, 40][level - 1];
  const y = [3, 12, 22][level - 1];
  return {
    shadowColor: Colors[scheme].shadow,
    shadowOpacity: opacity,
    shadowRadius: radius,
    shadowOffset: { width: 0, height: y },
    elevation: level * 3,
  };
}
