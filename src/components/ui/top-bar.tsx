import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { AppText } from './text';
import { IconButton } from './icon-button';

export function TopBar({
  title,
  onBack,
  onClose,
  right,
}: {
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.bar}>
      <View style={styles.side}>
        {onBack ? <IconButton name="chevron-back" onPress={onBack} /> : null}
        {onClose ? <IconButton name="close" onPress={onClose} /> : null}
      </View>
      {title ? (
        <AppText variant="subtitle" numberOfLines={1} style={styles.title}>
          {title}
        </AppText>
      ) : (
        <View style={styles.title} />
      )}
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    minHeight: 48,
  },
  side: { width: 48, justifyContent: 'center' },
  right: { alignItems: 'flex-end' },
  title: { flex: 1, textAlign: 'center' },
});
