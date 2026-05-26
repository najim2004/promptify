import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import AppTabs from '@/components/app-tabs';
import PromptNestSplash from '@/components/splash-screen';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isSplashVisible ? (
        <PromptNestSplash onFinish={() => setIsSplashVisible(false)} />
      ) : (
        <AppTabs />
      )}
    </ThemeProvider>
  );
}

