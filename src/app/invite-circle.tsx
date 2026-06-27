import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Monogram } from '@/components/ui/monogram';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { Spacing } from '@/constants/theme';
import { euro } from '@/lib/format';
import { useLanguage, useTr } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import { type CircleMember, useStore } from '@/store/app-store';
import type { Localized } from '@/i18n/types';

type Contact = Omit<CircleMember, 'status' | 'relation'> & { relation: Localized };

const CONTACTS: Contact[] = [
  { id: 'c1', name: 'Lena', relation: { de: 'Partnerin', en: 'partner' }, initials: 'LE', monthly: 50 },
  { id: 'c2', name: 'Jonas', relation: { de: 'Bruder', en: 'brother' }, initials: 'JO', monthly: 30 },
  { id: 'c3', name: 'Marie', relation: { de: 'beste Freundin', en: 'best friend' }, initials: 'MA', monthly: 25 },
  { id: 'c4', name: 'Papa', relation: { de: 'Vater', en: 'dad' }, initials: 'PA', monthly: 100 },
];

export default function InviteCircle() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { state, inviteCircle } = useStore();
  const existing = new Set(state.circle.map((m) => m.id));
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function invite() {
    const members: CircleMember[] = CONTACTS.filter((c) => selected.includes(c.id)).map((c) => ({
      ...c,
      relation: tr(c.relation),
      status: 'aktiv',
    }));
    inviteCircle(members);
    router.replace('/level-up');
  }

  const sum = CONTACTS.filter((c) => selected.includes(c.id)).reduce((s, c) => s + c.monthly, 0);

  return (
    <Screen
      footer={
        <View style={{ gap: Spacing.sm }}>
          {sum > 0 ? (
            <AppText variant="small" color="inkSecondary" center>
              {lang === 'en'
                ? `+ ${euro(sum, lang)} / month of shared impact`
                : `+ ${euro(sum, lang)} / Monat gemeinsame Wirkung`}
            </AppText>
          ) : null}
          <Button
            title={
              selected.length
                ? lang === 'en'
                  ? `Invite ${selected.length}`
                  : `${selected.length} einladen`
                : tr({ de: 'Wen möchtest du einladen?', en: 'Who would you like to invite?' })
            }
            iconRight={selected.length ? 'arrow-forward' : undefined}
            disabled={selected.length === 0}
            onPress={invite}
          />
        </View>
      }>
      <TopBar onClose={() => router.back()} />

      <View style={[styles.crest, { backgroundColor: theme.brandSoft }]}>
        <Icon name="people" size={24} color={theme.brandInk} />
      </View>

      <AppText variant="display" style={{ marginTop: Spacing.lg }}>
        {tr({ de: 'Lade deinen\nKreis ein.', en: 'Invite your\ncircle.' })}
      </AppText>
      <AppText variant="body" color="inkSecondary" style={{ marginTop: Spacing.sm }}>
        {state.fundName
          ? lang === 'en'
            ? `“${state.fundName}”`
            : `„${state.fundName}“`
          : tr({ de: 'Dein Impact-Fonds', en: 'Your impact fund' })}{' '}
        {tr({
          de: 'wird größer, wenn ihr ihn teilt. Familie und Freunde treten bei, geben gemeinsam und sehen dieselbe Wirkung.',
          en: 'grows when you share it. Family and friends join in, give together and see the same impact.',
        })}
      </AppText>

      <View style={styles.list}>
        {CONTACTS.map((c) => {
          const already = existing.has(c.id);
          const on = selected.includes(c.id) || already;
          return (
            <Card
              key={c.id}
              onPress={already ? undefined : () => toggle(c.id)}
              borderColor={on ? theme.brand : undefined}
              style={[styles.row, on && { borderWidth: 2 }]}>
              <Monogram initials={c.initials} color={theme.inkSecondary} size={44} />
              <View style={{ flex: 1 }}>
                <AppText variant="bodyStrong">{c.name}</AppText>
                <AppText variant="small" color="inkSecondary">
                  {tr(c.relation)} ·{' '}
                  {tr({ de: 'Vorschlag', en: 'suggested' })} {euro(c.monthly, lang)}
                  {tr({ de: ' / Monat', en: ' / month' })}
                </AppText>
              </View>
              {already ? (
                <AppText variant="caption" color="inkTertiary">
                  {tr({ de: 'dabei', en: 'joined' })}
                </AppText>
              ) : (
                <View style={[styles.check, { borderColor: on ? theme.brand : theme.lineStrong, backgroundColor: on ? theme.brand : 'transparent' }]}>
                  {on ? <Icon name="checkmark" size={14} color={theme.onBrand} /> : null}
                </View>
              )}
            </Card>
          );
        })}
      </View>

      <View style={styles.note}>
        <Icon name="information-circle-outline" size={14} color={theme.inkTertiary} />
        <AppText variant="caption" color="inkTertiary" style={{ flex: 1 }}>
          {tr({
            de: 'In dieser Vorschau treten Eingeladene sofort bei, damit du die gemeinsame Wirkung sehen kannst.',
            en: 'In this preview, invitees join straight away so you can see the shared impact.',
          })}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  crest: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginTop: Spacing.base },
  list: { marginTop: Spacing.xl, gap: Spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  note: { flexDirection: 'row', gap: 6, alignItems: 'flex-start', marginTop: Spacing.lg },
});
