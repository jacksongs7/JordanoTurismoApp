// Em app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// Certifique-se de que os caminhos de importação para componentes e constantes estão corretos
// Estes são baseados no arquivo app/(tabs)/_layout.tsx que você forneceu.
// Se estiverem incorretos, ajuste-os para apontar para os locais corretos em app/src/
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
        tabBarButton: HapticTab, // Supondo que HapticTab está acessível via @/components
        tabBarBackground: TabBarBackground, // Supondo que TabBarBackground está acessível via @/components
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // Supondo que IconSymbol está acessível e 'house.fill' é um ícone válido
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tours" // Deve corresponder a app/(tabs)/tours.tsx
        options={{
          title: 'Passeios',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reservations" // Deve corresponder a app/(tabs)/reservations.tsx
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bookmark.fill" color={color} />,
        }}
      />
      {/* Telas que não terão tab visível */}
      <Tabs.Screen
        name="auth" // Deve corresponder a app/(tabs)/auth.tsx
        options={{
          href: null, // Não aparece na barra de abas
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="tours/[id]" // Deve corresponder a app/(tabs)/tours/[id].tsx
        options={{
          href: null, // Não aparece na barra de abas
          headerShown: false,
        }}
      />
      {/* ADICIONAR ESTA TELA PARA O FORMULÁRIO DE RESERVA */}
      <Tabs.Screen
        name="reserveForm" // Esta entrada permitirá a rota /reserveForm
        options={{
          href: null, // Não mostra na barra de abas
          headerShown: false, // O Header customizado será usado dentro da tela
        }}
      />
      <Tabs.Screen
        name="explore" // Deve corresponder a app/(tabs)/explore.tsx
        options={{
          href: null, // Não aparece na barra de abas
        }}
      />
    </Tabs>
  );
}