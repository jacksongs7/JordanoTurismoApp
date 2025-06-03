// app/_lib/components/Header.tsx
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

// Importa o logo usando o alias '@' para a raiz do projeto
import Logo from '@/assets/images/logo-jt.png'; // Caminho ajustado para '@/assets' e nome minúsculo

interface HeaderProps {
  showReservationsIcon?: boolean;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showReservationsIcon = false, showBackButton = false }) => {
  const router = useRouter();

  const handleReservationsPress = () => {
    // Navega para a tela de reservas que está em app/(tabs)/reservations.tsx
    router.push('/reservations');
  };

  const handleBackPress = () => {
    router.back();
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
    zIndex: 1,
  },
});

export default Header;