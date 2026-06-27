import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Monogram } from '@/components/ui/monogram';
import { Pill } from '@/components/ui/pill';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section';
import { AppText } from '@/components/ui/text';
import { BottomTabHeight, Categories, Radius, Spacing } from '@/constants/theme';
import { buildAgentFeed } from '@/data/agent';
import { getProject } from '@/data/projects';
import { euro, impactUnits } from '@/lib/format';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage, useTr } from '@/hooks/use-language';
import { allocationAmount, useStore } from '@/store/app-store';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { state, stage } = useStore();

  const headlineProject =
    [...state.allocations].sort((a, b) => b.share - a.share).map((a) => getProject(a.projectId))[0] ??
    getProject('aufwind')!;
  const headlineUnits = impactUnits(
    state.totalGiven,
    headlineProject.impact.per,
    tr(headlineProject.impact.unit),
    tr(headlineProject.impact.unitPlural)
  );

  const agentCount = buildAgentFeed(
    {
      topThemes: state.topThemes,
      allocationIds: state.allocations.map((a) => a.projectId),
      monthsActive: state.monthsActive,
      hasContributed: state.totalGiven > 0,
      fundName: state.fundName,
      circleCount: state.circle.filter((m) => m.status === 'aktiv').length,
      totalGiven: state.totalGiven,
    },
    lang
  ).length;

  return (
    <Screen scroll contentStyle={{ paddingBottom: BottomTabHeight + Spacing.xxl }}>
      {/* Greeting */}
      <View style={styles.greet}>
        <View style={{ flex: 1 }}>
          <AppText variant="callout" color="inkSecondary">
            {tr({ de: 'Schön, dass du da bist', en: 'Good to have you here' })}
          </AppText>
          <AppText variant="title">{tr(stage.title)}</AppText>
        </View>
        <Pill
          label={tr({ de: `Stufe ${stage.level}`, en: `Level ${stage.level}` })}
          bg={theme.surfaceAlt}
          color={theme.inkSecondary}
          icon="leaf-outline"
        />
      </View>

      {/* Impact hero, navy feature surface */}
      <Animated.View entering={FadeInDown.duration(450)}>
        <Card surface="feature" borderColor="transparent" elevated style={styles.hero}>
          <AppText variant="label" style={{ color: theme.onFeatureDim }}>
            {tr({ de: 'Deine Wirkung bisher', en: 'Your impact so far' })}
          </AppText>
          <AppText
            variant="display"
            style={{ fontSize: 52, lineHeight: 58, marginTop: Spacing.xs, color: theme.onFeature }}>
            {euro(state.totalGiven, lang)}
          </AppText>
          {state.contribution?.type === 'monthly' ? (
            <AppText variant="small" style={{ color: theme.onFeatureDim }}>
              {tr({
                de: `${euro(state.contribution.amount, lang)} pro Monat · aktiv`,
                en: `${euro(state.contribution.amount, lang)} per month · active`,
              })}
            </AppText>
          ) : (
            <AppText variant="small" style={{ color: theme.onFeatureDim }}>
              {tr({ de: 'Einmal-Einsatz · wirksam', en: 'One-off contribution · making a difference' })}
            </AppText>
          )}

          <View style={styles.equiv}>
            <View style={[styles.equivIcon, { backgroundColor: theme.brand }]}>
              <Icon name="checkmark" size={14} color={theme.onBrand} />
            </View>
            <AppText variant="small" style={{ flex: 1, color: theme.onFeature }}>
              {tr({
                de: `Das sind ${headlineUnits.count}× ${headlineUnits.label}.`,
                en: `That’s ${headlineUnits.count}× ${headlineUnits.label}.`,
              })}
            </AppText>
          </View>
        </Card>
      </Animated.View>

      {/* Impact moment teaser */}
      <Animated.View entering={FadeInDown.delay(120).duration(450)}>
        <Card surface="goldSoft" borderColor="transparent" onPress={() => router.push('/impact-moment')} style={styles.moment}>
          <View style={[styles.momentIcon, { backgroundColor: theme.gold }]}>
            <Icon name="albums" size={22} color={theme.onFeature} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText variant="label" color="goldInk">
              {tr({ de: 'Neu für dich', en: 'New for you' })}
            </AppText>
            <AppText variant="subtitle" style={{ marginTop: 2 }}>
              {tr({ de: 'Dein Impact-Moment ist da', en: 'Your impact moment is here' })}
            </AppText>
            <AppText variant="small" color="inkSecondary">
              {tr({
                de: 'Das hat dein Geld diesen Monat bewirkt. Swipe dich durch.',
                en: 'Here’s what your giving did this month. Swipe through.',
              })}
            </AppText>
          </View>
          <Icon name="chevron-forward" size={20} color={theme.inkTertiary} />
        </Card>
      </Animated.View>

      {/* Your projects */}
      <View style={styles.section}>
        <SectionHeader
          title={tr({ de: 'Deine Projekte', en: 'Your projects' })}
          actionLabel={tr({ de: 'Mehr entdecken', en: 'Discover more' })}
          onAction={() => router.push('/discover')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hScroll}
          style={{ marginHorizontal: -Spacing.lg }}>
          {state.allocations.map((alloc) => {
            const p = getProject(alloc.projectId);
            if (!p) return null;
            return (
              <Card key={p.id} onPress={() => router.push(`/project/${p.id}`)} style={styles.miniCard} padded={false}>
                <View style={{ padding: Spacing.base }}>
                  <Monogram initials={p.hero.initials} category={p.category} size={46} />
                  <AppText variant="subtitle" numberOfLines={1} style={{ marginTop: Spacing.md }}>
                    {tr(p.name)}
                  </AppText>
                  <AppText variant="small" color="inkSecondary" numberOfLines={2}>
                    {p.hero.name} · {tr(p.location)}
                  </AppText>
                  <View style={[styles.miniFoot, { borderTopColor: theme.line }]}>
                    <AppText variant="bodyStrong" style={{ color: Categories[p.category].color }}>
                      {euro(allocationAmount(state, p.id), lang)}
                    </AppText>
                    <Pill
                      label={tr({ de: 'Update bald', en: 'Update soon' })}
                      bg={theme.surfaceAlt}
                      color={theme.inkSecondary}
                      icon="time-outline"
                    />
                  </View>
                </View>
              </Card>
            );
          })}
          <Card onPress={() => router.push('/discover')} style={[styles.miniCard, styles.addCard]} borderColor={theme.lineStrong}>
            <Icon name="add-circle-outline" size={28} color={theme.brand} />
            <AppText variant="small" color="brandInk" center style={{ marginTop: Spacing.sm }}>
              {tr({ de: `Projekt${'\n'}hinzufügen`, en: `Add${'\n'}project` })}
            </AppText>
          </Card>
        </ScrollView>
      </View>

      {/* Impact fund status */}
      <View style={styles.section}>
        {state.fundName ? (
          <Card onPress={() => router.push('/mission')} style={styles.missionRow}>
            <View style={[styles.missionIcon, { backgroundColor: theme.brandSoft }]}>
              <Icon name="ribbon" size={22} color={theme.brandInk} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="label" color="inkTertiary">
                {tr({ de: 'Dein Impact-Fonds', en: 'Your impact fund' })}
              </AppText>
              <AppText variant="subtitle">{state.fundName}</AppText>
              <AppText variant="small" color="inkSecondary">
                {tr({
                  de: `${state.circle.filter((m) => m.status === 'aktiv').length} im Kreis · gemeinsam aktiv`,
                  en: `${state.circle.filter((m) => m.status === 'aktiv').length} in your circle · active together`,
                })}
              </AppText>
            </View>
            <Icon name="chevron-forward" size={20} color={theme.inkTertiary} />
          </Card>
        ) : (
          <Card onPress={() => router.push('/name-mission')} surface="brandSoft" borderColor="transparent" style={styles.missionRow}>
            <View style={[styles.missionIcon, { backgroundColor: theme.brand }]}>
              <Icon name="sparkles" size={20} color={theme.onBrand} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="subtitle">{tr({ de: 'Gründe deinen Impact-Fonds', en: 'Start your impact fund' })}</AppText>
              <AppText variant="small" color="inkSecondary">
                {tr({
                  de: 'Mach dein Engagement zu etwas Eigenem. Gib ihm einen Namen.',
                  en: 'Make your giving something of your own. Give it a name.',
                })}
              </AppText>
            </View>
            <Icon name="chevron-forward" size={20} color={theme.brandInk} />
          </Card>
        )}
      </View>

      {/* Agent teaser */}
      <Card onPress={() => router.push('/agent')} style={styles.agentRow}>
        <View style={[styles.missionIcon, { backgroundColor: theme.ink }]}>
          <Icon name="sparkles" size={20} color={theme.bg} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText variant="bodyStrong">{tr({ de: 'Dein Impact-Agent', en: 'Your impact agent' })}</AppText>
          <AppText variant="small" color="inkSecondary">
            {agentCount > 0
              ? tr({
                  de: `${agentCount} ruhige Vorschläge für dich`,
                  en: `${agentCount} quiet suggestions for you`,
                })
              : tr({ de: 'Alles im Blick, nichts zu tun', en: 'All in view, nothing to do' })}
          </AppText>
        </View>
        <Icon name="chevron-forward" size={20} color={theme.inkTertiary} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  greet: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.md, marginBottom: Spacing.lg },
  hero: { paddingVertical: Spacing.xl },
  equiv: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  equivIcon: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  moment: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginTop: Spacing.base },
  momentIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  section: { marginTop: Spacing.xl },
  hScroll: { paddingHorizontal: Spacing.lg, gap: Spacing.md, paddingTop: Spacing.base },
  miniCard: { width: 220 },
  miniFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  addCard: { alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', width: 150 },
  missionRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  missionIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  agentRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginTop: Spacing.base },
});
