// app/src/components/TourCard.tsx
import React from 'react'; // ÚNICA importação do React aqui
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
// O caminho para 'types' depende de onde está seu arquivo types/index.ts em relação a este.
// Se types/index.ts está em app/src/types:
import { Tour } from '../types';
// Se você tem um alias como @/types configurado para app/src/types, você pode usar:
// import { Tour } from '@/types';

interface TourCardProps {
  tour: Tour; // A interface Tour deve ter 'image: ImageSourcePropType;'
  onPress: (tour: Tour) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(tour)}>
      {/* A prop 'source' do Image agora usa diretamente tour.image, 
          que pode ser um require() ou um objeto { uri: ... } 
          graças ao tipo ImageSourcePropType na interface Tour. */}
      <Image source={tour.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{tour.title}</Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">{tour.shortDescription}</Text>
        <TouchableOpacity style={styles.button} onPress={() => onPress(tour)}>
          <Text style={styles.buttonText}>Saiba Mais / Reserve</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden', // Garante que a imagem não ultrapasse as bordas arredondadas
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    minHeight: 40, // Para dar um espaço mínimo para a descrição
  },
  button: {
    backgroundColor: '#28a745', // Verde
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TourCard;