import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Colors, FontMap } from '@/constants/theme';
import { useScheme } from '@/hooks/use-theme';
import { AppProvider } from '@/store/app-store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(FontMap);

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  // Hold on the splash until the typeface is ready so text never re-flows.
  if (!loaded && !error) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <RootNavigator />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const scheme = useScheme();
  const bg = Colors[scheme].bg;

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: bg } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="project/[id]" options={{ presentation: 'card', animation: 'slide_from_right' }} />
        <Stack.Screen name="agent" options={{ presentation: 'modal' }} />
        <Stack.Screen name="advisor" options={{ presentation: 'modal' }} />
        <Stack.Screen name="impact-moment" options={{ presentation: 'modal' }} />
        <Stack.Screen name="give" options={{ presentation: 'modal' }} />
        <Stack.Screen name="name-mission" options={{ presentation: 'modal' }} />
        <Stack.Screen name="invite-circle" options={{ presentation: 'modal' }} />
        <Stack.Screen name="level-up" options={{ presentation: 'modal', animation: 'fade' }} />
      </Stack>
    </>
  );
}
