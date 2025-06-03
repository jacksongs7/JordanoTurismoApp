// app/_lib/types/index.ts

export interface Tour {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string; // URL da imagem do passeio
}

export interface Reservation {
  id: string;
  tourId: string;
  tourTitle: string;
  date: string; // Ex: "DD/MM/YYYY"
  time: string; // Ex: "HH:MM"
  status: 'Confirmada' | 'Pendente' | 'Cancelada';
}

export interface User {
  email: string;
  token: string;
  // Outros dados do usuário se necessário
}