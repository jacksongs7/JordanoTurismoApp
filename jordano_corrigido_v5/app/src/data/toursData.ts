// src/data/toursData.ts
import { Tour } from '../types';

export const tours: Tour[] = [
  // ... (Conteúdo idêntico ao fornecido anteriormente com todas as 11 tours e URLs de imagem)
  {
    id: '1',
    title: 'Tour Rural',
    shortDescription: 'Conhecendo a região considerada berço do desenvolvimento de Gramado.',
    fullDescription: 'Neste passeio você vai visitar as seguintes atrações: Casa centenária, Fábrica da erva mate, Museu Casa da nona (com sanfoneiro e café colonial no almoço), Vinícola Jolimont, Casa Chaulet (com degustação de queijo e salame) e Fábrica de chocolate. Agende agora conosco.',
    image: 'https://jordanoturismo.com.br/assets/img/servico/tour-rural.jpg' // Exemplo de URL de imagem
  },
  {
    id: '2',
    title: 'Noite Suíça',
    shortDescription: 'Experimente uma noite com Fondue tradicional em Gramado!',
    fullDescription: 'Nesse combo, será incluso: – Jantar Suíço – Show de Luzes (Igreja de Canela) – Transporte ida e volta (Busca no Hotel). Agende agora conosco.',
    image: 'https://jordanoturismo.com.br/assets/img/servico/noite-suica.jpg'
  },
  // ... (e assim por diante para todos os 11 passeios)
];