import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Monogram } from '@/components/ui/monogram';
import { Pill } from '@/components/ui/pill';
import { AppText } from '@/components/ui/text';
import { VerifiedBadge } from '@/components/ui/badge';
import { Categories, categoryTint, Radius, Spacing } from '@/constants/theme';
import { getProject } from '@/data/projects';
import { buildMoneyJourney } from '@/data/money-journey';
import { euro } from '@/lib/format';
import { useLanguage, useTr } from '@/hooks/use-language';
import { useScheme, useTheme } from '@/hooks/use-theme';
import { Screen } from '@/components/ui/screen';
import { TopBar } from '@/components/ui/top-bar';
import { useStore } from '@/store/app-store';

export default function ProjectDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const scheme = useScheme();
  const tr = useTr();
  const lang = useLanguage();
  const { state } = useStore();

  const project = getProject(id);
  if (!project) {
    return (
      <Screen>
        <TopBar onBack={() => router.back()} title={tr({ de: 'Projekt', en: 'Project' })} />
        <AppText variant="body" color="inkSecondary">
          {tr({ de: 'Dieses Projekt ist nicht verfügbar.', en: 'This project is not available.' })}
        </AppText>
      </Screen>
    );
  }

  const cat = Categories[project.category];
  const alreadyIn = state.allocations.some((a) => a.projectId === project.id);
  const journey = alreadyIn ? buildMoneyJourney(state, lang) : [];

  return (
    <Screen
      scroll
      padded={false}
      footer={
        <Button
          title={
            alreadyIn
              ? tr({ de: 'Mehr für dieses Projekt geben', en: 'Give more to this project' })
              : tr({ de: 'Dieses Projekt unterstützen', en: 'Support this project' })
          }
          icon={alreadyIn ? 'add' : 'heart'}
          onPress={() => router.push(`/give?project=${project.id}`)}
        />
      }>
      <View style={{ paddingHorizontal: Spacing.lg }}>
        <TopBar onBack={() => router.back()} />
      </View>

      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: categoryTint(project.category, scheme) }]}>
        <Monogram initials={project.hero.initials} category={project.category} size={72} />
        <Pill label={tr(cat.label)} bg={theme.surface} color={cat.color} style={{ marginTop: Spacing.base }} />
        <AppText variant="display" center style={{ marginTop: Spacing.sm }}>
          {tr(project.name)}
        </AppText>
        <View style={styles.metaRow}>
          <Icon name="location-outline" size={14} color={theme.inkSecondary} />
          <AppText variant="small" color="inkSecondary">
            {tr(project.location)} · {tr({ de: 'seit', en: 'since' })} {project.founded}
          </AppText>
        </View>
        {alreadyIn ? (
          <Pill
            label={tr({ de: 'Du bist dabei', en: 'You are in' })}
            bg={theme.brand}
            color={theme.onBrand}
            icon="checkmark"
            style={{ marginTop: Spacing.md }}
          />
        ) : null}
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg }}>
        {/* Hero story */}
        <Card surface="surfaceAlt" style={styles.story}>
          <View style={styles.storyHead}>
            <Monogram initials={project.hero.initials} category={project.category} size={44} />
            <View style={{ flex: 1 }}>
              <AppText variant="bodyStrong">{project.hero.name}</AppText>
              <AppText variant="small" color="inkSecondary">
                {tr(project.hero.role)}
              </AppText>
            </View>
          </View>
          <AppText variant="body" style={{ marginTop: Spacing.md }}>
            {tr(project.hero.line)}
          </AppText>
        </Card>

        <AppText variant="headline" style={{ marginTop: Spacing.xl }}>
          {tr(project.tagline)}
        </AppText>
        <AppText variant="body" color="inkSecondary" style={{ marginTop: Spacing.sm }}>
          {tr(project.about)}
        </AppText>

        {/* Impact mapping */}
        <Card surface="brandSoft" borderColor="transparent" style={styles.impact}>
          <AppText variant="label" color="brandInk">
            {tr({ de: 'Was dein Geld konkret tut', en: 'What your money actually does' })}
          </AppText>
          <View style={styles.impactRow}>
            <View style={[styles.impactIcon, { backgroundColor: theme.brand }]}>
              <Icon name="checkmark" size={18} color={theme.onBrand} />
            </View>
            <AppText variant="subtitle" style={{ flex: 1 }}>
              {euro(project.impact.per, lang)} = 1 {tr(project.impact.unit)}
            </AppText>
          </View>
          <AppText variant="small" color="inkSecondary">
            {tr({
              de: 'Kein Prozentwert, kein Klein­gedrucktes, ein garantierter, greifbarer Gegenwert.',
              en: 'No percentages, no small print. One guaranteed, tangible value for value.',
            })}
          </AppText>
        </Card>

        {/* Trust */}
        <View style={styles.section}>
          <AppText variant="headline" style={{ marginBottom: Spacing.md }}>
            {tr({ de: 'Warum du vertrauen kannst', en: 'Why you can trust this' })}
          </AppText>
          <Card>
            <VerifiedBadge />
            <View style={{ marginTop: Spacing.md, gap: Spacing.md }}>
              {tr(project.proof).map((p) => (
                <View key={p} style={styles.proofRow}>
                  <Icon name="checkmark-circle" size={18} color={theme.brand} />
                  <AppText variant="callout" style={{ flex: 1 }}>
                    {p}
                  </AppText>
                </View>
              ))}
              <View style={[styles.cadence, { backgroundColor: theme.surfaceSunken }]}>
                <Icon name="time-outline" size={16} color={theme.inkSecondary} />
                <AppText variant="small" color="inkSecondary" style={{ flex: 1 }}>
                  {tr(project.reportCadence)}
                  {tr({ de: '. Du siehst regelmäßig, was passiert ist.', en: '. You regularly see what has happened.' })}
                </AppText>
              </View>
            </View>
          </Card>
        </View>

        {/* Money journey: wo dein Geld gerade ist (nur für eigene Projekte) */}
        {alreadyIn ? (
          <View style={styles.section}>
            <AppText variant="headline" style={{ marginBottom: Spacing.md }}>
              {tr({ de: 'Wo dein Geld gerade ist', en: 'Where your money is right now' })}
            </AppText>
            <Card>
              {journey.map((step, i) => {
                const done = step.status === 'done';
                const isCurrent = step.status === 'current';
                const isLast = i === journey.length - 1;
                return (
                  <View key={step.key} style={styles.journeyRow}>
                    <View style={styles.journeyRail}>
                      <View
                        style={[
                          styles.stepDot,
                          {
                            backgroundColor: done || isCurrent ? theme.brand : theme.surfaceSunken,
                            borderColor: isCurrent ? theme.gold : 'transparent',
                            borderWidth: isCurrent ? 2 : 0,
                          },
                        ]}>
                        {done ? <Icon name="checkmark" size={13} color={theme.onBrand} /> : null}
                      </View>
                      {!isLast ? (
                        <View style={[styles.connector, { backgroundColor: theme.line }]} />
                      ) : null}
                    </View>
                    <View style={{ flex: 1, paddingBottom: isLast ? 0 : Spacing.lg }}>
                      <View style={styles.journeyHead}>
                        <AppText
                          variant="bodyStrong"
                          color={done || isCurrent ? 'ink' : 'inkTertiary'}
                          style={{ flex: 1 }}>
                          {step.title}
                        </AppText>
                        {isCurrent ? (
                          <Pill label={tr({ de: 'Jetzt', en: 'Now' })} bg={theme.goldSoft} color={theme.goldInk} />
                        ) : null}
                      </View>
                      {isCurrent ? (
                        <AppText variant="small" color="inkSecondary" style={{ marginTop: 2 }}>
                          {step.desc}
                        </AppText>
                      ) : null}
                    </View>
                  </View>
                );
              })}
              <View style={[styles.cadence, { backgroundColor: theme.surfaceSunken, marginTop: Spacing.sm }]}>
                <Icon name="lock-closed" size={16} color={theme.inkSecondary} />
                <AppText variant="small" color="inkSecondary" style={{ flex: 1 }}>
                  {tr({
                    de: 'Bis dein Geld wirkt, liegt es treuhänderisch beim regulierten Partner. Auszahlung und Änderung jederzeit.',
                    en: 'Until your money has impact, it is held in trust with the regulated partner. Payout and changes any time.',
                  })}
                </AppText>
              </View>
            </Card>
          </View>
        ) : null}

        {/* Facts */}
        <View style={styles.facts}>
          <Card style={styles.factBox}>
            <AppText variant="caption" color="inkTertiary">
              {tr({ de: 'Wer profitiert', en: 'Who benefits' })}
            </AppText>
            <AppText variant="bodyStrong" style={{ marginTop: 4 }}>
              {tr(project.recipients)}
            </AppText>
          </Card>
          <Card style={styles.factBox}>
            <AppText variant="caption" color="inkTertiary">
              {tr({ de: 'Träger', en: 'Run by' })}
            </AppText>
            <AppText variant="bodyStrong" style={{ marginTop: 4 }}>
              {tr(project.org)}
            </AppText>
          </Card>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingVertical: Spacing.xl, paddingHorizontal: Spacing.lg },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: Spacing.sm },
  story: {},
  storyHead: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  impact: { marginTop: Spacing.lg },
  impactRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginVertical: Spacing.md },
  impactIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  section: { marginTop: Spacing.xl },
  proofRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  cadence: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.md, borderRadius: Radius.md },
  facts: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg },
  factBox: { flex: 1 },
  journeyRow: { flexDirection: 'row', gap: Spacing.md },
  journeyRail: { alignItems: 'center', width: 26 },
  stepDot: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  connector: { flex: 1, width: 2, marginVertical: 4 },
  journeyHead: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
});
