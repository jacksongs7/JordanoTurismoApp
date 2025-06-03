// Em app/src/types/index.ts
import { ImageSourcePropType } from 'react-native'; // Importe ImageSourcePropType

export interface Tour {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  // image: string; // Linha antiga
  image: ImageSourcePropType; // Mude para ImageSourcePropType
}

export interface Reservation {
  id: string;
  tourId: string;
  tourTitle: string;
  date: string;
  time: string;
  status: 'Confirmada' | 'Pendente' | 'Cancelada';
}

export interface User {
  email: string;
  token: string;
}