import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Radius, Spacing, shadow, type ThemeColors } from '@/constants/theme';
import { useScheme, useTheme } from '@/hooks/use-theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  elevated?: boolean;
  surface?: keyof ThemeColors;
  borderColor?: string;
};

export function Card({
  children,
  onPress,
  style,
  padded = true,
  elevated = false,
  surface = 'surface',
  borderColor,
}: Props) {
  const theme = useTheme();
  const scheme = useScheme();
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const base: ViewStyle = {
    backgroundColor: theme[surface],
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: borderColor ?? theme.line,
    padding: padded ? Spacing.lg : 0,
    ...(elevated ? shadow(scheme, 1) : null),
  };

  if (!onPress) return <View style={[base, style]}>{children}</View>;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => (scale.value = withTiming(0.99, { duration: 120 }))}
      onPressOut={() => (scale.value = withTiming(1, { duration: 180 }))}
      style={[base, animStyle, style]}>
      {children}
    </AnimatedPressable>
  );
}
