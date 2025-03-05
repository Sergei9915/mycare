import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { AuthContextProvider } from '@/context/AuthContext';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    NotoSansBold: require('../assets/fonts/NotoSans-Bold.ttf'),
    NotoSansRegular: require('../assets/fonts/NotoSans-Regular.ttf'),
    NotoSansSemiBold: require('../assets/fonts/NotoSans-SemiBold.ttf'),
  });

  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      router.replace('/onboarding');
    } else if (error) {
      console.warn(error);
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      </Stack>
    </AuthContextProvider>
  );
}
