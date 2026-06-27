import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInRight, FadeOut } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Icon, categoryIcon } from '@/components/ui/icon';
import { ProgressBar } from '@/components/ui/progress';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { Categories, categoryTint, type CategoryKey, Radius, Spacing } from '@/constants/theme';
import { QUIZ } from '@/data/quiz';
import { useTr } from '@/hooks/use-language';
import { useScheme, useTheme } from '@/hooks/use-theme';
import { useStore } from '@/store/app-store';

export default function Quiz() {
  const router = useRouter();
  const theme = useTheme();
  const scheme = useScheme();
  const tr = useTr();
  const { state, answer, finalizeProfile } = useStore();
  const [step, setStep] = useState(0);

  const q = QUIZ[step];
  const selected = state.answers[q.id] ?? [];
  const isThemes = q.id === 'themes';

  const min = q.min ?? 1;
  const max = q.type === 'multi' ? q.max ?? q.options.length : 1;
  const valid = selected.length >= min;
  const isLast = step === QUIZ.length - 1;

  function choose(id: string) {
    if (q.type === 'single') {
      answer(q.id, [id]);
      setTimeout(next, 240);
      return;
    }
    if (selected.includes(id)) {
      answer(q.id, selected.filter((x) => x !== id));
    } else if (selected.length < max) {
      answer(q.id, [...selected, id]);
    }
  }

  function next() {
    if (isLast) {
      finalizeProfile();
      router.replace('/onboarding/profile');
    } else {
      setStep((s) => Math.min(s + 1, QUIZ.length - 1));
    }
  }

  function back() {
    if (step === 0) router.back();
    else setStep((s) => s - 1);
  }

  const progress = (step + (valid ? 1 : 0)) / QUIZ.length;

  return (
    <Screen
      scroll
      footer={
        q.type === 'multi' ? (
          <Button
            title={isLast ? tr({ de: 'Mein Profil ansehen', en: 'See my profile' }) : tr({ de: 'Weiter', en: 'Continue' })}
            iconRight="arrow-forward"
            disabled={!valid}
            onPress={next}
          />
        ) : (
          <AppText variant="caption" color="inkTertiary" center>
            {tr({ de: 'Tippe auf deine Antwort', en: 'Tap your answer' })}
          </AppText>
        )
      }>
      <TopBar onBack={back} />
      <View style={{ marginBottom: Spacing.xl }}>
        <ProgressBar progress={progress} />
      </View>

      <Animated.View key={q.id} entering={FadeInRight.duration(320)} exiting={FadeOut.duration(120)}>
        <AppText variant="label" color="brandInk">
          {tr(q.kicker)}
        </AppText>
        <AppText variant="displaySm" style={{ marginTop: Spacing.sm }}>
          {tr(q.question)}
        </AppText>
        {q.helper ? (
          <AppText variant="callout" color="inkSecondary" style={{ marginTop: Spacing.sm }}>
            {tr(q.helper)}
          </AppText>
        ) : null}

        <View style={styles.options}>
          {q.options.map((opt, i) => {
            const on = selected.includes(opt.id);
            return (
              <Animated.View key={opt.id} entering={FadeIn.delay(120 + i * 55).duration(300)}>
                <Pressable
                  onPress={() => choose(opt.id)}
                  style={[
                    styles.opt,
                    {
                      backgroundColor: on ? theme.brandSoft : theme.surface,
                      borderColor: on ? theme.brand : theme.line,
                      borderWidth: on ? 2 : StyleSheet.hairlineWidth,
                    },
                  ]}>
                  {isThemes ? (
                    <View
                      style={[
                        styles.catIcon,
                        { backgroundColor: categoryTint(opt.id as CategoryKey, scheme) },
                      ]}>
                      <Icon
                        name={categoryIcon(opt.id as CategoryKey)}
                        size={18}
                        color={Categories[opt.id as CategoryKey].color}
                      />
                    </View>
                  ) : null}

                  <View style={{ flex: 1 }}>
                    <AppText variant="bodyStrong">{tr(opt.label)}</AppText>
                    {opt.desc ? (
                      <AppText variant="small" color="inkSecondary" style={{ marginTop: 3 }}>
                        {tr(opt.desc)}
                      </AppText>
                    ) : null}
                  </View>

                  <View
                    style={[
                      styles.radio,
                      {
                        borderColor: on ? theme.brand : theme.lineStrong,
                        backgroundColor: on ? theme.brand : 'transparent',
                      },
                    ]}>
                    {on ? <Icon name="checkmark" size={14} color={theme.onBrand} /> : null}
                  </View>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  options: { marginTop: Spacing.xl, gap: Spacing.md },
  opt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.base,
    borderRadius: Radius.md,
  },
  catIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
