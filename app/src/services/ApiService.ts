// app/src/services/ApiService.ts
import { Reservation, Tour } from '../types'; // Verifique se este caminho está correto
import { tours } from '../data/toursData';   // Verifique se este caminho está correto

// Simula um banco de dados de reservas por usuário
const userReservations: { [email: string]: Reservation[] } = {
  'teste@email.com': [
    { id: 'res1', tourId: '1', tourTitle: 'Tour Rural', date: '10/07/2025', time: '08:00', status: 'Confirmada' },
    { id: 'res2', tourId: '3', tourTitle: 'City Tour das Hortênsias', date: '12/07/2025', time: '14:00', status: 'Pendente' },
  ],
  'jackson@email.com': [ // Adicionado para consistência com logs anteriores
    { id: 'res3', tourId: '4', tourTitle: 'Vôo de Balão', date: '05/08/2025', time: '06:00', status: 'Confirmada' },
  ],
  'jackson_guedes@hotmail.com': [ // Adicionado para consistência com logs anteriores
    // Exemplo de reservas para o usuário do log
  ]
};

export const fetchUserReservations = async (userEmail: string): Promise<Reservation[]> => {
  console.log(`[ApiService] Buscando reservas para: ${userEmail}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const reservations = userReservations[userEmail] || [];
      console.log(`[ApiService] Encontradas ${reservations.length} reservas para ${userEmail}.`);
      resolve(reservations);
    }, 300);
  });
};

export const createReservation = async (
  userEmail: string,
  tourId: string,
  reservationDate: string,
  reservationTime: string
): Promise<Reservation> => {
  console.log(`[ApiService] Tentando criar reserva para ${userEmail}, tourId: ${tourId}, Data: ${reservationDate}, Hora: ${reservationTime}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tour = tours.find(t => t.id === tourId);
      if (!tour) {
        console.error(`[ApiService] Passeio não encontrado para ID: ${tourId}`);
        return reject(new Error('Passeio não encontrado.'));
      }
      const newReservation: Reservation = {
        id: `res${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        tourId: tour.id,
        tourTitle: tour.title,
        date: reservationDate,
        time: reservationTime,
        status: 'Pendente',
      };

      if (!userReservations[userEmail]) {
        userReservations[userEmail] = [];
      }
      userReservations[userEmail].push(newReservation);
      console.log(`[ApiService] Reserva criada com sucesso: ID ${newReservation.id} para ${userEmail}`);
      resolve(newReservation);
    }, 300);
  });
};

export const updateReservation = async (
  reservationId: string,
  userEmail: string,
  newDate: string,
  newTime: string
): Promise<Reservation> => {
  console.log(`[ApiService] Tentando atualizar reserva ID: ${reservationId} para Data: ${newDate}, Hora: ${newTime}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userReservations[userEmail]) {
        console.error(`[ApiService] Usuário ${userEmail} não encontrado para atualização da reserva ${reservationId}.`);
        return reject(new Error('Usuário não encontrado ou não autorizado.'));
      }

      const reservationIndex = userReservations[userEmail].findIndex(res => res.id === reservationId);

      if (reservationIndex === -1) {
        console.error(`[ApiService] Reserva ID: ${reservationId} não encontrada para o usuário ${userEmail}.`);
        return reject(new Error('Reserva não encontrada.'));
      }

      userReservations[userEmail][reservationIndex] = {
        ...userReservations[userEmail][reservationIndex],
        date: newDate,
        time: newTime,
        status: 'Pendente', // Pode redefinir o status para Pendente ou manter
      };

      const updatedReservation = userReservations[userEmail][reservationIndex];
      console.log(`[ApiService] Reserva ID: ${updatedReservation.id} atualizada com sucesso para ${userEmail}.`);
      resolve(updatedReservation);
    }, 300);
  });
};