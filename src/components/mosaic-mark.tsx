import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { CategoryList } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Das Markenzeichen: ein Mosaik aus Themen-Kacheln, das sich zusammensetzt. */
export function MosaicMark({ size = 132, animated = true }: { size?: number; animated?: boolean }) {
  const theme = useTheme();
  const gap = size * 0.06;
  const tile = (size - gap * 2) / 3;
  const colors = [
    CategoryList[0].color,
    CategoryList[1].color,
    CategoryList[2].color,
    CategoryList[6].color,
    null, // centre stays empty, the "you" that completes it
    CategoryList[3].color,
    CategoryList[5].color,
    CategoryList[4].color,
    CategoryList[0].color,
  ];

  return (
    <View style={[styles.grid, { width: size, height: size, gap }]}>
      {colors.map((c, i) => {
        const Wrap = animated ? Animated.View : View;
        const props = animated ? { entering: FadeIn.delay(i * 70).duration(420) } : {};
        return (
          <Wrap
            key={i}
            {...props}
            style={{
              width: tile,
              height: tile,
              borderRadius: tile * 0.3,
              backgroundColor: c ?? 'transparent',
              borderWidth: c ? 0 : StyleSheet.hairlineWidth,
              borderColor: theme.lineStrong,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
});
