import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AmountSlider } from '@/components/ui/amount-slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { type CategoryKey, FontFamily, Radius, Spacing } from '@/constants/theme';
import { getProject } from '@/data/projects';
import { euro } from '@/lib/format';
import { useLanguage, useTr } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import type { Localized } from '@/i18n/types';
import { useStore } from '@/store/app-store';

const THEME_NAMES: Record<CategoryKey, Localized> = {
  bildung: { de: 'Klare Köpfe', en: 'Clear Minds' },
  umwelt: { de: 'Grüne Linie', en: 'Green Line' },
  soziales: { de: 'Offene Türen', en: 'Open Doors' },
  tierschutz: { de: 'Stille Gefährten', en: 'Quiet Companions' },
  sport: { de: 'Mit Anlauf', en: 'Full Stride' },
  kultur: { de: 'Laute Stimmen', en: 'Loud Voices' },
  gesundheit: { de: 'Würdevoll', en: 'With Dignity' },
};

type Mode = 'monthly' | 'oneoff';

const PRESETS: Record<Mode, number[]> = {
  monthly: [25, 50, 100, 250],
  oneoff: [10000, 50000, 100000, 250000],
};
const RANGE: Record<Mode, { min: number; max: number; step: number }> = {
  monthly: { min: 10, max: 5000, step: 10 },
  oneoff: { min: 1000, max: 250000, step: 1000 },
};

