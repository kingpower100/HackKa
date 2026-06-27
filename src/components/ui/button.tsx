import { ActivityIndicator, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Radius, Spacing, type ThemeColors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AppText } from './text';
import { Icon, type IconName } from './icon';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: IconName;
  iconRight?: IconName;
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
  size?: 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
};

function palette(theme: ThemeColors, variant: Variant) {
  switch (variant) {
    case 'primary':
      // LBBW signature: green fill, navy ink.
      return { bg: theme.brand, fg: theme.onBrand, border: 'transparent' as const };
    case 'gold':
      // Navy emphasis button.
      return { bg: theme.gold, fg: theme.onFeature, border: 'transparent' as const };
    case 'secondary':
      return { bg: theme.surface, fg: theme.ink, border: theme.lineStrong };
    case 'ghost':
      return { bg: 'transparent' as const, fg: theme.brandInk, border: 'transparent' as const };
  }
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  iconRight,
  disabled,
  loading,
  full = true,
  size = 'lg',
  style,
}: Props) {
  const theme = useTheme();
  const { bg, fg, border } = palette(theme, variant);
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      onPress={isDisabled ? undefined : onPress}
      onPressIn={() => (scale.value = withTiming(0.98, { duration: 120 }))}
      onPressOut={() => (scale.value = withTiming(1, { duration: 180 }))}
      style={[
        styles.base,
        size === 'lg' ? styles.lg : styles.md,
        { backgroundColor: bg, borderColor: border, borderWidth: border === 'transparent' ? 0 : 1.5 },
        full && styles.full,
        isDisabled && { opacity: 0.4 },
        animStyle,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={styles.row}>
          {icon ? <Icon name={icon} size={18} color={fg} /> : null}
          <AppText variant="subtitle" style={{ color: fg }}>
            {title}
          </AppText>
          {iconRight ? <Icon name={iconRight} size={18} color={fg} /> : null}
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  md: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg },
  lg: { paddingVertical: 17, paddingHorizontal: Spacing.xl },
  full: { alignSelf: 'stretch' },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
});
