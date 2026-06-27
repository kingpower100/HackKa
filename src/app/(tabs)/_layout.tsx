import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AgentFab } from '@/components/agent-fab';
import { Icon, type IconName } from '@/components/ui/icon';
import { AppText } from '@/components/ui/text';
import { Spacing } from '@/constants/theme';
import { useScheme, useTheme } from '@/hooks/use-theme';
import { useTr } from '@/hooks/use-language';
import type { Localized } from '@/i18n/types';

const TABS: Record<string, { label: Localized; icon: IconName; active: IconName }> = {
  home: { label: { de: 'Start', en: 'Home' }, icon: 'home-outline', active: 'home' },
  discover: { label: { de: 'Entdecken', en: 'Discover' }, icon: 'compass-outline', active: 'compass' },
  mission: { label: { de: 'Fonds', en: 'Fund' }, icon: 'ribbon-outline', active: 'ribbon' },
  profile: { label: { de: 'Profil', en: 'Profile' }, icon: 'person-outline', active: 'person' },
};

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <AppTabBar {...props} />}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="mission" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

function AppTabBar({ state, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const scheme = useScheme();
  const tr = useTr();
  const insets = useSafeAreaInsets();
  const barPad = Math.max(insets.bottom, Spacing.md);

  return (
    <View pointerEvents="box-none">
      <AgentFab bottom={64 + barPad + Spacing.base} />
      <View
        style={[
          styles.bar,
          {
            backgroundColor: theme.surface,
            borderTopColor: theme.line,
            paddingBottom: barPad,
            shadowColor: theme.shadow,
            shadowOpacity: scheme === 'dark' ? 0.4 : 0.06,
          },
        ]}>
        {state.routes.map((route, index) => {
          const meta = TABS[route.name];
          if (!meta) return null;
          const focused = state.index === index;
          const tint = focused ? theme.brandInk : theme.inkTertiary;
          return (
            <Pressable
              key={route.key}
              style={styles.item}
              hitSlop={6}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
              }}>
              <Icon name={focused ? meta.active : meta.icon} size={23} color={tint} />
              <AppText
                variant="caption"
                style={{ color: tint, fontWeight: focused ? '700' : '500', marginTop: 4, fontSize: 11 }}>
                {tr(meta.label)}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -6 },
    elevation: 12,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 0 },
});
