import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { type Edge, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  /** Pinned at the bottom, outside the scroll area (great for CTAs). */
  footer?: ReactNode;
  background?: string;
  edges?: Edge[];
  contentStyle?: ViewStyle;
};

export function Screen({
  children,
  scroll = false,
  padded = true,
  footer,
  background,
  edges = ['top'],
  contentStyle,
}: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const bg = background ?? theme.bg;
  const pad = padded ? { paddingHorizontal: Spacing.lg } : null;

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <SafeAreaView style={styles.flex} edges={edges}>
        {scroll ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollOuter}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={[styles.content, pad, contentStyle]}>{children}</View>
          </ScrollView>
        ) : (
          <View style={[styles.flex, styles.centerCol]}>
            <View style={[styles.flex, styles.content, pad, contentStyle]}>{children}</View>
          </View>
        )}

        {footer ? (
          <View
            style={[
              styles.footer,
              pad,
              { paddingBottom: Math.max(insets.bottom, Spacing.base), backgroundColor: bg },
            ]}>
            <View style={styles.content}>{footer}</View>
          </View>
        ) : null}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centerCol: { alignItems: 'center' },
  scrollOuter: { alignItems: 'center', paddingBottom: Spacing.xxl },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
  footer: {
    alignItems: 'center',
    paddingTop: Spacing.md,
  },
});
