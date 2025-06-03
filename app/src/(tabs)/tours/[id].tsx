// app/src/(tabs)/tours/[id].tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '@/components/Header';
import { tours } from '@/data/toursData';
import { getToken } from '@/services/AuthService';

export default function TourDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
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
    try {
      const token = await getToken();

      if (!token) {
        Alert.alert(
          'Login Necessário',
          'Você precisa estar logado para fazer uma reserva. Deseja fazer login agora?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Login', onPress: () => { router.push('/auth'); }},
          ]
        );
        return;
      }

      router.push({
        pathname: '/reserveForm',
        params: { tourId: tour.id, tourTitle: tour.title },
      });

    } catch (error: any) {
      Alert.alert('Erro Inesperado', error.message || 'Ocorreu um erro ao tentar processar sua reserva.');
    }
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* CORREÇÃO AQUI: removendo { uri: ... } */}
        <Image source={tour.image} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{tour.title}</Text>
          <Text style={styles.fullDescription}>{tour.fullDescription}</Text>
          <TouchableOpacity style={styles.reserveButton} onPress={handleReservePress}>
            <Text style={styles.reserveButtonText}>Agendar este Passeio</Text>
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