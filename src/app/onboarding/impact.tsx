import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Monogram } from '@/components/ui/monogram';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { Categories, Spacing } from '@/constants/theme';
import { getProject } from '@/data/projects';
import { euro, impactUnits } from '@/lib/format';
import { useLanguage, useTr } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import { allocationAmount, useStore } from '@/store/app-store';

export default function InstantImpact() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { state, confirmGive } = useStore();
  const [phase, setPhase] = useState<'processing' | 'done'>('processing');

  useEffect(() => {
    const t = setTimeout(() => setPhase('done'), 1500);
    return () => clearTimeout(t);
  }, []);

  function finish() {
    confirmGive();
    router.replace('/home');
  }

  if (phase === 'processing') {
    return (
      <Screen>
        <View style={styles.processing}>
          <ActivityIndicator size="large" color={theme.brand} />
          <AppText variant="headline" center style={{ marginTop: Spacing.lg }}>
            {tr({ de: 'Wir richten deine Wirkung ein …', en: 'Setting up your impact …' })}
          </AppText>
          <AppText variant="callout" color="inkSecondary" center style={{ marginTop: Spacing.sm }}>
            {tr({
              de: 'Beträge werden verteilt, Projekte benachrichtigt.',
              en: 'Amounts are being allocated, projects notified.',
            })}
          </AppText>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      scroll
      footer={
        <Button
          title={tr({ de: 'Los geht’s', en: 'Let’s go' })}
          iconRight="arrow-forward"
          onPress={finish}
        />
      }>
      <View style={styles.head}>
        <Animated.View entering={FadeIn.duration(450)} style={[styles.seal, { backgroundColor: theme.brand }]}>
          <Icon name="checkmark" size={34} color={theme.onBrand} />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(250).duration(500)} style={{ alignItems: 'center' }}>
          <AppText variant="label" color="brandInk" style={{ marginTop: Spacing.lg }}>
            {tr({ de: 'Sofort wirksam', en: 'Effective right away' })}
          </AppText>
          <AppText variant="display" center style={{ marginTop: Spacing.sm }}>
            {tr({ de: `Das bewirkst du${'\n'}ab heute.`, en: `Here is what you${'\n'}set in motion today.` })}
          </AppText>
          <AppText variant="callout" color="inkSecondary" center style={{ marginTop: Spacing.sm }}>
            {tr({
              de: 'Kein Versprechen in Prozenten, sondern ein garantierter, greifbarer Gegenwert.',
              en: 'Not a promise in percentages, but a guaranteed, tangible result.',
            })}
          </AppText>
        </Animated.View>
      </View>

      <View style={styles.list}>
        {state.allocations.map((alloc, i) => {
          const project = getProject(alloc.projectId);
          if (!project) return null;
          const amount = allocationAmount(state, project.id);
          const { count, label } = impactUnits(
            amount,
            project.impact.per,
            tr(project.impact.unit),
            tr(project.impact.unitPlural)
          );
          return (
            <Animated.View key={project.id} entering={FadeInDown.delay(400 + i * 140).duration(520)}>
              <Card elevated style={styles.row}>
                <Monogram initials={project.hero.initials} category={project.category} size={50} />
                <View style={{ flex: 1 }}>
                  <AppText variant="caption" style={{ color: Categories[project.category].color, fontWeight: '700' }}>
                    {tr(project.name)} · {euro(amount, lang)}
                  </AppText>
                  <AppText variant="headline" style={{ marginTop: 2 }}>
                    {count}×
                  </AppText>
                  <AppText variant="callout" color="inkSecondary">
                    {label}
                  </AppText>
                </View>
              </Card>
            </Animated.View>
          );
        })}
      </View>

      <Animated.View entering={FadeIn.delay(900).duration(500)}>
        <Card surface="goldSoft" borderColor="transparent" style={styles.anticipation}>
          <Icon name="mail-unread-outline" size={20} color={theme.goldInk} />
          <View style={{ flex: 1 }}>
            <AppText variant="bodyStrong">
              {tr({ de: 'Die echte Geschichte folgt', en: 'The real story follows' })}
            </AppText>
            <AppText variant="small" color="inkSecondary" style={{ marginTop: 2 }}>
              {tr({
                de: 'Dein erstes Update kommt bald, mit einem echten Gesicht und dem, was dein Beitrag bewegt hat.',
                en: 'Your first update arrives soon, with a real face and what your contribution set in motion.',
              })}
            </AppText>
          </View>
        </Card>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  processing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  head: { alignItems: 'center', marginTop: Spacing.xl, marginBottom: Spacing.lg },
  seal: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  list: { gap: Spacing.md, marginTop: Spacing.base },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  anticipation: { flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-start', marginTop: Spacing.lg },
});
