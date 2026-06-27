import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Icon } from '@/components/ui/icon';
import { shadow } from '@/constants/theme';
import { useScheme, useTheme } from '@/hooks/use-theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Der Impact-Agent, von überall erreichbar. Ruhiger Puls, kein Geschrei. */
export function AgentFab({ bottom = 24 }: { bottom?: number }) {
  const theme = useTheme();
  const scheme = useScheme();
  const router = useRouter();
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.ease) }), -1, true);
  }, [pulse]);

  const ring = useAnimatedStyle(() => ({
    opacity: 0.32 - pulse.value * 0.32,
    transform: [{ scale: 1 + pulse.value * 0.42 }],
  }));

  return (
    <Pressable
      onPress={() => router.push('/agent')}
      style={[styles.wrap, { bottom }]}
      hitSlop={10}>
      <Animated.View style={[styles.ring, { backgroundColor: theme.brand }, ring]} />
      <AnimatedPressable
        onPress={() => router.push('/agent')}
        style={[styles.fab, shadow(scheme, 2), { backgroundColor: theme.brand }]}>
        <Icon name="sparkles" size={24} color={theme.onBrand} />
      </AnimatedPressable>
    </Pressable>
  );
}

const SIZE = 58;
const styles = StyleSheet.create({
  wrap: { position: 'absolute', right: 18, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: SIZE, height: SIZE, borderRadius: SIZE / 2 },
  fab: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
