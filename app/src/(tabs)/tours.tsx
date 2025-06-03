// app/(tabs)/tours.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router'; // Importa useRouter
import TourCard from '@/components/TourCard'; // Caminho corrigido
import Header from '@/components/Header';   // Caminho corrigido
import { tours } from '@/data/toursData';   // Caminho corrigido
import { Tour } from '@/types';             // Caminho corrigido

export default function ToursScreen() {
  const router = useRouter();

  const handlePressTour = (tour: Tour) => {
    router.push(`/tours/${tour.id}`); // Navega para a tela de detalhes usando rota dinâmica
  };

  return (
    <View style={styles.container}>
      <Header showReservationsIcon={true} /> {/* Adiciona o Header com ícone de reservas */}
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