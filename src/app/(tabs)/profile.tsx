import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Icon, type IconName } from '@/components/ui/icon';
import { Monogram } from '@/components/ui/monogram';
import { Pill } from '@/components/ui/pill';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { BottomTabHeight, Categories, Radius, Spacing } from '@/constants/theme';
import { euro } from '@/lib/format';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage, useTr } from '@/hooks/use-language';
import { useStore } from '@/store/app-store';
import type { Lang } from '@/i18n/types';

export default function Profile() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { state, stage, advanceMonth, reset, setLanguage } = useStore();

  const stats: { value: string; label: string }[] = [
    { value: euro(state.totalGiven, lang), label: tr({ de: 'bewegt', en: 'moved' }) },
    {
      value: `${state.monthsActive}`,
      label:
        state.monthsActive === 1
          ? tr({ de: 'Monat aktiv', en: 'month active' })
          : tr({ de: 'Monate aktiv', en: 'months active' }),
    },
    { value: `${state.allocations.length}`, label: tr({ de: 'Projekte', en: 'Projects' }) },
    {
      value: `${state.circle.filter((m) => m.status === 'aktiv').length}`,
      label: tr({ de: 'im Kreis', en: 'in circle' }),
    },
  ];

  return (
    <Screen scroll contentStyle={{ paddingBottom: BottomTabHeight + Spacing.xxl }}>
      {/* Header */}
      <View style={[styles.header, { marginTop: Spacing.md }]}>
        <Monogram initials="DU" color={theme.brand} size={64} />
        <View style={{ flex: 1 }}>
          <AppText variant="title">{tr({ de: 'Dein Profil', en: 'Your profile' })}</AppText>
          <Pill label={tr(stage.title)} bg={theme.surfaceAlt} color={theme.inkSecondary} icon="leaf-outline" />
        </View>
        <Pressable hitSlop={8} onPress={() => {}}>
          <Icon name="share-outline" size={22} color={theme.inkSecondary} />
        </Pressable>
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        {stats.map((s) => (
          <Card key={s.label} style={styles.statBox}>
            <AppText variant="headline">{s.value}</AppText>
            <AppText variant="caption" color="inkTertiary">
              {s.label}
            </AppText>
          </Card>
        ))}
      </View>

      {/* Archetype, navy identity surface */}
      {state.archetype ? (
        <Card surface="feature" borderColor="transparent" elevated style={styles.archetype}>
          <AppText variant="label" style={{ color: theme.brand }}>
            {tr({ de: 'Deine Haltung', en: 'Your stance' })}
          </AppText>
          <AppText variant="displaySm" style={{ marginTop: Spacing.sm, color: theme.onFeature }}>
            {tr(state.archetype.title)}
          </AppText>
          <AppText variant="callout" style={{ marginTop: Spacing.sm, color: theme.onFeatureDim }}>
            {tr(state.archetype.essence)}
          </AppText>
          <View style={styles.chips}>
            {state.topThemes.map((k) => (
              <Pill key={k} label={tr(Categories[k].label)} bg="rgba(255,255,255,0.10)" color={theme.onFeature} />
            ))}
          </View>
        </Card>
      ) : null}

      {/* Settings */}
      <View style={styles.section}>
        <AppText variant="headline" style={{ marginBottom: Spacing.base }}>
          {tr({ de: 'Dein Beitrag', en: 'Your contribution' })}
        </AppText>
        <Card padded={false}>
          <Row
            icon="repeat"
            title={
              state.contribution?.type === 'monthly'
                ? tr({ de: 'Monatlicher Beitrag', en: 'Monthly contribution' })
                : tr({ de: 'Einmal-Einsatz', en: 'One-off contribution' })
            }
            value={
              state.contribution
                ? euro(state.contribution.amount, lang)
                : tr({ de: 'offen', en: 'open' })
            }
            onPress={() => router.push('/give')}
          />
          <Divider />
          <Row
            icon="document-text-outline"
            title={tr({ de: 'Spendenbescheinigung', en: 'Donation receipt' })}
            value={tr({ de: 'Jährlich', en: 'Yearly' })}
            onPress={() => {}}
          />
        </Card>
      </View>

      {/* Language */}
      <View style={styles.section}>
        <AppText variant="headline" style={{ marginBottom: Spacing.base }}>
          {tr({ de: 'Sprache', en: 'Language' })}
        </AppText>
        <View style={[styles.segment, { backgroundColor: theme.surfaceSunken }]}>
          {(['de', 'en'] as Lang[]).map((l) => {
            const on = lang === l;
            return (
              <Pressable
                key={l}
                onPress={() => setLanguage(l)}
                style={[styles.segItem, on && { backgroundColor: theme.surface }]}>
                <AppText
                  variant="small"
                  style={{ color: on ? theme.ink : theme.inkSecondary, fontWeight: '700' }}>
                  {l === 'de' ? 'Deutsch' : 'English'}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Trust */}
      <Card surface="surfaceAlt" style={styles.trust}>
        <Icon name="shield-checkmark" size={20} color={theme.brandInk} />
        <View style={{ flex: 1 }}>
          <AppText variant="bodyStrong">{tr({ de: 'Sicher verwahrt', en: 'Safely held' })}</AppText>
          <AppText variant="small" color="inkSecondary">
            {tr({
              de: 'Deine Beiträge liegen treuhänderisch bei einem regulierten Partner. Auszahlung und Änderung jederzeit. Nichts ist für immer gebunden.',
              en: 'Your contributions are held in trust with a regulated partner. Payout and changes any time. Nothing is bound forever.',
            })}
          </AppText>
        </View>
      </Card>

      {/* Demo controls */}
      <View style={styles.section}>
        <AppText variant="label" color="inkTertiary" style={{ marginBottom: Spacing.sm }}>
          {tr({ de: 'Vorschau', en: 'Preview' })}
        </AppText>
        <Card padded={false}>
          <Row
            icon="play-forward-outline"
            title={tr({ de: 'Nächsten Monat simulieren', en: 'Simulate next month' })}
            value=""
            onPress={advanceMonth}
          />
          <Divider />
          <Row
            icon="refresh-outline"
            title={tr({ de: 'Reise von vorn beginnen', en: 'Start the journey over' })}
            value=""
            danger
            onPress={() => {
              reset();
              router.replace('/onboarding');
            }}
          />
        </Card>
      </View>
    </Screen>
  );
}

function Row({
  icon,
  title,
  value,
  onPress,
  danger,
}: {
  icon: IconName;
  title: string;
  value: string;
  onPress: () => void;
  danger?: boolean;
}) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}>
      <Icon name={icon} size={20} color={danger ? theme.danger : theme.inkSecondary} />
      <AppText variant="body" style={{ flex: 1, color: danger ? theme.danger : theme.ink }}>
        {title}
      </AppText>
      {value ? (
        <AppText variant="callout" color="inkTertiary">
          {value}
        </AppText>
      ) : null}
      <Icon name="chevron-forward" size={18} color={theme.inkTertiary} />
    </Pressable>
  );
}

function Divider() {
  const theme = useTheme();
  return <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: theme.line, marginLeft: 52 }} />;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.xl },
  statBox: { flexBasis: '47.5%', flexGrow: 1 },
  archetype: { marginTop: Spacing.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.base },
  section: { marginTop: Spacing.xl },
  segment: { flexDirection: 'row', borderRadius: Radius.pill, padding: 4 },
  segItem: { flex: 1, paddingVertical: 10, borderRadius: Radius.pill, alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base, padding: Spacing.base },
  trust: { flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-start', marginTop: Spacing.lg },
});
