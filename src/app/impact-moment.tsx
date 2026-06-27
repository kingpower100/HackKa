import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Dots } from '@/components/ui/progress';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Monogram } from '@/components/ui/monogram';
import { AppText } from '@/components/ui/text';
import { Categories, categoryTint, FontFamily, Radius, Spacing } from '@/constants/theme';
import { buildImpactMoment } from '@/data/impact-moments';
import type { ImpactCard } from '@/data/types';
import { useLanguage, useTr } from '@/hooks/use-language';
import { useScheme, useTheme } from '@/hooks/use-theme';
import { useStore } from '@/store/app-store';

export default function ImpactMoment() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const lang = useLanguage();
  const { width } = useWindowDimensions();
  const { state } = useStore();
  const [page, setPage] = useState(0);

  const moment = buildImpactMoment(
    state.allocations.map((a) => a.projectId),
    tr({ de: 'Juni 2026', en: 'June 2026' }),
    state.monthsActive,
    state.totalGiven,
    lang
  );
  const last = page === moment.cards.length - 1;

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.top}>
          <Dots count={moment.cards.length} active={page} color={theme.brand} />
          <IconButton name="close" onPress={() => router.back()} variant="plain" style={styles.close} />
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / width))}>
          {moment.cards.map((card) => (
            <View key={card.id} style={{ width }}>
              <CardView card={card} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          {last ? (
            <View style={{ gap: Spacing.sm }}>
              <Button title={tr({ de: 'Teilen', en: 'Share' })} variant="secondary" icon="share-outline" onPress={() => {}} />
              <Button title={tr({ de: 'Schließen', en: 'Close' })} onPress={() => router.back()} />
            </View>
          ) : (
            <AppText variant="caption" color="inkTertiary" center>
              {tr({ de: 'Wische weiter →', en: 'Swipe on →' })}
            </AppText>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

function CardView({ card }: { card: ImpactCard }) {
  const theme = useTheme();
  const scheme = useScheme();
  const accent = card.category ? Categories[card.category].color : theme.brand;

  return (
    <Animated.View key={card.id} entering={FadeIn.duration(400)} style={styles.card}>
      {card.kicker ? (
        <AppText variant="label" style={{ color: accent, marginBottom: Spacing.base }}>
          {card.kicker}
        </AppText>
      ) : null}

      {card.kind === 'story' && card.hero ? (
        <View style={[styles.heroWrap, { backgroundColor: categoryTint(card.category!, scheme) }]}>
          <Monogram initials={card.hero.initials} category={card.category} size={92} />
        </View>
      ) : null}

      {card.kind === 'stat' && card.metric ? (
        <AppText style={[styles.bigMetric, { color: accent }]}>{card.metric.value}</AppText>
      ) : null}

      {card.kind === 'intro' || card.kind === 'outro' ? (
        <View style={[styles.glyph, { backgroundColor: card.kind === 'outro' ? theme.brandSoft : theme.goldSoft }]}>
          <Icon
            name={card.kind === 'outro' ? 'heart' : 'albums'}
            size={30}
            color={card.kind === 'outro' ? theme.brandInk : theme.goldInk}
          />
        </View>
      ) : null}

      <AppText variant="display" center style={{ marginTop: Spacing.lg }}>
        {card.headline}
      </AppText>

      {card.kind === 'stat' && card.metric ? (
        <AppText variant="subtitle" color="inkSecondary" center style={{ marginTop: Spacing.xs }}>
          {card.metric.label}
        </AppText>
      ) : null}

      {card.hero ? (
        <AppText variant="small" style={{ color: accent, marginTop: Spacing.sm }}>
          {card.hero.name}
          {card.hero.age ? `, ${card.hero.age}` : ''} · {card.hero.line}
        </AppText>
      ) : null}

      {card.kind === 'growth' && card.bars ? (
        <View style={styles.chart}>
          {card.bars.map((b, i) => (
            <View key={i} style={styles.barCol}>
              <View style={styles.barTrack}>
                <View style={[styles.bar, { height: `${b.value * 100}%`, backgroundColor: theme.brand }]} />
              </View>
              <AppText variant="caption" color="inkTertiary">
                {b.label}
              </AppText>
            </View>
          ))}
        </View>
      ) : null}

      {card.body ? (
        <AppText variant="body" color="inkSecondary" center style={{ marginTop: Spacing.base, maxWidth: 360 }}>
          {card.body}
        </AppText>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  close: { position: 'absolute', right: Spacing.base },
  footer: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.base, paddingTop: Spacing.md },
  card: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl },
  heroWrap: { width: 160, height: 160, borderRadius: 80, alignItems: 'center', justifyContent: 'center' },
  glyph: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  bigMetric: { fontFamily: FontFamily.extrabold, fontSize: 96, lineHeight: 104 },
  chart: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.md, height: 160, marginTop: Spacing.xl },
  barCol: { alignItems: 'center', gap: Spacing.sm, height: '100%', justifyContent: 'flex-end' },
  barTrack: { width: 26, height: 130, justifyContent: 'flex-end', borderRadius: Radius.sm, overflow: 'hidden' },
  bar: { width: 26, borderRadius: Radius.sm },
});
