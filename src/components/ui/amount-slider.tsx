import { useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';

import { Radius, shadow } from '@/constants/theme';
import { useScheme, useTheme } from '@/hooks/use-theme';

/**
 * Eigener Betrags-Slider (PanResponder, dependency-arm). Bewusst greifbar:
 * großer Thumb, weiche Snaps. „Fang an, womit du willst, jederzeit änderbar.“
 * Der PanResponder wird pro Render neu gebaut, damit die Handler immer die
 * aktuellen Props sehen. Kein Ref, kein Stale-Closure.
 */
export function AmountSlider({
  value,
  min,
  max,
  step,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const theme = useTheme();
  const scheme = useScheme();
  const [w, setW] = useState(0);

  function apply(localX: number) {
    if (!w) return;
    const ratio = Math.max(0, Math.min(1, localX / w));
    let v = min + ratio * (max - min);
    v = Math.round(v / step) * step;
    onChange(Math.max(min, Math.min(max, v)));
  }

  const responder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => apply(e.nativeEvent.locationX),
    onPanResponderMove: (e) => apply(e.nativeEvent.locationX),
  });

  const ratio = max > min ? (value - min) / (max - min) : 0;

  return (
    <View style={styles.wrap}>
      <View
        onLayout={(e) => setW(e.nativeEvent.layout.width)}
        style={styles.hit}
        {...responder.panHandlers}>
        <View style={[styles.track, { backgroundColor: theme.surfaceSunken }]}>
          <View style={[styles.fill, { backgroundColor: theme.brand, width: `${ratio * 100}%` }]} />
        </View>
        <View
          pointerEvents="none"
          style={[
            styles.thumb,
            shadow(scheme, 1),
            { left: `${ratio * 100}%`, backgroundColor: theme.surface, borderColor: theme.brand },
          ]}
        />
      </View>
    </View>
  );
}

const THUMB = 30;

const styles = StyleSheet.create({
  wrap: { paddingVertical: 8 },
  hit: { height: THUMB + 16, justifyContent: 'center' },
  track: { height: 8, borderRadius: Radius.pill, overflow: 'hidden' },
  fill: { height: 8, borderRadius: Radius.pill },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    borderWidth: 3,
    marginLeft: -THUMB / 2,
    top: 8,
  },
});
