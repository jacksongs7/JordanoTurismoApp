// app/(tabs)/tours/[id].tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Importa useLocalSearchParams e useRouter
import Header from '@/src/components/Header'; // Caminho ajustado
import { tours } from '@/src/data/toursData'; // Caminho ajustado
import { getToken } from '@/src/services/AuthService'; // Caminho ajustado
import { createReservation } from '@/src/services/ApiService'; // Caminho ajustado

export default function TourDetailScreen() {
  const { id } = useLocalSearchParams(); // Pega o ID da URL
  const router = useRouter();

  const tour = tours.find(t => t.id === id);

  if (!tour) {
    return (
      <View style={styles.errorContainer}>
        <Header showBackButton={true} />
        <Text style={styles.errorMessage}>Passeio não encontrado!</Text>
      </View>
    );
  }

  const handleReservePress = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert(
        'Login Necessário',
        'Você precisa estar logado para fazer uma reserva. Deseja fazer login agora?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/auth') }, // Navega para a tela de autenticação
        ]
      );
    } else {
      // Extrair o email do token simulado para fins de demonstração
      const userEmail = token.split('_').pop();
      if (userEmail) {
        try {
          await createReservation(userEmail, tour.id);
          Alert.alert(
            'Reserva Realizada!',
            `Você reservou o passeio "${tour.title}". Verifique suas reservas para mais detalhes.`,
            [
              { text: 'OK', onPress: () => router.push('/reservations') } // Navega para a tela de reservas
            ]
          );
        } catch (error: any) {
          Alert.alert('Erro na Reserva', error.message || 'Ocorreu um erro ao tentar reservar.');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} /> {/* Adiciona o Header com botão de voltar */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: tour.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{tour.title}</Text>
          <Text style={styles.fullDescription}>{tour.fullDescription}</Text>

          <TouchableOpacity style={styles.reserveButton} onPress={handleReservePress}>
            <Text style={styles.reserveButtonText}>Reservar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorMessage: {
    fontSize: 20,
    color: 'red',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  fullDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 30,
  },
  reserveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});