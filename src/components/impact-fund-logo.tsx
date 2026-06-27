/**
 * ImpactFund: the brand mark (Direction 03 "Signal").
 * ------------------------------------------------------------------
 * An abstract lowercase "i": the dot is the person + their impact, the
 * bar is the foundation. Calm, premium, scales down to a 16px favicon.
 *
 * Brand colours are FIXED constants here, on purpose. The mark is the one
 * place in the app that does NOT follow the light/dark theme: it always reads
 * as the same identity. Pick a `variant` for the surface it sits on instead.
 *   navy #123250 · green #37C391 · light #EAF2F1
 *
 * Geometry is the handoff's single source of truth (viewBox 0 0 100):
 *   bar  rect x42 y40 w16 h46 rx8   ·   dot  circle cx50 cy22 r10
 * Rendered with plain Views (no react-native-svg dependency): a fully-rounded
 * bar (radius = half its width) plus a circle is pixel-identical to the SVG.
 *
 * Usage:
 *   <ImpactFundMark size={40} />                      // symbol only (icon, splash, tab)
 *   <ImpactFundLogo height={28} />                    // lockup, light surface
 *   <ImpactFundLogo height={28} variant="onDark" />   // lockup on a navy surface
 *   <ImpactFundWordmark size={30} />                  // wordmark only
 */

import { StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { FontFamily } from '@/constants/theme';

export type LogoVariant = 'primary' | 'mono' | 'onDark' | 'negative';

const FILLS: Record<LogoVariant, { bar: string; dot: string; word: string }> = {
  primary: { bar: '#123250', dot: '#37C391', word: '#123250' }, // navy + green on light
  mono: { bar: '#123250', dot: '#123250', word: '#123250' }, //     single-colour navy
  onDark: { bar: '#EAF2F1', dot: '#37C391', word: '#EAF2F1' }, //    on a navy surface
  negative: { bar: '#FFFFFF', dot: '#FFFFFF', word: '#FFFFFF' }, //  knockout on colour/photo
};

/** Symbol only: app icon, splash, avatar, tab bar. `size` = the square edge. */
export function ImpactFundMark({
  size = 40,
  variant = 'primary',
  style,
}: {
  size?: number;
  variant?: LogoVariant;
  style?: StyleProp<ViewStyle>;
}) {
  const { bar, dot } = FILLS[variant];
  const s = size / 100; // handoff geometry lives in a 0..100 box
  return (
    <View style={[{ width: size, height: size }, style]}>
      {/* bar: x42 y40 w16 h46 rx8 (rx = half width, so the ends are fully round) */}
      <View
        style={{
          position: 'absolute',
          left: 42 * s,
          top: 40 * s,
          width: 16 * s,
          height: 46 * s,
          borderRadius: 8 * s,
          backgroundColor: bar,
        }}
      />
      {/* dot: cx50 cy22 r10 -> a 20x20 circle whose top-left is (40, 12) */}
      <View
        style={{
          position: 'absolute',
          left: 40 * s,
          top: 12 * s,
          width: 20 * s,
          height: 20 * s,
          borderRadius: 10 * s,
          backgroundColor: dot,
        }}
      />
    </View>
  );
}

/** Wordmark only: "Impact" ExtraBold + "Fund" Medium, one ink colour. */
export function ImpactFundWordmark({
  size = 30,
  variant = 'primary',
  style,
}: {
  size?: number;
  variant?: LogoVariant;
  style?: StyleProp<TextStyle>;
}) {
  const { word } = FILLS[variant];
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.word,
        // -0.7 at 30px in the handoff, kept proportional (~ -0.023em)
        { fontSize: size, color: word, letterSpacing: -0.0233 * size, lineHeight: size * 1.06 },
        style,
      ]}>
      {/* Raw <Text> does not auto-map weight -> set the family explicitly. */}
      <Text style={{ fontFamily: FontFamily.extrabold }}>Impact</Text>
      <Text style={{ fontFamily: FontFamily.medium }}>Fund</Text>
    </Text>
  );
}

/** Horizontal lockup: symbol + wordmark. `height` sizes the wordmark. */
export function ImpactFundLogo({
  height = 30,
  variant = 'primary',
  style,
}: {
  height?: number;
  variant?: LogoVariant;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.row, style]}>
      <ImpactFundMark size={height * 1.34} variant={variant} />
      <ImpactFundWordmark size={height} variant={variant} style={{ marginLeft: height * 0.42 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  word: { includeFontPadding: false },
});
