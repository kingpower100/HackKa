import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon, categoryIcon } from '@/components/ui/icon';
import { Pill } from '@/components/ui/pill';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { Categories, categoryTint, Spacing } from '@/constants/theme';
import { useTr } from '@/hooks/use-language';
import { useScheme, useTheme } from '@/hooks/use-theme';
import { useStore } from '@/store/app-store';

export default function ProfileResult() {
  const router = useRouter();
  const theme = useTheme();
  const scheme = useScheme();
  const tr = useTr();
  const { state } = useStore();
  const archetype = state.archetype;

  if (!archetype) {
    router.replace('/onboarding/quiz');
    return null;
  }

  return (
    <Screen
      scroll
      footer={
        <View style={{ gap: Spacing.sm }}>
          <Button title={tr({ de: 'Das passt zu mir', en: 'That fits me' })} iconRight="arrow-forward" onPress={() => router.push('/onboarding/contribute')} />
          <Button
            title={tr({ de: 'Profil teilen', en: 'Share profile' })}
            variant="ghost"
            icon="share-outline"
            onPress={() => {}}
          />
        </View>
      }>
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <AppText variant="label" color="brandInk">
          {tr({ de: 'Dein Impact-Profil', en: 'Your impact profile' })}
        </AppText>
      </Animated.View>

      {/* Archetype hero */}
      <Animated.View entering={FadeInDown.delay(150).duration(600)}>
        <Card surface="feature" borderColor="transparent" elevated style={styles.hero}>
          <View style={[styles.crest, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
            <Icon name="sparkles" size={22} color={theme.brand} />
          </View>
          <AppText variant="display" center style={{ marginTop: Spacing.base, color: theme.onFeature }}>
            {tr(archetype.title)}
          </AppText>
          <View style={[styles.quoteBar, { backgroundColor: theme.brand }]} />
          <AppText variant="subtitle" center style={[styles.essence, { color: theme.onFeatureDim }]}>
            {tr(archetype.essence)}
          </AppText>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(320).duration(500)}>
        <AppText variant="body" color="inkSecondary" style={styles.desc}>
          {tr(archetype.description)}
        </AppText>
      </Animated.View>

      {/* Strengths */}
      <Animated.View entering={FadeInDown.delay(420).duration(500)} style={styles.chips}>
        {tr(archetype.strengths).map((s) => (
          <Pill key={s} label={s} bg={theme.surfaceSunken} color={theme.ink} />
        ))}
      </Animated.View>

      {/* Themes */}
      <Animated.View entering={FadeInDown.delay(520).duration(500)} style={styles.section}>
        <AppText variant="headline">{tr({ de: 'Deine Themen', en: 'Your themes' })}</AppText>
        <AppText variant="callout" color="inkSecondary" style={{ marginTop: 4, marginBottom: Spacing.base }}>
          {tr({ de: 'Hier wirkt dein Beitrag am stärksten.', en: 'This is where your contribution has the most effect.' })}
        </AppText>
        <View style={{ gap: Spacing.md }}>
          {state.topThemes.map((key, i) => {
            const cat = Categories[key];
            return (
              <Card key={key} padded={false} style={styles.themeRow}>
                <View style={[styles.themeIcon, { backgroundColor: categoryTint(key, scheme) }]}>
                  <Icon name={categoryIcon(key)} size={22} color={cat.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText variant="subtitle">{tr(cat.label)}</AppText>
                  <AppText variant="small" color="inkSecondary">
                    {tr(cat.blurb)}
                  </AppText>
                </View>
                <AppText variant="display" style={{ color: cat.color, opacity: 0.25, fontSize: 30 }}>
                  {String(i + 1).padStart(2, '0')}
                </AppText>
              </Card>
            );
          })}
        </View>
      </Animated.View>

      {/* Approach */}
      <Animated.View entering={FadeInDown.delay(640).duration(500)} style={styles.section}>
        <Card surface="brandSoft" borderColor="transparent">
          <AppText variant="label" color="brandInk">
            {tr({ de: 'So wirkst du am besten', en: 'How you have the most effect' })}
          </AppText>
          <AppText variant="body" style={{ marginTop: Spacing.sm }}>
            {tr(archetype.approach)}
          </AppText>
        </Card>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: Spacing.base, marginBottom: Spacing.base, alignItems: 'flex-start' },
  hero: { alignItems: 'center', paddingVertical: Spacing.xl },
  crest: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  quoteBar: { width: 40, height: 3, borderRadius: 2, marginTop: Spacing.base },
  essence: { marginTop: Spacing.base, maxWidth: 420 },
  desc: { marginTop: Spacing.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.lg },
  section: { marginTop: Spacing.xl },
  themeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.base },
  themeIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});