export default function NameMission() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { state, nameFund, setContribution, confirmGive } = useStore();
  const [name, setName] = useState('');

  // Budget: vorbefüllt aus dem bestehenden Beitrag, sonst ruhige Standardwerte.
  const [mode, setMode] = useState<Mode>(state.contribution?.type ?? 'monthly');
  const [amounts, setAmounts] = useState<Record<Mode, number>>({
    monthly: state.contribution?.type === 'monthly' ? state.contribution.amount : 50,
    oneoff: state.contribution?.type === 'oneoff' ? state.contribution.amount : 50000,
  });

  const amount = amounts[mode];
  const range = RANGE[mode];

  const heroName = getProject(state.allocations[0]?.projectId)?.hero.name;
  const suggestions = Array.from(
    new Set(
      [
        state.topThemes[0] ? tr(THEME_NAMES[state.topThemes[0]]) : null,
        heroName && !heroName.includes(' ') ? (lang === 'en' ? `The ${heroName} Fund` : `${heroName}-Fonds`) : null,
        tr({ de: 'Der erste Schritt', en: 'The First Step' }),
        tr({ de: 'Was bleibt', en: 'What Stays' }),
        tr({ de: 'Weitsicht', en: 'Foresight' }),
      ].filter(Boolean) as string[]
    )
  ).slice(0, 4);

  const valid = name.trim().length >= 2 && amount > 0;

  function found() {
    if (!valid) return;
    setContribution({ type: mode, amount, roundup: state.contribution?.roundup ?? false });
    nameFund(name.trim());
    // Ein Impact-Fonds braucht Geld: ist noch nichts committet, schließen wir das
    // Onboarding hier mit dem festgelegten Budget ab (kein Doppel-Abbuchen, wenn
    // bereits onboarded).
    if (!state.onboarded) confirmGive();
    router.replace('/level-up');
  }

  return (
    <Screen
      scroll
      footer={
        <Button
          title={tr({ de: 'Impact-Fonds gründen', en: 'Start impact fund' })}
          iconRight="arrow-forward"
          disabled={!valid}
          onPress={found}
        />
      }>
      <TopBar onClose={() => router.back()} />

      <View style={[styles.crest, { backgroundColor: theme.brandSoft }]}>
        <Icon name="ribbon" size={24} color={theme.brandInk} />
      </View>

      <AppText variant="display" style={{ marginTop: Spacing.lg }}>
        {tr({ de: `Gründe deinen${'\n'}Impact-Fonds.`, en: `Start your${'\n'}impact fund.` })}
      </AppText>
      <AppText variant="body" color="inkSecondary" style={{ marginTop: Spacing.sm }}>
        {tr({
          de: 'Gib ihm einen Namen und ein Budget. So wird aus Geben etwas Eigenes, das dir gehört und wachsen darf. Beides kannst du jederzeit ändern.',
          en: 'Give it a name and a budget. That turns giving into something of your own, something that belongs to you and can grow. You can change both any time.',
        })}
      </AppText>

      <AppText variant="label" color="inkTertiary" style={{ marginTop: Spacing.xl }}>
        {tr({ de: 'Name', en: 'Name' })}
      </AppText>
      <View style={[styles.inputWrap, { borderColor: name ? theme.brand : theme.lineStrong, backgroundColor: theme.surface }]}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={tr({ de: 'z. B. Klare Köpfe', en: 'e.g. Clear Minds' })}
          placeholderTextColor={theme.inkTertiary}
          style={[styles.input, { color: theme.ink }]}
          maxLength={28}
          returnKeyType="done"
        />
      </View>

      <View style={styles.suggestions}>
        {suggestions.map((s) => (
          <Pressable
            key={s}
            onPress={() => setName(s)}
            style={[styles.chip, { borderColor: theme.line, backgroundColor: theme.surface }]}>
            <AppText variant="small" color="inkSecondary">
              {s}
            </AppText>
          </Pressable>
        ))}
      </View>

      {/* Budget: ein Impact-Fonds braucht Geld. */}
      <AppText variant="label" color="inkTertiary" style={{ marginTop: Spacing.xl }}>
        {tr({ de: 'Budget', en: 'Budget' })}
      </AppText>
      <AppText variant="bodyStrong" style={{ marginTop: 4 }}>
        {tr({ de: 'Womit startet dein Impact-Fonds?', en: 'What does your impact fund start with?' })}
      </AppText>
      <AppText variant="small" color="inkSecondary" style={{ marginTop: 4 }}>
        {tr({
          de: 'Ein Impact-Fonds braucht ein Budget. Du kannst es jederzeit ändern oder pausieren.',
          en: 'An impact fund needs a budget. You can change or pause it any time.',
        })}
      </AppText>

      <View style={[styles.segment, { backgroundColor: theme.surfaceSunken }]}>
        {(['monthly', 'oneoff'] as Mode[]).map((m) => {
          const on = mode === m;
          return (
            <Pressable
              key={m}
              onPress={() => setMode(m)}
              style={[styles.segItem, on && { backgroundColor: theme.surface }]}>
              <AppText variant="small" style={{ color: on ? theme.ink : theme.inkSecondary, fontWeight: '700' }}>
                {m === 'monthly' ? tr({ de: 'Monatlich', en: 'Monthly' }) : tr({ de: 'Einmalig', en: 'One-off' })}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <Card elevated style={styles.amountCard}>
        <AppText variant="display" center style={{ fontSize: 44, lineHeight: 50 }}>
          {euro(amount, lang)}
        </AppText>
        <AppText variant="small" color="inkTertiary" center style={{ marginTop: 2 }}>
          {mode === 'monthly' ? tr({ de: 'pro Monat', en: 'per month' }) : tr({ de: 'einmalig', en: 'one-off' })}
        </AppText>
        <View style={{ marginTop: Spacing.lg }}>
          <AmountSlider
            value={amount}
            min={range.min}
            max={range.max}
            step={range.step}
            onChange={(v) => setAmounts((a) => ({ ...a, [mode]: v }))}
          />
        </View>
        <View style={styles.presets}>
          {PRESETS[mode].map((p) => {
            const on = amount === p;
            return (
              <Pressable
                key={p}
                onPress={() => setAmounts((a) => ({ ...a, [mode]: p }))}
                style={[
                  styles.preset,
                  { borderColor: on ? theme.brand : theme.line, backgroundColor: on ? theme.brandSoft : 'transparent' },
                ]}>
                <AppText variant="small" style={{ color: on ? theme.brandInk : theme.inkSecondary, fontWeight: '600' }}>
                  {euro(p, lang)}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  crest: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginTop: Spacing.base },
  inputWrap: { marginTop: Spacing.sm, borderWidth: 2, borderRadius: Radius.md, paddingHorizontal: Spacing.base },
  input: { fontSize: 24, fontFamily: FontFamily.semibold, paddingVertical: Spacing.base },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.md },
  chip: { paddingHorizontal: Spacing.base, paddingVertical: 10, borderRadius: Radius.pill, borderWidth: 1 },
  segment: { flexDirection: 'row', borderRadius: Radius.pill, padding: 4, marginTop: Spacing.base },
  segItem: { flex: 1, paddingVertical: 10, borderRadius: Radius.pill, alignItems: 'center' },
  amountCard: { marginTop: Spacing.base, paddingVertical: Spacing.xl },
  presets: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg, justifyContent: 'space-between' },
  preset: { flex: 1, paddingVertical: 10, borderRadius: Radius.pill, borderWidth: 1.5, alignItems: 'center' },
});
