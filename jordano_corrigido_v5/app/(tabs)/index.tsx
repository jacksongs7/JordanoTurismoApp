// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';

// Importa o logo usando o alias '@' para a raiz do projeto
import Logo from '@/assets/images/logo-jt.png'; // Caminho ajustado para '@/assets' e nome minúsculo

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>Bem-vindo à Jordano Turismo!</Text>

      <Text style={styles.description}>
        Desvende os encantos da Serra Gaúcha com a Jordano Turismo.
        Conheça nossos roteiros e viva experiências inesquecíveis!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/tours')} // Navega para a rota /tours (mapeia para app/(tabs)/tours.tsx)
      >
        <Text style={styles.buttonText}>Ver Passeios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});