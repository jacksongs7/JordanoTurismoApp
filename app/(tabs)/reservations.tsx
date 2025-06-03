// app/(tabs)/reservations.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Reservation } from '@/types';
import Header from '@/components/Header';
import { isAuthenticated, getToken, logout } from '@/services/AuthService';
import { fetchUserReservations } from '@/services/ApiService';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ReservationsScreen() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const loadData = async () => {
    console.log('[ReservationsScreen] Iniciando loadData.');
    setLoading(true);
    const authenticated = await isAuthenticated();
    setIsLoggedIn(authenticated);
    console.log('[ReservationsScreen] Usuário autenticado:', authenticated);

    if (!authenticated) {
      console.log('[ReservationsScreen] Usuário não autenticado. Mostrando alerta para login.');
      Alert.alert(
        'Acesso Restrito',
        'Você precisa estar logado para ver suas reservas. Deseja fazer login agora?',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => {
              console.log('[ReservationsScreen] Alerta de login: Cancelado, voltando para Home.');
              router.replace('/');
            }
          },
          { text: 'Login', onPress: () => {
              console.log('[ReservationsScreen] Alerta de login: Navegando para /auth.');
              router.push('/auth');
            }
          },
        ]
      );
      setLoading(false);
      setReservations([]);
      return;
    }

    const token = await getToken();
    console.log('[ReservationsScreen] Token obtido:', token);
    if (token) {
      const tokenPrefixUser = "fake_jwt_token_for_user_";
      const tokenPrefixNewUser = "fake_jwt_token_for_new_user_";
      let email: string | null = null;

      if (token.startsWith(tokenPrefixUser)) {
        email = token.substring(tokenPrefixUser.length);
      } else if (token.startsWith(tokenPrefixNewUser)) {
        email = token.substring(tokenPrefixNewUser.length);
      }
      console.log('[ReservationsScreen] Email extraído do token:', email);

      if (email) {
        try {
          console.log('[ReservationsScreen] Buscando reservas para o email:', email);
          const userRes = await fetchUserReservations(email);
          console.log('[ReservationsScreen] Reservas recebidas:', userRes.length);
          setReservations(userRes);
        } catch (error) {
          console.error('[ReservationsScreen] Erro ao buscar reservas:', error);
          Alert.alert('Erro', 'Não foi possível carregar suas reservas.');
        }
      } else {
        console.warn('[ReservationsScreen] Não foi possível extrair email do token:', token);
        Alert.alert('Erro de Autenticação', 'Sessão inválida. Por favor, faça login novamente.');
        await handleLogout();
      }
    } else {
      console.warn('[ReservationsScreen] isAuthenticated é true, mas getToken retornou null.');
      setIsLoggedIn(false);
      setReservations([]);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      console.log('[ReservationsScreen] Tela em foco, chamando loadData.');
      loadData();
    }, [])
  );

  const handleLogout = async () => {
    console.log('[ReservationsScreen] Botão Sair pressionado.');
    await logout();
    setIsLoggedIn(false);
    setReservations([]);
    router.replace('/');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Header />
        <ActivityIndicator size="large" color="#007bff" style={{marginTop: 20}} />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.reservationsHeader}>
        <Text style={styles.screenTitle}>Minhas Reservas</Text>
        {isLoggedIn && (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="logout" size={24} color="#dc3545" />
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        )}
      </View>

      {!isLoggedIn ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Você precisa estar logado para ver suas reservas.</Text>
          <TouchableOpacity style={styles.browseToursButton} onPress={() => {
              console.log('[ReservationsScreen] Botão Fazer Login pressionado.');
              router.push('/auth');
            }}>
            <Text style={styles.browseToursButtonText}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      ) : reservations.length === 0 ? (
        <View style={styles.noReservationsContainer}>
          <Text style={styles.noReservationsText}>Você ainda não possui reservas.</Text>
          <TouchableOpacity style={styles.browseToursButton} onPress={() => {
              console.log('[ReservationsScreen] Botão Explorar Passeios pressionado.');
              router.push('/tours');
            }}>
            <Text style={styles.browseToursButtonText}>Explorar Passeios</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Reservation }) => (
            <View style={styles.reservationCard}>
              <Text style={styles.reservationTitle}>{item.tourTitle}</Text>
              <Text style={styles.reservationDetail}>Data: {item.date}</Text>
              <Text style={styles.reservationDetail}>Hora: {item.time}</Text>
              <Text style={styles.reservationStatus}>Status: {item.status}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  console.log(`[ReservationsScreen] Botão Editar pressionado para reserva ID: ${item.id}`);
                  router.push({
                    pathname: '/reserveForm',
                    params: {
                      tourId: item.tourId,
                      tourTitle: item.tourTitle,
                      reservationId: item.id,
                      currentDate: item.date,
                      currentTime: item.time,
                      isEditing: 'true',
                    },
                  });
                }}
              >
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
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
    marginBottom: 20,
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
    backgroundColor: '#ffe6e6',
  },
  logoutButtonText: {
    color: '#dc3545',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 70,
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
  editButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});