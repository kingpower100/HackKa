import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AppText } from './text';
import { Icon, type IconName } from './icon';

export function Pill({
  label,
  color,
  bg,
  icon,
  style,
}: {
  label: string;
  color?: string;
  bg?: string;
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const fg = color ?? theme.inkSecondary;
  return (
    <View style={[styles.pill, { backgroundColor: bg ?? theme.surfaceAlt }, style]}>
      {icon ? <Icon name={icon} size={12} color={fg} /> : null}
      <AppText variant="caption" style={{ color: fg, fontWeight: '600' }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
});
