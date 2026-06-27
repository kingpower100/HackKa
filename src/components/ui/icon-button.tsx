import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Icon, type IconName } from './icon';

export function IconButton({
  name,
  onPress,
  size = 20,
  color,
  variant = 'surface',
  style,
}: {
  name: IconName;
  onPress?: () => void;
  size?: number;
  color?: string;
  variant?: 'surface' | 'plain';
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.btn,
        variant === 'surface' && {
          backgroundColor: theme.surface,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.line,
        },
        pressed && { opacity: 0.6 },
        style,
      ]}>
      <Icon name={name} size={size} color={color ?? theme.ink} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});
