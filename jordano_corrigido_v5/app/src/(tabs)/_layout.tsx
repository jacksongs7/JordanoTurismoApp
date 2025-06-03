import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false, // Oculta o header padrão para usar um customizado
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {/* Tela Home (antigo index) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      {/* Nova tela de Passeios */}
      <Tabs.Screen
        name="tours" // Nome do arquivo src/(tabs)/tours.tsx
        options={{
          title: 'Passeios',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      {/* Nova tela de Reservas */}
      <Tabs.Screen
        name="reservations" // Nome do arquivo src/(tabs)/reservations.tsx
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bookmark.fill" color={color} />,
        }}
      />
      {/* Telas que não terão tab, mas que estarão no mesmo Stack Navigator do Expo Router */}
      <Tabs.Screen
        name="auth" // Nome do arquivo src/(tabs)/auth.tsx
        options={{
          href: null, // Esconde esta tela da barra de tabs
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="tours/[id]" // Nome do arquivo src/(tabs)/tours/[id].tsx
        options={{
          href: null, // Esconde esta tela da barra de tabs
          headerShown: false,
        }}
      />
    </Tabs>
  );
}