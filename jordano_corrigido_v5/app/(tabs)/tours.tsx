// app/(tabs)/tours.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import TourCard from '@/app/_lib/components/TourCard'; // Caminho ajustado
import Header from '@/app/_lib/components/Header';   // Caminho ajustado
import { tours } from '@/app/_lib/data/toursData';   // Caminho ajustado
import { Tour } from '@/app/_lib/types';             // Caminho ajustado

export default function ToursScreen() {
  const router = useRouter();

  const handlePressTour = (tour: Tour) => {
    // Navega para a tela de detalhes usando rota dinâmica dentro do (tabs)
    router.push(`(tabs)/tours/${tour.id}`);
  };

  return (
    <View style={styles.container}>
      <Header showReservationsIcon={true} />
      <Text style={styles.screenTitle}>Nossos Passeios</Text>
      <FlatList
        data={tours}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TourCard tour={item} onPress={handlePressTour} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});