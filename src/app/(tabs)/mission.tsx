import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Monogram } from '@/components/ui/monogram';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { BottomTabHeight, Categories, Radius, Spacing } from '@/constants/theme';
import { STAGES } from '@/data/levels';
import { getProject } from '@/data/projects';
import { euro } from '@/lib/format';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage, useTr } from '@/hooks/use-language';
import { useStore } from '@/store/app-store';

export default function Mission() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { state, level } = useStore();

  const activeCircle = state.circle.filter((m) => m.status === 'aktiv');
  const circleMonthly = activeCircle.reduce((s, m) => s + m.monthly, 0);

  return (
    <Screen scroll contentStyle={{ paddingBottom: BottomTabHeight + Spacing.xxl }}>
      <AppText variant="label" color="brandInk" style={{ marginTop: Spacing.md }}>
        {state.fundName
          ? tr({ de: 'Dein Impact-Fonds', en: 'Your impact fund' })
          : tr({ de: 'Aus Engagement wird Identität', en: 'Giving becomes identity' })}
      </AppText>

      {state.fundName ? (
        <Animated.View entering={FadeInDown.duration(450)}>
          <Card surface="feature" borderColor="transparent" elevated style={styles.hero}>
            <View style={[styles.ribbon, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
              <Icon name="ribbon" size={22} color={theme.brand} />
            </View>
            <AppText variant="display" center style={{ marginTop: Spacing.base, color: theme.onFeature }}>
              {state.fundName}
            </AppText>
            <AppText variant="small" center style={{ marginTop: 4, color: theme.onFeatureDim }}>
              {tr({
                de: `Gegründet von dir · ${activeCircle.length + 1} im Kreis`,
                en: `Founded by you · ${activeCircle.length + 1} in your circle`,
              })}
            </AppText>
            <View style={[styles.heroStat, { borderTopColor: 'rgba(255,255,255,0.12)' }]}>
              <View style={styles.statCell}>
                <AppText variant="headline" style={{ color: theme.onFeature }}>
                  {euro(state.totalGiven, lang)}
                </AppText>
                <AppText variant="caption" style={{ color: theme.onFeatureDim }}>
                  {tr({ de: 'gemeinsam bewegt', en: 'moved together' })}
                </AppText>
              </View>
              <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.12)' }]} />
              <View style={styles.statCell}>
                <AppText variant="headline" style={{ color: theme.onFeature }}>
                  {state.allocations.length}
                </AppText>
                <AppText variant="caption" style={{ color: theme.onFeatureDim }}>
                  {tr({ de: 'Projekte getragen', en: 'projects supported' })}
                </AppText>
              </View>
            </View>
          </Card>
        </Animated.View>
      ) : (
        <Card surface="brandSoft" borderColor="transparent" style={styles.namePrompt}>
          <AppText variant="display">
            {tr({ de: `Gib deiner Wirkung${'\n'}einen Namen.`, en: `Give your impact${'\n'}a name.` })}
          </AppText>
          <AppText variant="body" color="inkSecondary" style={{ marginTop: Spacing.sm }}>
            {tr({
              de: 'Aus „ich spende manchmal“ wird etwas Eigenes: dein Impact-Fonds. Ab dann gehört dein Engagement dir, mit Namen, Kreis und gemeinsamer Wirkung.',
              en: 'From “I give now and then” grows something of your own: your impact fund. From then on your giving belongs to you, with a name, a circle and shared impact.',
            })}
          </AppText>
          <Button
            title={tr({ de: 'Impact-Fonds gründen', en: 'Start impact fund' })}
            iconRight="arrow-forward"
            style={{ marginTop: Spacing.lg }}
            onPress={() => router.push('/name-mission')}
          />
        </Card>
      )}

      {/* Circle */}
      <View style={styles.section}>
        <AppText variant="headline">{tr({ de: 'Dein Kreis', en: 'Your circle' })}</AppText>
        <AppText variant="callout" color="inkSecondary" style={{ marginTop: 4 }}>
          {tr({
            de: 'Gemeinsam bewegt ihr mehr. Familie, Freunde, gleiche Sache.',
            en: 'Together you move more. Family, friends, one shared cause.',
          })}
        </AppText>

        <Card style={{ marginTop: Spacing.base }}>
          {/* You */}
          <View style={styles.member}>
            <Monogram initials="DU" color={theme.brand} size={44} />
            <View style={{ flex: 1 }}>
              <AppText variant="bodyStrong">{tr({ de: 'Du', en: 'You' })}</AppText>
              <AppText variant="small" color="inkSecondary">
                {state.contribution?.type === 'monthly'
                  ? tr({
                      de: `${euro(state.contribution.amount, lang)} / Monat`,
                      en: `${euro(state.contribution.amount, lang)} / month`,
                    })
                  : tr({ de: 'Einmal-Einsatz', en: 'One-off contribution' })}
              </AppText>
            </View>
            <Icon name="star" size={16} color={theme.gold} />
          </View>

          {activeCircle.map((m) => (
            <View key={m.id} style={[styles.member, { borderTopColor: theme.line, borderTopWidth: StyleSheet.hairlineWidth }]}>
              <Monogram initials={m.initials} color={theme.inkSecondary} size={44} />
              <View style={{ flex: 1 }}>
                <AppText variant="bodyStrong">{m.name}</AppText>
                <AppText variant="small" color="inkSecondary">
                  {m.relation} · {tr({ de: `${euro(m.monthly, lang)} / Monat`, en: `${euro(m.monthly, lang)} / month` })}
                </AppText>
              </View>
              <Icon name="checkmark-circle" size={18} color={theme.brand} />
            </View>
          ))}

          {circleMonthly > 0 ? (
            <View style={[styles.circleSum, { backgroundColor: theme.brandSoft }]}>
              <AppText variant="small" style={{ color: theme.brandInk }}>
                {tr({
                  de: `Dein Kreis steuert ${euro(circleMonthly, lang)} / Monat zusätzlich bei.`,
                  en: `Your circle adds another ${euro(circleMonthly, lang)} / month.`,
                })}
              </AppText>
            </View>
          ) : null}

          <Button
            title={
              !state.fundName
                ? tr({ de: 'Zuerst Impact-Fonds gründen', en: 'Start your impact fund first' })
                : activeCircle.length
                  ? tr({ de: 'Weitere einladen', en: 'Invite more' })
                  : tr({ de: 'Kreis einladen', en: 'Invite circle' })
            }
            variant="secondary"
            icon={state.fundName ? 'person-add-outline' : 'ribbon-outline'}
            style={{ marginTop: Spacing.base }}
            onPress={() => router.push(state.fundName ? '/invite-circle' : '/name-mission')}
          />
        </Card>
      </View>

      {/* Projects under the impact fund */}
      {state.allocations.length ? (
        <View style={styles.section}>
          <AppText variant="headline">{tr({ de: 'Was ihr tragt', en: 'What you carry together' })}</AppText>
          <View style={{ marginTop: Spacing.base, gap: Spacing.sm }}>
            {state.allocations.map((a) => {
              const p = getProject(a.projectId);
              if (!p) return null;
              return (
                <Card key={p.id} onPress={() => router.push(`/project/${p.id}`)} style={styles.projRow} padded={false}>
                  <View style={styles.projInner}>
                    <Monogram initials={p.hero.initials} category={p.category} size={38} />
                    <AppText variant="bodyStrong" style={{ flex: 1 }} numberOfLines={1}>
                      {tr(p.name)}
                    </AppText>
                    <AppText variant="small" style={{ color: Categories[p.category].color, fontWeight: '700' }}>
                      {a.share}%
                    </AppText>
                  </View>
                </Card>
              );
            })}
          </View>
        </View>
      ) : null}

      {/* Stage ladder */}
      <View style={styles.section}>
        <AppText variant="headline">{tr({ de: 'Dein Weg', en: 'Your path' })}</AppText>
        <AppText variant="callout" color="inkSecondary" style={{ marginTop: 4, marginBottom: Spacing.base }}>
          {tr({
            de: 'Nicht wie viel du gibst, sondern wie du wächst.',
            en: 'Not how much you give, but how you grow.',
          })}
        </AppText>
        <Card>
          {STAGES.map((s, i) => {
            const reached = i <= level;
            const isCurrent = i === level;
            return (
              <View key={s.level} style={[styles.stageRow, i > 0 && { borderTopColor: theme.line, borderTopWidth: StyleSheet.hairlineWidth }]}>
                <View
                  style={[
                    styles.stageDot,
                    {
                      backgroundColor: reached ? theme.brand : theme.surfaceSunken,
                      borderColor: isCurrent ? theme.gold : 'transparent',
                      borderWidth: isCurrent ? 2 : 0,
                    },
                  ]}>
                  {reached ? <Icon name="checkmark" size={13} color={theme.onBrand} /> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <AppText variant="bodyStrong" color={reached ? 'ink' : 'inkTertiary'}>
                    {tr(s.title)}
                  </AppText>
                  {isCurrent ? (
                    <AppText variant="small" color="inkSecondary">
                      {tr(s.identity)}
                    </AppText>
                  ) : null}
                </View>
                {isCurrent ? <NowTag /> : null}
              </View>
            );
          })}
        </Card>
      </View>
    </Screen>
  );
}

function NowTag() {
  const theme = useTheme();
  const tr = useTr();
  return (
    <View style={{ backgroundColor: theme.goldSoft, paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.pill }}>
      <AppText variant="caption" style={{ color: theme.goldInk, fontWeight: '700' }}>
        {tr({ de: 'Jetzt', en: 'Now' })}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingVertical: Spacing.xl, marginTop: Spacing.base },
  ribbon: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  heroStat: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
  statCell: { flex: 1, alignItems: 'center' },
  divider: { width: StyleSheet.hairlineWidth },
  namePrompt: { marginTop: Spacing.base },
  section: { marginTop: Spacing.xl },
  member: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  circleSum: { padding: Spacing.md, borderRadius: Radius.md, marginTop: Spacing.sm },
  projRow: {},
  projInner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md },
  stageRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  stageDot: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
});
