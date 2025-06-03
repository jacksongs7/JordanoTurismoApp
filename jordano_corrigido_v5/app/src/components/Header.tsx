// src/components/Header.tsx
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'; // Adicionado Text
import Logo from '../../assets/images/LOGO-JT.png';
import { useRouter } from 'expo-router'; // Importa useRouter
import Icon from 'react-native-vector-icons/FontAwesome'; // Instalar: npm install react-native-vector-icons

interface HeaderProps {
  showReservationsIcon?: boolean;
  showBackButton?: boolean; // Nova prop para botão de voltar
}

const Header: React.FC<HeaderProps> = ({ showReservationsIcon = false, showBackButton = false }) => {
  const router = useRouter(); // Usa useRouter

  const handleReservationsPress = () => {
    router.push('/reservations'); // Navega para a tela de reservas
  };

  const handleBackPress = () => {
    router.back(); // Volta para a tela anterior
  };

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-left" size={24} color="#007bff" />
        </TouchableOpacity>
      )}
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      {showReservationsIcon && (
        <TouchableOpacity style={styles.reservationsIcon} onPress={handleReservationsPress}>
          <Icon name="bookmark" size={24} color="#007bff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 40,
  },
  logo: {
    width: 180,
    height: 50,
  },
  reservationsIcon: {
    position: 'absolute',
    right: 15,
    top: 45,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 45,
    zIndex: 1, // Garante que o botão esteja acima do logo se houver sobreposição
  },
});

export default Header;