// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// Ajuste estes caminhos se @/components, @/constants, @/hooks não resolverem corretamente
// para os arquivos em app/src/components, app/src/constants, app/src/hooks
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
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index" // Corresponde a app/(tabs)/index.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tours" // Corresponde a app/(tabs)/tours.tsx
        options={{
          title: 'Passeios',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reservations" // Corresponde a app/(tabs)/reservations.tsx
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bookmark.fill" color={color} />,
        }}
      />
      {/* Telas acessíveis por navegação direta, mas não como abas */}
      <Tabs.Screen
        name="auth" // Corresponde a app/(tabs)/auth.tsx
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="tours/[id]" // Corresponde a app/(tabs)/tours/[id].tsx
        options={{
          href: null,
          headerShown: false,
        }}
      />
      {/* ---- ESTA É A ENTRADA CRUCIAL ---- */}
      <Tabs.Screen
        name="reserveForm" // DEVE CORRESPONDER AO ARQUIVO app/(tabs)/reserveForm.tsx
        options={{
          href: null, // Não aparece na barra de abas
          headerShown: false,
        }}
      />
      {/* ----------------------------------- */}
      <Tabs.Screen
        name="explore" // Corresponde a app/(tabs)/explore.tsx (se existir)
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}