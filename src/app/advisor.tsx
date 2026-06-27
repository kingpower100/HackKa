import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Monogram } from '@/components/ui/monogram';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { useTr } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import type { Localized } from '@/i18n/types';

type Slot = 'morning' | 'afternoon' | 'evening';

const SLOTS: { key: Slot; label: Localized }[] = [
  { key: 'morning', label: { de: 'Vormittags', en: 'Morning' } },
  { key: 'afternoon', label: { de: 'Nachmittags', en: 'Afternoon' } },
  { key: 'evening', label: { de: 'Abends', en: 'Evening' } },
];

export default function Advisor() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const [slot, setSlot] = useState<Slot | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Screen footer={<Button title={tr({ de: 'Fertig', en: 'Done' })} onPress={() => router.back()} />}>
        <TopBar onClose={() => router.back()} />
        <View style={styles.success}>
          <Animated.View entering={FadeIn.duration(420)} style={[styles.seal, { backgroundColor: theme.brand }]}>
            <Icon name="checkmark" size={34} color={theme.onBrand} />
          </Animated.View>
          <AppText variant="display" center style={{ marginTop: Spacing.lg }}>
            {tr({ de: 'Wir melden uns.', en: 'We will be in touch.' })}
          </AppText>
          <AppText variant="callout" color="inkSecondary" center style={{ marginTop: Spacing.sm, maxWidth: 320 }}>
            {tr({
              de: 'Maria meldet sich innerhalb von 24 Stunden bei dir und hilft dir, dein eigenes Ding zu gestalten.',
              en: 'Maria will get back to you within 24 hours and help you shape your own thing.',
            })}
          </AppText>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      footer={
        <Button
          title={tr({ de: 'Rückruf anfragen', en: 'Request a callback' })}
          icon="call-outline"
          disabled={!slot}
          onPress={() => setDone(true)}
        />
      }>
      <TopBar onClose={() => router.back()} title={tr({ de: 'Beratung', en: 'Advice' })} />

      <View style={styles.head}>
        <Monogram initials="MB" color={theme.gold} size={60} />
        <View style={{ flex: 1 }}>
          <AppText variant="label" color="brandInk">
            {tr({ de: 'Persönliche Beratung', en: 'Personal guidance' })}
          </AppText>
          <AppText variant="subtitle">Maria Berger</AppText>
          <AppText variant="small" color="inkSecondary">
            {tr({ de: 'ImpactFund Begleitung', en: 'ImpactFund guide' })}
          </AppText>
        </View>
      </View>

      <AppText variant="display" style={{ marginTop: Spacing.lg }}>
        {tr({ de: `Sprich mit einem${'\n'}Menschen.`, en: `Talk to a${'\n'}real person.` })}
      </AppText>
      <AppText variant="body" color="inkSecondary" style={{ marginTop: Spacing.sm }}>
        {tr({
          de: 'Nichts Passendes dabei? Maria hilft dir herauszufinden, was zu dir passt, und dein eigenes Ding zu gestalten. Unverbindlich und kostenlos.',
          en: 'Nothing that fits? Maria helps you work out what suits you and shape your own thing. No strings attached, free of charge.',
        })}
      </AppText>

      <AppText variant="label" color="inkTertiary" style={{ marginTop: Spacing.xl }}>
        {tr({ de: 'Wann passt es dir?', en: 'When suits you?' })}
      </AppText>
      <View style={styles.slots}>
        {SLOTS.map((s) => {
          const on = slot === s.key;
          return (
            <Pressable
              key={s.key}
              onPress={() => setSlot(s.key)}
              style={[
                styles.slot,
                {
                  borderColor: on ? theme.brand : theme.line,
                  backgroundColor: on ? theme.brandSoft : theme.surface,
                },
              ]}>
              <AppText variant="small" style={{ color: on ? theme.brandInk : theme.inkSecondary, fontWeight: '600' }}>
                {tr(s.label)}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.note}>
        <Icon name="shield-checkmark" size={15} color={theme.inkTertiary} />
        <AppText variant="caption" color="inkTertiary" style={{ flex: 1 }}>
          {tr({
            de: 'In dieser Vorschau wird keine echte Anfrage gesendet.',
            en: 'In this preview, no real request is sent.',
          })}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginTop: Spacing.sm },
  slots: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  slot: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  note: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.xl },
  success: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  seal: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
});
