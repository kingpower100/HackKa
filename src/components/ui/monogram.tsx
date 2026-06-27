import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { Categories, FontFamily, type CategoryKey } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Hero-Avatar als Monogramm in der Themenfarbe. Clean, kein Foto-Asset. */
export function Monogram({
  initials,
  category,
  color,
  size = 56,
  style,
}: {
  initials: string;
  category?: CategoryKey;
  color?: string;
  size?: number;
  style?: ViewStyle;
}) {
  const theme = useTheme();
  const c = color ?? (category ? Categories[category].color : theme.brand);
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size * 0.32,
          backgroundColor: c,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            experimental_backgroundImage:
              'linear-gradient(150deg, rgba(255,255,255,0.20), rgba(0,0,0,0.16))',
          } as ViewStyle,
        ]}
      />
      <Text
        style={{
          color: '#fff',
          fontSize: size * 0.36,
          lineHeight: size * 0.36,
          fontFamily: FontFamily.bold,
          letterSpacing: 0.3,
        }}>
        {initials}
      </Text>
    </View>
  );
}
