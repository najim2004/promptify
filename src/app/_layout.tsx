import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

import PromptNestSplash from '@/components/splash-screen';
import OnboardingScreen from '@/components/onboarding';

void SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 220,
  fade: true,
});

const CUSTOM_SPLASH_DURATION_MS = 1200;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(true);
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const isReady = fontsLoaded || !!fontError;

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  const handleSplashFinish = useCallback(() => {
    setIsSplashVisible(false);
  }, []);

  const handleOnboardingFinish = useCallback(() => {
    setIsOnboardingVisible(false);
    router.replace('./sign-in');
  }, [router]);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isSplashVisible ? (
        <PromptNestSplash
          duration={CUSTOM_SPLASH_DURATION_MS}
          onFinish={handleSplashFinish}
        />
      ) : (
        <View style={styles.appShell}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="explore" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="forgot-password" />
            <Stack.Screen name="verify-email" />
            <Stack.Screen name="reset-password" />
          </Stack>
          {isOnboardingVisible && (
            <View style={styles.overlay}>
              <OnboardingScreen onFinish={handleOnboardingFinish} />
            </View>
          )}
        </View>
      )}
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
  },
});
