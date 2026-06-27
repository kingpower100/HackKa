import { StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useTr } from '@/hooks/use-language';
import { AppText } from './text';
import { Icon } from './icon';

/** Zentrales Vertrauens-Element: geprüft + Update-Versprechen. */
export function VerifiedBadge({ compact }: { compact?: boolean }) {
  const theme = useTheme();
  const tr = useTr();
  return (
    <View style={[styles.badge, { backgroundColor: theme.brandSoft }]}>
      <Icon name="shield-checkmark" size={13} color={theme.brandInk} />
      <AppText variant="caption" style={{ color: theme.brandInk, fontWeight: '700' }}>
        {compact
          ? tr({ de: 'Verifiziert', en: 'Verified' })
          : tr({ de: 'Verifiziert von ImpactFund', en: 'Verified by ImpactFund' })}
      </AppText>
    </View>
  );
}

export function CadenceNote({ cadence }: { cadence: string }) {
  const theme = useTheme();
  const tr = useTr();
  return (
    <View style={styles.row}>
      <Icon name="time-outline" size={14} color={theme.inkSecondary} />
      <AppText variant="small" color="inkSecondary">
        {cadence}
        {tr({ de: '. Du siehst, was passiert.', en: '. You’ll see what happens.' })}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
});
