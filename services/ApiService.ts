// src/services/ApiService.ts
import { Reservation, Tour } from '../types';
import { tours } from '../data/toursData';

const userReservations: { [email: string]: Reservation[] } = {
  'teste@email.com': [
    { id: 'res1', tourId: '1', tourTitle: 'Tour Rural', date: '10/07/2025', time: '08:00', status: 'Confirmada' },
    { id: 'res2', tourId: '3', tourTitle: 'City Tour das Hortênsias', date: '12/07/2025', time: '14:00', status: 'Pendente' },
  ],
  'jackson@email.com': [
    { id: 'res3', tourId: '4', tourTitle: 'Vôo de Balão', date: '05/08/2025', time: '06:00', status: 'Confirmada' },
  ],
};

export const fetchUserReservations = async (userEmail: string): Promise<Reservation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reservations = userReservations[userEmail] || [];
      resolve(reservations);
    }, 500);
  });
};

export const createReservation = async (userEmail: string, tourId: string): Promise<Reservation> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tour = tours.find(t => t.id === tourId);
      if (!tour) {
        return reject(new Error('Passeio não encontrado.'));
      }
      const newReservation: Reservation = {
        id: `res${Date.now()}`,
        tourId: tour.id,
        tourTitle: tour.title,
        date: 'DD/MM/YYYY',
        time: 'HH:MM',
        status: 'Pendente',
      };

      if (!userReservations[userEmail]) {
        userReservations[userEmail] = [];
      }
      userReservations[userEmail].push(newReservation);
      resolve(newReservation);
    }, 500);
  });
};