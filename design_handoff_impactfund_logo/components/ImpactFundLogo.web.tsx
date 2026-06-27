/**
 * Web / React (DOM) version — plain inline SVG, no dependencies.
 * Use this if part of your stack renders to the DOM (Next.js, react-dom).
 * React Native should use ./ImpactFundLogo.tsx instead.
 */
import React from 'react';

export type LogoVariant = 'primary' | 'mono' | 'onDark' | 'negative';

const FILLS: Record<LogoVariant, { bar: string; dot: string; word: string }> = {
  primary: { bar: '#123250', dot: '#37C391', word: '#123250' },
  mono: { bar: '#123250', dot: '#123250', word: '#123250' },
  onDark: { bar: '#EAF2F1', dot: '#37C391', word: '#EAF2F1' },
  negative: { bar: '#FFFFFF', dot: '#FFFFFF', word: '#FFFFFF' },
};

export function ImpactFundMark({
  size = 40,
  variant = 'primary',
}: {
  size?: number;
  variant?: LogoVariant;
}) {
  const { bar, dot } = FILLS[variant];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="ImpactFund">
      <rect x={42} y={40} width={16} height={46} rx={8} fill={bar} />
      <circle cx={50} cy={22} r={10} fill={dot} />
    </svg>
  );
}

export function ImpactFundLogo({
  height = 30,
  variant = 'primary',
}: {
  height?: number;
  variant?: LogoVariant;
}) {
  const { word } = FILLS[variant];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: height * 0.42 }}>
      <ImpactFundMark size={height * 1.34} variant={variant} />
      <span
        style={{
          fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
          fontSize: height,
          letterSpacing: '-0.7px',
          color: word,
          lineHeight: 1,
        }}
      >
        <span style={{ fontWeight: 800 }}>Impact</span>
        <span style={{ fontWeight: 500 }}>Fund</span>
      </span>
    </span>
  );
}
