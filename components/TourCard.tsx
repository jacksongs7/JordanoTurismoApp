// src/components/TourCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
  onPress: (tour: Tour) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(tour)}>
      <Image source={{ uri: tour.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{tour.title}</Text>
        <Text style={styles.description}>{tour.shortDescription}</Text>
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
    overflow: 'hidden',
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
  },
  button: {
    backgroundColor: '#28a745',
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