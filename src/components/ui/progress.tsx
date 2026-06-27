import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ProgressBar({
  progress,
  color,
  height = 6,
}: {
  progress: number; // 0..1
  color?: string;
  height?: number;
}) {
  const theme = useTheme();
  const [w, setW] = useState(0);
  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(Math.max(0, Math.min(1, progress)), { duration: 420 });
  }, [progress, fill]);

  const animStyle = useAnimatedStyle(() => ({ width: w * fill.value }));

  return (
    <View
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
      style={[styles.track, { height, backgroundColor: theme.surfaceSunken }]}>
      <Animated.View
        style={[styles.fill, { height, backgroundColor: color ?? theme.brand }, animStyle]}
      />
    </View>
  );
}

/** Punkt-Indikator für swipebare Karten. */
export function Dots({ count, active, color }: { count: number; active: number; color?: string }) {
  const theme = useTheme();
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: i === active ? color ?? theme.ink : theme.lineStrong,
              width: i === active ? 22 : 7,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', borderRadius: Radius.pill, overflow: 'hidden' },
  fill: { borderRadius: Radius.pill },
  dots: { flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' },
  dot: { height: 7, borderRadius: Radius.pill },
});
