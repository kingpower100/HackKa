import { Text as RNText, StyleSheet, type TextProps } from 'react-native';

import { FontFamily, Type, type ThemeColors, type TypeVariant } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Custom fonts don't synthesise weight, so an inline `fontWeight` would silently
 * do nothing. We map any weight onto the matching Hanken family instead, so all
 * existing `style={{ fontWeight: ... }}` overrides keep working.
 */
const WEIGHT_FAMILY: Record<string, string> = {
  '300': FontFamily.regular,
  '400': FontFamily.regular,
  normal: FontFamily.regular,
  '500': FontFamily.medium,
  '600': FontFamily.semibold,
  '700': FontFamily.bold,
  bold: FontFamily.bold,
  '800': FontFamily.extrabold,
  '900': FontFamily.extrabold,
};

type Props = TextProps & {
  variant?: TypeVariant;
  color?: keyof ThemeColors;
  center?: boolean;
};

export function AppText({ variant = 'body', color = 'ink', center, style, ...rest }: Props) {
  const theme = useTheme();
  const flat = StyleSheet.flatten(style) as { fontWeight?: string | number } | undefined;
  const weightOverride =
    flat?.fontWeight != null
      ? { fontFamily: WEIGHT_FAMILY[String(flat.fontWeight)] ?? FontFamily.regular, fontWeight: undefined }
      : null;

  return (
    <RNText
      style={[Type[variant], { color: theme[color] }, center && { textAlign: 'center' }, style, weightOverride]}
      {...rest}
    />
  );
}
