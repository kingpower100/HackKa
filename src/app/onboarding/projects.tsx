import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { Spacing } from '@/constants/theme';
import { projectsByCategories } from '@/data/projects';
import { euro } from '@/lib/format';
import { useTr } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import { rebalance, useStore } from '@/store/app-store';

export default function ChooseProjects() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const { state, setAllocations } = useStore();
  const [selected, setSelected] = useState<string[]>([]);

  const list = useMemo(
    () => projectsByCategories(state.topThemes, state.scope),
    [state.topThemes, state.scope]
  );

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function proceed() {
    setAllocations(rebalance(selected.map((id) => ({ projectId: id, share: 0 }))));
    router.push('/onboarding/impact');
  }

  const amount = state.contribution?.amount ?? 0;

  return (
    <Screen
      scroll
      footer={
        <View style={{ gap: Spacing.sm }}>
          {selected.length > 0 ? (
            <AppText variant="small" color="inkSecondary" center>
              {tr({
                de: `${euro(amount, 'de')} gleichmäßig auf ${selected.length} ${
                  selected.length === 1 ? 'Projekt' : 'Projekte'
                } verteilt`,
                en: `${euro(amount, 'en')} shared equally across ${selected.length} ${
                  selected.length === 1 ? 'project' : 'projects'
                }`,
              })}
            </AppText>
          ) : null}
          <Button
            title={
              selected.length
                ? tr({ de: 'Weiter', en: 'Continue' })
                : tr({ de: 'Wähle mindestens ein Projekt', en: 'Choose at least one project' })
            }
            iconRight={selected.length ? 'arrow-forward' : undefined}
            disabled={selected.length === 0}
            onPress={proceed}
          />
        </View>
      }>
      <TopBar onBack={() => router.back()} />

      <AppText variant="label" color="brandInk">
        {tr({ de: 'Für dich ausgewählt', en: 'Chosen for you' })}
      </AppText>
      <AppText variant="display" style={{ marginTop: Spacing.sm }}>
        {tr({ de: 'Wähle, wofür du stehst.', en: 'Choose what you stand for.' })}
      </AppText>
      <AppText variant="body" color="inkSecondary" style={{ marginTop: Spacing.sm }}>
        {tr({
          de: 'Geprüfte Projekte, die zu deinem Profil passen. Du kannst eines oder mehrere unterstützen und deinen Beitrag aufteilen.',
          en: 'Vetted projects that match your profile. You can back one or several and split your contribution between them.',
        })}
      </AppText>

      <View style={[styles.trust, { borderColor: theme.line }]}>
        <Icon name="shield-checkmark" size={16} color={theme.brandInk} />
        <AppText variant="small" color="inkSecondary" style={{ flex: 1 }}>
          {tr({
            de: 'Jedes Projekt ist verifiziert und verspricht, regelmäßig zu zeigen, was mit deinem Geld passiert.',
            en: 'Every project is verified and commits to showing you regularly what your money makes possible.',
          })}
        </AppText>
      </View>

      <View style={styles.list}>
        {list.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            selected={selected.includes(p.id)}
            onPress={() => toggle(p.id)}
          />
        ))}
      </View>

      {/* Off-ramp: nichts Passendes dabei? Eigenes Ding starten oder beraten lassen. */}
      <Card surface="surfaceAlt" style={styles.offramp}>
        <AppText variant="label" color="inkTertiary">
          {tr({ de: 'Nichts Passendes dabei?', en: 'Nothing that fits?' })}
        </AppText>
        <AppText variant="bodyStrong" style={{ marginTop: 4 }}>
          {tr({ de: 'Gestalte dein eigenes Ding.', en: 'Shape your own thing.' })}
        </AppText>
        <AppText variant="small" color="inkSecondary" style={{ marginTop: 4 }}>
          {tr({
            de: 'Du musst dich für keines dieser Projekte entscheiden. Starte deinen eigenen Impact-Fonds oder lass dich von einem Menschen beraten.',
            en: 'You do not have to choose one of these projects. Start your own impact fund or get advice from a real person.',
          })}
        </AppText>
        <View style={styles.offrampActions}>
          <Button
            title={tr({ de: 'Eigenen Impact-Fonds starten', en: 'Start your own impact fund' })}
            variant="secondary"
            icon="ribbon-outline"
            onPress={() => router.replace('/mission')}
          />
          <Button
            title={tr({ de: 'Mit einer Beraterin sprechen', en: 'Talk to an advisor' })}
            variant="ghost"
            icon="chatbubbles-outline"
            onPress={() => router.push('/advisor')}
          />
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  trust: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
  list: { marginTop: Spacing.lg, gap: Spacing.base },
  offramp: { marginTop: Spacing.xl },
  offrampActions: { marginTop: Spacing.base, gap: Spacing.sm },
});
