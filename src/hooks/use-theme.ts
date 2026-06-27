/**
 * Returns the active colour palette + the resolved scheme name.
 * Learn more: https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, type ColorScheme, type ThemeColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useScheme(): ColorScheme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}

export function useTheme(): ThemeColors {
  return Colors[useScheme()];
}
