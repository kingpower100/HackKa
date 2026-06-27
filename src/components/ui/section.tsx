import { Pressable, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AppText } from './text';
import { Icon } from './icon';

export function SectionHeader({
  title,
  kicker,
  actionLabel,
  onAction,
}: {
  title: string;
  kicker?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        {kicker ? (
          <AppText variant="label" color="inkTertiary" style={{ marginBottom: 4 }}>
            {kicker}
          </AppText>
        ) : null}
        <AppText variant="headline">{title}</AppText>
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} style={styles.action} hitSlop={8}>
          <AppText variant="small" style={{ color: theme.brandInk }}>
            {actionLabel}
          </AppText>
          <Icon name="chevron-forward" size={14} color={theme.brandInk} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.md },
  action: { flexDirection: 'row', alignItems: 'center', gap: 2 },
});
