import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { ImpactFundMark, ImpactFundWordmark } from '@/components/impact-fund-logo';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { Spacing } from '@/constants/theme';
import { useTr } from '@/hooks/use-language';

export default function Welcome() {
  const router = useRouter();
  const tr = useTr();

  return (
    <Screen
      footer={
        <Animated.View entering={FadeInDown.delay(700).duration(500)}>
          <Button title={tr({ de: 'Lern dich kennen', en: 'Get to know yourself' })} iconRight="arrow-forward" onPress={() => router.push('/onboarding/quiz')} />
          <AppText variant="caption" color="inkTertiary" center style={{ marginTop: Spacing.md }}>
            {tr({ de: '6 Fragen · etwa 2 Minuten · jederzeit änderbar', en: '6 questions · about 2 minutes · change anytime' })}
          </AppText>
        </Animated.View>
      }>
      <View style={styles.body}>
        <Animated.View entering={FadeIn.duration(600)}>
          <ImpactFundMark size={96} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.copy}>
          <ImpactFundWordmark size={30} style={{ marginBottom: Spacing.lg }} />
          <AppText variant="display" center>
            {tr({ de: 'Wirkung beginnt', en: 'Impact begins' })}{'\n'}{tr({ de: 'mit einer Frage:', en: 'with a question:' })}
          </AppText>
          <AppText variant="displaySm" color="inkSecondary" center style={{ marginTop: Spacing.sm }}>
            {tr({ de: 'Wer willst du sein?', en: 'Who do you want to be?' })}
          </AppText>
        </Animated.View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.xxl },
  copy: { alignItems: 'center' },
});
