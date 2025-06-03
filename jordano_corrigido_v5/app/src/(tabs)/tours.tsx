// app/(tabs)/tours.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router'; // Importa useRouter
import TourCard from '@/src/components/TourCard'; // Caminho ajustado
import Header from '@/src/components/Header'; // Caminho ajustado
import { tours } from '@/src/data/toursData'; // Caminho ajustado
import { Tour } from '@/src/types'; // Caminho ajustado

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