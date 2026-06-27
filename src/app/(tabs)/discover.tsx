import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ProjectCard } from '@/components/project-card';
import { Icon, categoryIcon, type IconName } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { BottomTabHeight, Categories, CategoryList, type CategoryKey, Radius, Spacing } from '@/constants/theme';
import { PROJECTS, projectsByCategories } from '@/data/projects';
import type { Scope } from '@/data/types';
import type { Localized } from '@/i18n/types';
import { useTheme } from '@/hooks/use-theme';
import { useTr } from '@/hooks/use-language';
import { useStore } from '@/store/app-store';

type Filter = CategoryKey | 'alle';
type ScopeFilter = Scope | 'alle';

const SCOPES: { key: ScopeFilter; label: Localized; icon: IconName }[] = [
  { key: 'alle', label: { de: 'Überall', en: 'Everywhere' }, icon: 'apps-outline' },
  { key: 'deutschland', label: { de: 'Deutschland', en: 'Germany' }, icon: 'flag-outline' },
  { key: 'international', label: { de: 'International', en: 'International' }, icon: 'earth-outline' },
];

export default function Discover() {
  const router = useRouter();
  const theme = useTheme();
  const tr = useTr();
  const { state } = useStore();
  const [filter, setFilter] = useState<Filter>('alle');
  const [scope, setScope] = useState<ScopeFilter>(state.scope ?? 'alle');

  const list = useMemo(() => {
    const base =
      filter === 'alle'
        ? projectsByCategories(state.topThemes, scope === 'alle' ? null : scope)
        : PROJECTS.filter((p) => p.category === filter);
    return scope === 'alle' ? base : base.filter((p) => p.scope === scope);
  }, [filter, scope, state.topThemes]);

  const filters: Filter[] = ['alle', ...CategoryList.map((c) => c.key)];

  return (
    <Screen scroll contentStyle={{ paddingBottom: BottomTabHeight + Spacing.xxl }}>
      <View style={{ marginTop: Spacing.md }}>
        <AppText variant="label" color="brandInk">
          {tr({ de: 'Geprüfte Projekte', en: 'Vetted projects' })}
        </AppText>
        <AppText variant="title" style={{ marginTop: 2 }}>
          {tr({ de: 'Entdecke, wo du wirkst', en: 'Discover where you make a difference' })}
        </AppText>
      </View>

      {/* Scope segmented */}
      <View style={[styles.segment, { backgroundColor: theme.surfaceSunken }]}>
        {SCOPES.map((s) => {
          const on = scope === s.key;
          return (
            <Pressable
              key={s.key}
              onPress={() => setScope(s.key)}
              style={[styles.segItem, on && { backgroundColor: theme.surface }]}>
              <Icon name={s.icon} size={14} color={on ? theme.ink : theme.inkSecondary} />
              <AppText variant="caption" style={{ color: on ? theme.ink : theme.inkSecondary, fontWeight: '700' }}>
                {tr(s.label)}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -Spacing.lg, marginTop: Spacing.md }}
        contentContainerStyle={styles.filters}>
        {filters.map((f) => {
          const on = filter === f;
          const cat = f !== 'alle' ? Categories[f] : null;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={[
                styles.chip,
                { backgroundColor: on ? theme.ink : theme.surface, borderColor: on ? theme.ink : theme.line },
              ]}>
              {cat ? <Icon name={categoryIcon(cat.key)} size={14} color={on ? theme.bg : cat.color} /> : null}
              <AppText variant="small" style={{ color: on ? theme.bg : theme.inkSecondary, fontWeight: '600' }}>
                {cat ? tr(cat.label) : tr({ de: 'Für dich', en: 'For you' })}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>

      <AppText variant="small" color="inkSecondary" style={{ marginTop: Spacing.base }}>
        {list.length}{' '}
        {list.length === 1
          ? tr({ de: 'Projekt', en: 'project' })
          : tr({ de: 'Projekte', en: 'projects' })}
        {filter === 'alle'
          ? tr({ de: ' · nach deinem Profil sortiert', en: ' · sorted by your profile' })
          : ''}
      </AppText>

      <View style={styles.list}>
        {list.map((p) => (
          <ProjectCard key={p.id} project={p} onPress={() => router.push(`/project/${p.id}`)} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  segment: { flexDirection: 'row', borderRadius: Radius.pill, padding: 4, marginTop: Spacing.lg },
  segItem: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 9,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filters: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.base,
    paddingVertical: 9,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  list: { marginTop: Spacing.base, gap: Spacing.base },
});
