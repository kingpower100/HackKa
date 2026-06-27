import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Monogram } from '@/components/ui/monogram';
import { Pill } from '@/components/ui/pill';
import { AppText } from '@/components/ui/text';
import { VerifiedBadge } from '@/components/ui/badge';
import { Categories, categoryTint, Spacing } from '@/constants/theme';
import { useScheme, useTheme } from '@/hooks/use-theme';
import { useTr } from '@/hooks/use-language';
import type { Project } from '@/data/types';

export function ProjectCard({
  project,
  onPress,
  selected,
}: {
  project: Project;
  onPress?: () => void;
  selected?: boolean;
}) {
  const theme = useTheme();
  const scheme = useScheme();
  const tr = useTr();
  const cat = Categories[project.category];

  return (
    <Card
      onPress={onPress}
      padded={false}
      borderColor={selected ? theme.brand : undefined}
      style={[styles.card, selected && { borderWidth: 2 }]}>
      {/* Hero band */}
      <View style={[styles.hero, { backgroundColor: categoryTint(project.category, scheme) }]}>
        <Monogram initials={project.hero.initials} category={project.category} size={52} />
        <View style={{ flex: 1 }}>
          <AppText variant="caption" style={{ color: cat.color, fontWeight: '700' }}>
            {project.hero.name} · {tr(project.hero.role)}
          </AppText>
          <AppText variant="small" color="inkSecondary" numberOfLines={2} style={{ marginTop: 2 }}>
            {tr(project.hero.line)}
          </AppText>
        </View>
        {selected ? (
          <View style={[styles.check, { backgroundColor: theme.brand }]}>
            <Icon name="checkmark" size={15} color={theme.onBrand} />
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <View style={styles.tagRow}>
          <Pill label={tr(cat.label)} bg={categoryTint(project.category, scheme)} color={cat.color} />
          <View style={styles.locRow}>
            <Icon
              name={project.scope === 'international' ? 'earth-outline' : 'location-outline'}
              size={13}
              color={theme.inkTertiary}
            />
            <AppText variant="caption" color="inkTertiary">
              {tr(project.location)}
            </AppText>
          </View>
        </View>

        <AppText variant="headline" style={{ marginTop: Spacing.sm }}>
          {tr(project.name)}
        </AppText>
        <AppText variant="callout" color="inkSecondary" style={{ marginTop: 4 }}>
          {tr(project.tagline)}
        </AppText>

        <View style={{ marginTop: Spacing.md }}>
          <VerifiedBadge />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { overflow: 'hidden' },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.base,
  },
  body: { padding: Spacing.lg, paddingTop: Spacing.md },
  tagRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
