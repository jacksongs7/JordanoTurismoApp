// app/src/(tabs)/reserveForm.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Header from '@/components/Header';
import { getToken } from '@/services/AuthService';
import { createReservation, updateReservation } from '@/services/ApiService';

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const parseDateString = (dateString: string): Date | null => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            return new Date(year, month, day);
        }
    }
    return null;
};

const parseTimeString = (timeString: string, baseDate: Date): Date | null => {
    const parts = timeString.split(':');
    if (parts.length === 2) {
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        if (!isNaN(hours) && !isNaN(minutes)) {
            const newDate = new Date(baseDate);
            newDate.setHours(hours, minutes, 0, 0);
            return newDate;
        }
    }
    return null;
};

export default function ReserveFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    tourId: string;
    tourTitle: string;
    reservationId?: string;
    currentDate?: string;
    currentTime?: string;
    isEditing?: string;
  }>();

  const { tourId, tourTitle, reservationId, currentDate, currentTime, isEditing } = params;
  const editingMode = isEditing === 'true' && !!reservationId;

  const [date, setDate] = useState(() => {
    if (editingMode && currentDate) {
      return parseDateString(currentDate) || new Date(new Date().setDate(new Date().getDate() + 1));
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [time, setTime] = useState(() => {
    const baseDateForTime = (editingMode && currentDate ? parseDateString(currentDate) : new Date()) || new Date();
    if (editingMode && currentTime) {
      return parseTimeString(currentTime, baseDateForTime) || new Date(new Date(baseDateForTime).setHours(baseDateForTime.getHours() + 1, 0, 0, 0));
    }
    const now = new Date(baseDateForTime);
    now.setHours(now.getHours() + 1, 0, 0, 0);
    return now;
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      if (token) {
        const tokenPrefixUser = "fake_jwt_token_for_user_";
        const tokenPrefixNewUser = "fake_jwt_token_for_new_user_";
        let email: string | null = null;
        if (token.startsWith(tokenPrefixUser)) {
          email = token.substring(tokenPrefixUser.length);
        } else if (token.startsWith(tokenPrefixNewUser)) {
          email = token.substring(tokenPrefixNewUser.length);
        }
        setUserEmail(email);
        if (!email) {
            console.error("[ReserveFormScreen] Token presente, mas e-mail não pôde ser extraído.");
            Alert.alert("Erro de Autenticação", "Não foi possível identificar o usuário. Faça login novamente.");
            router.replace("/auth");
        }
      } else {
        console.log("[ReserveFormScreen] Usuário não logado, redirecionando para /auth.");
        Alert.alert("Login Necessário", "Você precisa estar logado para agendar um passeio.");
        router.replace("/auth");
      }
    };
    if (tourId) {
        fetchUser();
    }
  }, [tourId, router]);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      console.log(`[ReserveFormScreen] Data selecionada: ${formatDate(selectedDate)}`);
    }
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
      console.log(`[ReserveFormScreen] Hora selecionada: ${formatTime(selectedTime)}`);
    }
  };

  const handleConfirmOrUpdateReservation = async () => {
    if (!tourId || !userEmail) {
      Alert.alert('Erro', 'Informações do passeio ou do usuário estão ausentes. Tente novamente.');
      console.error('[ReserveFormScreen] Tentativa de confirmar/atualizar reserva sem tourId ou userEmail.', { tourId, userEmail });
      return;
    }
    setLoading(true);
    const formattedDate = formatDate(date);
    const formattedTime = formatTime(time);

    try {
      if (editingMode && reservationId) {
        console.log(`[ReserveFormScreen] Atualizando reserva ID: ${reservationId} para: ${userEmail}, Passeio ID: ${tourId}, Data: ${formattedDate}, Hora: ${formattedTime}`);
        await updateReservation(reservationId, userEmail, formattedDate, formattedTime);
        Alert.alert(
          'Reserva Atualizada!',
          `Sua reserva para "${tourTitle}" foi atualizada para ${formattedDate} às ${formattedTime}.`,
          [{ text: 'OK', onPress: () => router.replace('/reservations') }]
        );
      } else {
        console.log(`[ReserveFormScreen] Confirmando nova reserva para: ${userEmail}, Passeio ID: ${tourId}, Data: ${formattedDate}, Hora: ${formattedTime}`);
        await createReservation(userEmail, tourId, formattedDate, formattedTime);
        Alert.alert(
          'Reserva Solicitada!',
          `Sua reserva para "${tourTitle}" em ${formattedDate} às ${formattedTime} foi solicitada com sucesso.`,
          [{ text: 'OK', onPress: () => router.replace('/reservations') }]
        );
      }
    } catch (error: any) {
      console.error(`[ReserveFormScreen] Erro ao ${editingMode ? 'atualizar' : 'confirmar'} reserva:`, error);
      Alert.alert(`Erro na ${editingMode ? 'Atualização' : 'Reserva'}`, error.message || `Não foi possível ${editingMode ? 'atualizar' : 'completar'} sua reserva.`);
    } finally {
      setLoading(false);
    }
  };

  if (!tourId || !tourTitle) {
      console.error("[ReserveFormScreen] tourId ou tourTitle não foram recebidos nos parâmetros da rota.");
      return (
          <View style={styles.container}>
              <Header showBackButton />
              <View style={styles.contentContainer}>
                <Text style={styles.errorText}>Erro: Informações do passeio não foram encontradas. Por favor, tente novamente.</Text>
              </View>
          </View>
      )
  }

  return (
    <View style={styles.container}>
      <Header showBackButton={true} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{editingMode ? 'Editar Reserva' : 'Agendar Passeio'}</Text>
        <Text style={styles.tourTitleText}>{tourTitle}</Text>

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.pickerButton}>
          <Text style={styles.pickerButtonText}>Selecionar Data: {formatDate(date)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
            minimumDate={new Date(new Date().setDate(new Date().getDate() + (editingMode ? 0 : 1)))}
          />
        )}

        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.pickerButton}>
          <Text style={styles.pickerButtonText}>Selecionar Hora: {formatTime(time)}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onChangeTime}
          />
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
        ) : (
          <TouchableOpacity
            style={[styles.confirmButton, editingMode && styles.updateButton]}
            onPress={handleConfirmOrUpdateReservation}
            disabled={!userEmail}
          >
            <Text style={editingMode ? styles.updateButtonText : styles.confirmButtonText}>
              {editingMode ? 'Atualizar Reserva' : 'Confirmar Reserva'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  tourTitleText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 25,
    textAlign: 'center',
  },
  pickerButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#ffc107', // Amarelo para o botão de atualizar
  },
  updateButtonText: { // Estilo específico para o texto do botão de atualizar, se necessário
    color: '#000', // Texto preto para melhor contraste com amarelo
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 30,
  },
  errorText: {
      fontSize: 16,
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
  }
});