// app/(tabs)/reservations.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Importa useRouter
import { Reservation } from '@/src/types'; // Caminho ajustado
import Header from '@/src/components/Header'; // Caminho ajustado
import { isAuthenticated, getToken, logout } from '@/src/services/AuthService'; // Caminho ajustado
import { fetchUserReservations } from '@/src/services/ApiService'; // Caminho ajustado
import Icon from 'react-native-vector-icons/MaterialIcons'; // Instalar: npm install react-native-vector-icons

export default function ReservationsScreen() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  const loadReservations = async () => {
    setLoading(true);
    const authenticated = await isAuthenticated();
    setIsLoggedIn(authenticated);

    if (!authenticated) {
      Alert.alert(
        'Acesso Restrito',
        'Você precisa estar logado para ver suas reservas. Deseja fazer login agora?',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => router.replace('/') }, // Volta para Home
          { text: 'Login', onPress: () => router.push('/auth') },
        ]
      );
      setLoading(false);
      return;
    }

    const token = await getToken();
    if (token) {
      const email = token.split('_').pop();
      if (email) {
        setUserEmail(email);
        try {
          const userRes = await fetchUserReservations(email);
          setReservations(userRes);
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar suas reservas.');
          console.error(error);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setUserEmail(null);
    setReservations([]);
    router.replace('/'); // Redireciona para a Home após logout
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Carregando reservas...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Por favor, faça login para ver suas reservas.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.reservationsHeader}>
        <Text style={styles.screenTitle}>Minhas Reservas</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={24} color="#dc3545" />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {reservations.length === 0 ? (
        <View style={styles.noReservationsContainer}>
          <Text style={styles.noReservationsText}>Você ainda não possui reservas.</Text>
          <TouchableOpacity style={styles.browseToursButton} onPress={() => router.push('/tours')}>
            <Text style={styles.browseToursButtonText}>Explorar Passeios</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reservationCard}>
              <Text style={styles.reservationTitle}>{item.tourTitle}</Text>
              <Text style={styles.reservationDetail}>Data: {item.date}</Text>
              <Text style={styles.reservationDetail}>Hora: {item.time}</Text>
              <Text style={styles.reservationStatus}>Status: {item.status}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  reservationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#ffe6e6', // Um fundo levemente vermelho
  },
  logoutButtonText: {
    color: '#dc3545',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  reservationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  reservationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  reservationDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  reservationStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 5,
  },
  noReservationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noReservationsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  browseToursButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  browseToursButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});