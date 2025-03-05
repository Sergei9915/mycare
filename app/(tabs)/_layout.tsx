import React from 'react';
import { Tabs } from 'expo-router';
import { useTabBarOptions } from '@/hooks/useTabBarOptions';

export default function TabLayout() {
  const { getIcon } = useTabBarOptions();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => getIcon({ name: route.name, focused }),
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderWidth: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          marginTop: -20,
        },
        animation: 'fade',
      })}
    >
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="home" />
      <Tabs.Screen name="explore" />
    </Tabs>
  );
}
