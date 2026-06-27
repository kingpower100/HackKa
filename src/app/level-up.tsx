import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { MosaicMark } from '@/components/mosaic-mark';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { Radius, Spacing } from '@/constants/theme';
import { useTr } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import { useStore } from '@/store/app-store';

export default function LevelUp() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const { stage } = useStore();

  return (
    <Screen background={theme.feature} footer={<Button title={tr({ de: 'Weiter', en: 'Continue' })} onPress={() => router.replace('/home')} />}>
      <StatusBar style="light" />
      <View style={styles.body}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <MosaicMark size={120} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={{ alignItems: 'center' }}>
          <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.10)' }]}>
            <AppText variant="label" style={{ color: theme.brand }}>
              {tr({ de: 'Neue Stufe', en: 'New level' })} · {stage.level}
            </AppText>
          </View>
          <AppText variant="display" center style={{ marginTop: Spacing.lg, color: theme.onFeature }}>
            {tr(stage.title)}
          </AppText>
          <AppText variant="subtitle" center style={[styles.identity, { color: theme.onFeatureDim }]}>
            {tr(stage.identity)}
          </AppText>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(700).duration(600)}>
          <AppText variant="callout" center style={{ maxWidth: 320, color: theme.onFeatureDim }}>
            {tr({
              de: 'Es geht nicht darum, wie viel du gibst, sondern darum, wer du dabei wirst.',
              en: "It's not about how much you give, but about who you become along the way.",
            })}
          </AppText>
        </Animated.View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.xxl },
  badge: { paddingHorizontal: Spacing.base, paddingVertical: 6, borderRadius: Radius.pill },
  identity: { marginTop: Spacing.md, maxWidth: 360 },
});
