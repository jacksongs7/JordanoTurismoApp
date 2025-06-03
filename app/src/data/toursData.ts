// app/src/data/toursData.ts
import { Tour } from '../types'; // Caminho relativo se types/index.ts está em app/src/types

export const tours: Tour[] = [
  {
    id: '1',
    title: 'Tour Rural',
    shortDescription: 'Conhecendo a região considerada berço do desenvolvimento de Gramado.',
    fullDescription: 'Neste passeio você vai visitar as seguintes atrações: Casa centenária, Fábrica da erva mate, Museu Casa da nona (com sanfoneiro e café colonial no almoço), Vinícola Jolimont, Casa Chaulet (com degustação de queijo e salame) e Fábrica de chocolate. Agende agora conosco.',
    image: require('../assets/images/tour_rural.jpg') // Caminho corrigido
  },
  {
    id: '2',
    title: 'Noite Suíça',
    shortDescription: 'Experimente uma noite com Fondue tradicional em Gramado!',
    fullDescription: 'Nesse combo, será incluso: – Jantar Suíço – Show de Luzes (Igreja de Canela) – Transporte ida e volta (Busca no Hotel). Agende agora conosco.',
    image: require('../assets/images/noite_suica.jpg') // Nome do arquivo corrigido
  },
  {
    id: '3',
    title: 'City Tour das Hortênsias',
    shortDescription: 'Visita-se os principais pontos turísticos de Gramado e Canela.',
    fullDescription: 'Com clima de montanha, paisagens deslumbrantes e locais de puro encantamento, visita-se os principais pontos turísticos de Gramado e Canela, cidades ícones da Serra Gaúcha. Os locais visitados são Lago Negro, Artesanato Noel, Fábrica de Chocolate, Planalto, Adega de queijos e vinhos, Bondinhos Aéreos, que tem uma vista fascinante da Cascata do Caracol, além é claro da parada na Igreja de Pedra de Canela, Pórtico Italiano, Malharia e Mundo Gelado. Agende agora conosco.',
    image: require('../assets/images/City_Tour_das_Hortensias.jpg') // Nome do arquivo corrigido
  },
  {
    id: '4',
    title: 'Vôo de Balão',
    shortDescription: 'A decolagem acontece na parte da manhã ou tarde, em Cambará do Sul.',
    fullDescription: 'A decolagem acontece na parte da manhã ou tarde, em Cambará do Sul e tem a duração de 40 a 60 minutos. O voo proporciona uma vista dos Campos de cima da Serra, vales, montanhas também a cidade. Variando em 800 metros de altitude (Dependendo as condições climáticas, podendo chegar a 1500 metros de altitude). Agende agora conosco.',
    image: require('../assets/images/Voo_de_balao.jpg') // Nome do arquivo corrigido
  },
  {
    id: '5',
    title: 'Tour Cânion Itaimbezinho',
    shortDescription: 'Uma das mais exuberantes paisagens brasileiras está localizada em Cambará do Sul.',
    fullDescription: 'Uma das mais exuberantes paisagens brasileiras está localizada nos Campos de Cima da Serra, em Cambará do Sul. É o Cânion Itaimbezinho, o maior da América Latina. Há pouco mais de duas horas de viagem de Gramado, o Parque Nacional dos Aparados da Serra abriga um dos pontos turísticos naturais mais deslumbrantes do Rio Grande do Sul. Agende agora conosco.',
    image: require('../assets/images/Tour_Canion_Itaimbezinho.jpg') // Nome do arquivo corrigido
  },
  {
    id: '6',
    title: 'Tour da Colônia',
    shortDescription: 'Esse passeio inclui visitação à Vinícola Jolimont e casa de queijos.',
    fullDescription: 'Esse passeio inclui visitação à Vinícola Jolimont, Casa de queijos e salames artesanal (degustação), Fábrica de chocolate (degustação), e Café colonial com sanfoneiro na casa da Nona. Agende agora conosco.',
    image: require('../assets/images/Tour_da_colonia.webp') // Nome do arquivo corrigido
  },
  {
    id: '7',
    title: 'Rota Cervejeira',
    shortDescription: 'Neste passeio você irá visitar 3 cervejarias.',
    fullDescription: 'Neste passeio você irá visitar 3 cervejarias. Chopp a vontade durante todo o passeio e transporte inclusos. Visitamos 3 cervejarias (Grambier, Kraustin Bier e Rasen Bier) – Buscamos no seu hotel – Saidas: Terças, quintas e sábado – demais dias sob consulta Horário de saída: as 13h30 até em torno 19h Não incluso: bebidas, degustação e refeições nas cervejarias Agende agora conosco.',
    image: require('../assets/images/Rota_cervejeira.jpg') // Caminho corrigido
  },
  {
    id: '8',
    title: 'Tour Nova Petrópolis',
    shortDescription: 'Passeio ideal para conhecer um pouco mais sobre a cultura alemã.',
    fullDescription: 'Passeio ideal para aqueles que querem conhecer um pouco mais sobre a cultura alemã através da arquitetura, gastronomia e parques da cidade de Nova Petrópolis. Capital Nacional do Cooperativismo, Nova Petrópolis apresenta uma tradição sem igual. Neste roteiro, você conhecerá a Vista do Vale, Pedras do Silêncio, Aldeia do Imigrante, Praça das Flores, Labirinto Verde, Dakota e Plantação de Morango. Agende agora conosco.',
    image: require('../assets/images/tour_nova_petropolis.jpg') // Nome do arquivo corrigido
  },
  {
    id: '9',
    title: 'Jantar Típico: Noite Gaúcha',
    shortDescription: 'Jantar típico Gaúcho com churrasco e costelão na vala.',
    fullDescription: 'Jantar típico Gaúcho com churrasco e costelão na vala, na companhia de lindas apresentações culturais. A Noite Gaúcha no Garfo e Bombacha, com Churrasco e Show Tradicional de músicas e danças, leve para casa as melhores lembranças em uma rica experiência cultural na Serra. Agende agora conosco.',
    image: require('../assets/images/Jantar_tipico_noite_gaucha.jpg') // Nome do arquivo corrigido
  },
  {
    id: '10',
    title: 'Jantar Típico: Noite Italiana',
    shortDescription: 'Uma noite de imersão na cultura e festa como as antigas famílias italianas.',
    fullDescription: 'Uma noite de imersão na cultura, onde você terá a oportunidade de jantar e festejar assim como as antigas famílias italianas faziam nos porões das suas casas. Em um local totalmente decorado como as antigas casas das famílias italianas, você terá um jantar especial com muita comida típica. Além disso, haverá um emocionante show e uma encenação teatral muito divertida, que contará a curiosa história de uma família que mora no interior, mas que tenta se adaptar a modernidade da cidade. Agende agora conosco.',
    image: require('../assets/images/Jantar_tipico_noite_italiana.jpg') // Nome do arquivo corrigido
  },
  {
    id: '11',
    title: 'Jantar Típico: Noite Alemã',
    shortDescription: 'Na Noite Alemã em Nova Petrópolis você vai saborear um delicioso jantar.',
    fullDescription: 'Na Noite Alemã em Nova Petrópolis você vai saborear um delicioso jantar com o melhor da comida alemã acompanhado de um delicioso café colonial. São cerca de 130 variedades que se dividem entre o buffet de pratos quentes com comidas alemãs e o buffet de café colonial.\n\nNos pratos de comidas alemãs, destacam-se o Eisbein (joelho de porco), Kassler (lombo defumado cozido), Bockwurst (salsicha bock) e o tradicional Sauerkraut (chucrute). Há também deliciosas opções de pratos no buffet de café colonial, entre os pratos doces, receitas autênticas trazidas pelos colonizadores, como a Torta Alemã e o Apfelstrudel (torta de maçã). Agende agora conosco.',
    image: require('../assets/images/Jantar_tipico_noite_alema.jpg') // Nome do arquivo corrigido
  },
];