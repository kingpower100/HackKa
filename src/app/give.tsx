import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { AmountSlider } from '@/components/ui/amount-slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Monogram } from '@/components/ui/monogram';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { Categories, Radius, Spacing } from '@/constants/theme';
import { getProject } from '@/data/projects';
import type { Project } from '@/data/types';
import { euro, impactUnits } from '@/lib/format';
import { useLanguage, useTr } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import { useStore } from '@/store/app-store';

export default function Give() {
  const { project: projectId } = useLocalSearchParams<{ project?: string }>();
  const project = projectId ? getProject(projectId) : undefined;
  return project ? <GiveToProject project={project} /> : <EditContribution />;
}

function GiveToProject({ project }: { project: Project }) {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { giveOneOff } = useStore();
  const [amount, setAmount] = useState(100);
  const [done, setDone] = useState(false);
  const units = impactUnits(amount, project.impact.per, tr(project.impact.unit), tr(project.impact.unitPlural));

  if (done) {
    return (
      <Screen footer={<Button title={tr({ de: 'Fertig', en: 'Done' })} onPress={() => router.back()} />}>
        <TopBar onClose={() => router.back()} />
        <View style={styles.success}>
          <Animated.View entering={FadeIn.duration(420)} style={[styles.seal, { backgroundColor: theme.brand }]}>
            <Icon name="checkmark" size={34} color={theme.onBrand} />
          </Animated.View>
          <AppText variant="display" center style={{ marginTop: Spacing.lg }}>
            {tr({ de: 'Sofort wirksam.', en: 'Felt straight away.' })}
          </AppText>
          <AppText variant="headline" center style={{ marginTop: Spacing.sm, color: Categories[project.category].color }}>
            {units.count}× {units.label}
          </AppText>
          <AppText variant="callout" color="inkSecondary" center style={{ marginTop: Spacing.sm }}>
            {tr({
              de: `Dein Beitrag an ${tr(project.name)} ist angekommen. Die echte Update-Story folgt bald.`,
              en: `Your contribution to ${tr(project.name)} has arrived. The real update story follows soon.`,
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
          title={tr({ de: `${euro(amount, lang)} jetzt geben`, en: `Give ${euro(amount, lang)} now` })}
          icon="heart"
          onPress={() => {
            giveOneOff(project.id, amount);
            setDone(true);
          }}
        />
      }>
      <TopBar onClose={() => router.back()} />
      <View style={styles.projectHead}>
        <Monogram initials={project.hero.initials} category={project.category} size={52} />
        <View style={{ flex: 1 }}>
          <AppText variant="label" color="inkTertiary">
            {tr({ de: 'Du unterstützt', en: 'You are supporting' })}
          </AppText>
          <AppText variant="subtitle">{tr(project.name)}</AppText>
        </View>
      </View>

      <AppText variant="display" style={{ marginTop: Spacing.lg }}>
        {tr({ de: `Wie viel möchtest${'\n'}du geben?`, en: `How much would${'\n'}you like to give?` })}
      </AppText>

      <Card elevated style={styles.amountCard}>
        <AppText variant="display" center style={{ fontSize: 48, lineHeight: 54 }}>
          {euro(amount, lang)}
        </AppText>
        <View style={{ marginTop: Spacing.lg }}>
          <AmountSlider value={amount} min={10} max={2000} step={10} onChange={setAmount} />
        </View>
        <View style={styles.presets}>
          {[50, 100, 250, 500].map((p) => {
            const on = amount === p;
            return (
              <Pressable
                key={p}
                onPress={() => setAmount(p)}
                style={[styles.preset, { borderColor: on ? theme.brand : theme.line, backgroundColor: on ? theme.brandSoft : 'transparent' }]}>
                <AppText variant="small" style={{ color: on ? theme.brandInk : theme.inkSecondary, fontWeight: '600' }}>
                  {euro(p, lang)}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Card surface="brandSoft" borderColor="transparent" style={styles.preview}>
        <Icon name="sparkles" size={20} color={theme.brandInk} />
        <AppText variant="callout" style={{ flex: 1, color: theme.brandInk }}>
          {tr({ de: 'Das bewirkt sofort: ', en: 'That makes an immediate difference: ' })}
          {units.count}× {units.label}.
        </AppText>
      </Card>
    </Screen>
  );
}

function EditContribution() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { state, setContribution } = useStore();
  const [amount, setAmount] = useState(state.contribution?.amount ?? 50);
  const [roundup, setRoundup] = useState(state.contribution?.roundup ?? false);
  const type = state.contribution?.type ?? 'monthly';

  return (
    <Screen
      footer={
        <Button
          title={tr({ de: 'Speichern', en: 'Save' })}
          onPress={() => {
            setContribution({ type, amount, roundup });
            router.back();
          }}
        />
      }>
      <TopBar onClose={() => router.back()} title={tr({ de: 'Beitrag anpassen', en: 'Adjust contribution' })} />
      <Card elevated style={styles.amountCard}>
        <AppText variant="display" center style={{ fontSize: 48, lineHeight: 54 }}>
          {euro(amount, lang)}
        </AppText>
        <AppText variant="small" color="inkTertiary" center>
          {type === 'monthly' ? tr({ de: 'pro Monat', en: 'per month' }) : tr({ de: 'einmalig', en: 'one-off' })}
        </AppText>
        <View style={{ marginTop: Spacing.lg }}>
          <AmountSlider value={amount} min={10} max={1000} step={10} onChange={setAmount} />
        </View>
      </Card>

      <Card style={styles.roundup}>
        <View style={{ flex: 1 }}>
          <AppText variant="bodyStrong">{tr({ de: 'Alltagskäufe aufrunden', en: 'Round up everyday purchases' })}</AppText>
          <AppText variant="small" color="inkSecondary" style={{ marginTop: 4 }}>
            {tr({
              de: 'Die Differenz fließt zusätzlich in deinen Topf.',
              en: 'The difference flows into your fund on top.',
            })}
          </AppText>
        </View>
        <Switch value={roundup} onValueChange={setRoundup} trackColor={{ true: theme.brand, false: theme.lineStrong }} thumbColor="#fff" />
      </Card>

      <View style={styles.reassure}>
        <Icon name="lock-open-outline" size={15} color={theme.inkTertiary} />
        <AppText variant="caption" color="inkTertiary">
          {tr({ de: 'Jederzeit änderbar oder pausierbar.', en: 'Change or pause it any time.' })}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  projectHead: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginTop: Spacing.sm },
  amountCard: { marginTop: Spacing.lg, paddingVertical: Spacing.xl },
  presets: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg, justifyContent: 'space-between' },
  preset: { flex: 1, paddingVertical: 10, borderRadius: Radius.pill, borderWidth: 1.5, alignItems: 'center' },
  preview: { flexDirection: 'row', gap: Spacing.md, alignItems: 'center', marginTop: Spacing.lg },
  success: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  seal: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  roundup: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginTop: Spacing.lg },
  reassure: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, justifyContent: 'center', marginTop: Spacing.lg },
});
