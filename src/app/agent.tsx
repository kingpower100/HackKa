import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOutUp, LinearTransition } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon, type IconName } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { TopBar } from '@/components/ui/top-bar';
import { Spacing } from '@/constants/theme';
import { agentGreeting, buildAgentFeed } from '@/data/agent';
import type { AgentAction, AgentSuggestion } from '@/data/types';
import { useLanguage, useTr } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import { useStore } from '@/store/app-store';

const KIND_ICON: Record<AgentSuggestion['kind'], IconName> = {
  project: 'compass',
  nudge: 'arrow-up-circle',
  update: 'albums',
  milestone: 'ribbon',
};

export default function Agent() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { state } = useStore();
  const [dismissed, setDismissed] = useState<string[]>([]);

  const ctx = {
    topThemes: state.topThemes,
    allocationIds: state.allocations.map((a) => a.projectId),
    monthsActive: state.monthsActive,
    hasContributed: state.totalGiven > 0,
    fundName: state.fundName,
    circleCount: state.circle.filter((m) => m.status === 'aktiv').length,
    totalGiven: state.totalGiven,
  };

  const feed = buildAgentFeed(ctx, lang).filter((s) => !dismissed.includes(s.id));

  function run(s: AgentSuggestion) {
    const routes: Record<AgentAction, string | null> = {
      'open-project': s.projectId ? `/project/${s.projectId}` : null,
      'name-fund': '/name-mission',
      'invite-circle': '/invite-circle',
      'open-impact': '/impact-moment',
      increase: '/give',
      'level-up': '/level-up',
      none: null,
    };
    const target = routes[s.action];
    if (target) router.push(target as never);
  }

  return (
    <Screen scroll>
      <TopBar onClose={() => router.back()} title={tr({ de: 'Impact-Agent', en: 'Impact Agent' })} />

      {/* Intro */}
      <Card surface="surfaceAlt" style={styles.intro}>
        <View style={[styles.avatar, { backgroundColor: theme.ink }]}>
          <Icon name="sparkles" size={22} color={theme.bg} />
        </View>
        <AppText variant="body" style={{ flex: 1 }}>
          {agentGreeting(ctx, lang)}
        </AppText>
      </Card>

      <View style={styles.note}>
        <Icon name="lock-closed-outline" size={13} color={theme.inkTertiary} />
        <AppText variant="caption" color="inkTertiary">
          {tr({
            de: 'Ich schlage nur vor. Nichts passiert ohne deine Freigabe.',
            en: 'I only suggest. Nothing happens without your go-ahead.',
          })}
        </AppText>
      </View>

      {feed.length === 0 ? (
        <Card style={styles.empty}>
          <Icon name="checkmark-circle" size={28} color={theme.brand} />
          <AppText variant="subtitle" center style={{ marginTop: Spacing.sm }}>
            {tr({ de: 'Alles im Blick.', en: 'All in view.' })}
          </AppText>
          <AppText variant="small" color="inkSecondary" center style={{ marginTop: 4 }}>
            {tr({
              de: 'Ich melde mich, sobald es etwas Sinnvolles zu tun gibt.',
              en: "I'll be in touch as soon as there's something worthwhile to do.",
            })}
          </AppText>
        </Card>
      ) : (
        <View style={{ gap: Spacing.md, marginTop: Spacing.base }}>
          {feed.map((s) => (
            <Animated.View key={s.id} layout={LinearTransition} entering={FadeIn} exiting={FadeOutUp}>
              <Card>
                <View style={styles.cardHead}>
                  <View style={[styles.kindIcon, { backgroundColor: theme.brandSoft }]}>
                    <Icon name={KIND_ICON[s.kind]} size={18} color={theme.brandInk} />
                  </View>
                  <AppText variant="subtitle" style={{ flex: 1 }}>
                    {s.title}
                  </AppText>
                </View>
                <AppText variant="callout" color="inkSecondary" style={{ marginTop: Spacing.sm }}>
                  {s.body}
                </AppText>
                <View style={styles.actions}>
                  <Button title={s.cta} size="md" full={false} onPress={() => run(s)} style={{ flex: 1 }} />
                  <Button
                    title={tr({ de: 'Später', en: 'Later' })}
                    variant="ghost"
                    size="md"
                    full={false}
                    onPress={() => setDismissed((d) => [...d, s.id])}
                  />
                </View>
              </Card>
            </Animated.View>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginTop: Spacing.sm },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  note: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.md, marginLeft: 4 },
  empty: { alignItems: 'center', paddingVertical: Spacing.xl, marginTop: Spacing.base },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  kindIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.base },
});
