/**
 * ImpactFund — Logo (Direction 03 "Signal")
 * ------------------------------------------------------------------
 * An abstract lowercase "i": the dot is the person + their impact,
 * the bar is the foundation. Calm, premium, scales to a 16px favicon.
 *
 * Brand colours are FIXED constants — do not theme / dark-mode these:
 *   navy   #123250   green  #37C391   light  #EAF2F1
 *
 * Requires: react-native-svg, and Hanken Grotesk already loaded by
 * your root layout (FontFamily tokens from your theme file).
 *
 * Usage:
 *   <ImpactFundLogo height={28} />                 // lockup, light bg
 *   <ImpactFundLogo height={28} variant="onDark" />// lockup on navy
 *   <ImpactFundMark size={40} />                   // symbol only (icon/avatar)
 */

import React from 'react';
import { View, Text, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';

// ↓ adjust this path to wherever your FontFamily tokens live
import { FontFamily } from '@/global';

export type LogoVariant = 'primary' | 'mono' | 'onDark' | 'negative';

const FILLS: Record<LogoVariant, { bar: string; dot: string; word: string }> = {
  primary: { bar: '#123250', dot: '#37C391', word: '#123250' }, // navy + green on light
  mono: { bar: '#123250', dot: '#123250', word: '#123250' }, //   single-colour navy (print/engrave)
  onDark: { bar: '#EAF2F1', dot: '#37C391', word: '#EAF2F1' }, //  on navy surface
  negative: { bar: '#FFFFFF', dot: '#FFFFFF', word: '#FFFFFF' }, // knockout on colour/photo
};

/** Symbol only — app icon, avatar, favicon, tab bar. */
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
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Rect x={42} y={40} width={16} height={46} rx={8} fill={bar} />
        <Circle cx={50} cy={22} r={10} fill={dot} />
      </Svg>
    </View>
  );
}

/** Horizontal lockup — symbol + "ImpactFund" wordmark. `height` = wordmark size. */
export function ImpactFundLogo({
  height = 30,
  variant = 'primary',
  style,
}: {
  height?: number;
  variant?: LogoVariant;
  style?: StyleProp<ViewStyle>;
}) {
  const { word } = FILLS[variant];
  return (
    <View style={[styles.row, style]}>
      <ImpactFundMark size={height * 1.34} variant={variant} />
      <Text
        style={[styles.word, { fontSize: height, color: word, marginLeft: height * 0.42 }]}
        allowFontScaling={false}
      >
        <Text style={{ fontFamily: FontFamily.extrabold }}>Impact</Text>
        <Text style={{ fontFamily: FontFamily.medium }}>Fund</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  word: { letterSpacing: -0.7, includeFontPadding: false },
});
