import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { AmountSlider } from '@/components/ui/amount-slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { euro } from '@/lib/format';
import { useLanguage, useTr } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import { useStore } from '@/store/app-store';

type Mode = 'monthly' | 'oneoff';

const PRESETS: Record<Mode, number[]> = {
  monthly: [25, 50, 100, 250],
  oneoff: [10000, 50000, 100000, 250000],
};
const RANGE: Record<Mode, { min: number; max: number; step: number }> = {
  monthly: { min: 10, max: 5000, step: 10 },
  oneoff: { min: 1000, max: 250000, step: 1000 },
};

export default function Contribute() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { setContribution } = useStore();

  const [mode, setMode] = useState<Mode>('oneoff');
  const [amounts, setAmounts] = useState<Record<Mode, number>>({ monthly: 50, oneoff: 50000 });
  const [roundup, setRoundup] = useState(false);

  const amount = amounts[mode];
  const range = RANGE[mode];

  function proceed() {
    setContribution({ type: mode, amount, roundup });
    router.push('/onboarding/projects');
  }

  return (
    <Screen
      scroll
      footer={
        <Button
          title={tr({ de: 'Projekte entdecken', en: 'Discover projects' })}
          iconRight="arrow-forward"
          onPress={proceed}
        />
      }>
      <TopBar onBack={() => router.back()} />

      <AppText variant="label" color="brandInk">
        {tr({ de: 'Dein Einstieg', en: 'Your starting point' })}
      </AppText>
      <AppText variant="display" style={{ marginTop: Spacing.sm }}>
        {tr({ de: 'Fang an, womit du willst.', en: 'Begin with whatever feels right.' })}
      </AppText>
      <AppText variant="body" color="inkSecondary" style={{ marginTop: Spacing.sm }}>
        {tr({
          de: 'Es gibt kein Minimum und keine Bindung. Du kannst alles jederzeit ändern oder pausieren.',
          en: 'There is no minimum and no commitment. You can change or pause anything at any time.',
        })}
      </AppText>

      {/* Mode switch */}
      <View style={[styles.segment, { backgroundColor: theme.surfaceSunken }]}>
        {(['oneoff', 'monthly'] as Mode[]).map((m) => {
          const on = mode === m;
          return (
            <Pressable
              key={m}
              onPress={() => setMode(m)}
              style={[styles.segItem, on && { backgroundColor: theme.surface }]}>
              <AppText variant="small" style={{ color: on ? theme.ink : theme.inkSecondary, fontWeight: '700' }}>
                {m === 'monthly'
                  ? tr({ de: 'Monatlich', en: 'Monthly' })
                  : tr({ de: 'Einmalig', en: 'One-off' })}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      {/* Amount card */}
      <Card elevated style={styles.amountCard}>
        <AppText variant="display" center style={{ fontSize: 52, lineHeight: 58 }}>
          {euro(amount, lang)}
        </AppText>
        <AppText variant="small" color="inkTertiary" center style={{ marginTop: 2 }}>
          {mode === 'monthly'
            ? tr({ de: 'pro Monat', en: 'per month' })
            : tr({ de: 'einmalig', en: 'one-off' })}
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

      {/* Contextual message */}
      <Animated.View key={mode} entering={FadeIn.duration(350)}>
        <Card surface={mode === 'oneoff' ? 'goldSoft' : 'brandSoft'} borderColor="transparent" style={styles.note}>
          <Icon
            name={mode === 'oneoff' ? 'flash' : 'infinite'}
            size={20}
            color={mode === 'oneoff' ? theme.goldInk : theme.brandInk}
          />
          <AppText variant="callout" style={{ flex: 1 }}>
            {mode === 'oneoff'
              ? tr({
                  de: 'Viel bewegen, in Minuten statt Monaten. Kein Papierkram, keine Termine. Dein Einsatz ist sofort wirksam und bleibt jederzeit in deiner Hand.',
                  en: 'Move something meaningful, in minutes rather than months. No paperwork, no appointments. Your contribution takes effect right away and always stays in your hands.',
                })
              : tr({
                  de: 'Ein verlässlicher Beitrag, der mit dir wächst. Heute 50 €, nächsten Monat mehr oder weniger. Du entscheidest immer neu.',
                  en: 'A dependable contribution that grows with you. €50 today, more or less next month. The choice is always yours to make again.',
                })}
          </AppText>
        </Card>
      </Animated.View>

      {/* Round-up, dezent */}
      <Card style={styles.roundup}>
        <View style={{ flex: 1 }}>
          <View style={styles.roundHead}>
            <Icon name="ellipsis-horizontal-circle-outline" size={18} color={theme.inkSecondary} />
            <AppText variant="bodyStrong">
              {tr({ de: 'Alltagskäufe aufrunden', en: 'Round up everyday purchases' })}
            </AppText>
          </View>
          <AppText variant="small" color="inkSecondary" style={{ marginTop: 4 }}>
            {tr({
              de: 'Runde Zahlungen auf den nächsten Euro. Die Differenz fließt in deinen Topf, meist 3-5 € im Monat.',
              en: 'Round payments up to the nearest euro. The difference flows into your pot, usually €3-5 a month.',
            })}
          </AppText>
        </View>
        <Switch
          value={roundup}
          onValueChange={setRoundup}
          trackColor={{ true: theme.brand, false: theme.lineStrong }}
          thumbColor="#fff"
        />
      </Card>

      <View style={styles.reassure}>
        <Icon name="lock-open-outline" size={15} color={theme.inkTertiary} />
        <AppText variant="caption" color="inkTertiary">
          {tr({
            de: 'Nichts ist für immer weggesperrt. Auszahlung & Änderung jederzeit.',
            en: 'Nothing is ever locked away. Withdraw or change it whenever you like.',
          })}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  segment: { flexDirection: 'row', borderRadius: Radius.pill, padding: 4, marginTop: Spacing.xl },
  segItem: { flex: 1, paddingVertical: 10, borderRadius: Radius.pill, alignItems: 'center' },
  amountCard: { marginTop: Spacing.lg, paddingVertical: Spacing.xl },
  presets: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg, justifyContent: 'space-between' },
  preset: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  note: { flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-start', marginTop: Spacing.lg },
  roundup: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginTop: Spacing.md },
  roundHead: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  reassure: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, justifyContent: 'center', marginTop: Spacing.lg },
});
