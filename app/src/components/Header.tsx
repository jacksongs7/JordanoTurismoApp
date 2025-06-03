// app/src/components/Header.tsx
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Logo from '@/assets/images/logo-jt.png';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

interface HeaderProps {
  showReservationsIcon?: boolean;
  showBackButton?: boolean;
  showAuthButton?: boolean;
  showLogoInHeader?: boolean; // Nova prop para mostrar o logo no header
}

const Header: React.FC<HeaderProps> = ({ showReservationsIcon = false, showBackButton = false, showAuthButton = false, showLogoInHeader = false }) => {
  const router = useRouter();

  const handleReservationsPress = () => {
    console.log('[Header] Ícone de Reservas pressionado. Navegando para /reservations...');
    router.push('/reservations');
  };

  const handleBackPress = () => {
    console.log('[Header] Botão Voltar pressionado.');
    router.push('/tours');
  };

  const handleAuthPress = () => {
    console.log('[Header] Botão Login/Cadastro pressionado. Navegando para /auth...');
    router.push('/auth');
  };

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-left" size={24} color="#007bff" />
        </TouchableOpacity>
      )}

      {showLogoInHeader && (
        <Image source={Logo} style={styles.headerLogo} resizeMode="contain" />
      )}
      
      {/* placeholders para manter o alinhamento central do logo se necessário ou remover */}
      {!showBackButton && !showLogoInHeader && <View style={styles.placeholderLeft} />}


      <View style={styles.rightContent}>
        {showAuthButton && (
          <TouchableOpacity style={styles.authButton} onPress={handleAuthPress}>
            <Text style={styles.authButtonText}>Login / Cadastro</Text>
          </TouchableOpacity>
        )}

        {showReservationsIcon && (
          <TouchableOpacity style={styles.reservationsIcon} onPress={handleReservationsPress}>
            <Icon name="bookmark" size={24} color="#007bff" />
          </TouchableOpacity>
        )}
      </View>
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
    justifyContent: 'space-between', // Espaça os itens para as bordas
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 40, // Espaçamento do topo para Safe Area
  },
  headerLogo: { // Novo estilo para o logo no header
    width: 120, // Tamanho ajustado para o header
    height: 40,
    // position: 'absolute', // Remover position absolute se usarmos flexbox
    // left: 15, // Remover left se usarmos flexbox
    // top: 45, // Remover top se usarmos flexbox
  },
  reservationsIcon: {
    // Ajustar para flexbox, remover position absolute
    // position: 'absolute', // REMOVIDO
    // right: 15, // REMOVIDO
    // top: 45, // REMOVIDO
    marginLeft: 10, // Adiciona margem à esquerda para separação
  },
  backButton: {
    // Ajustar para flexbox, remover position absolute
    // position: 'absolute', // REMOVIDO
    // left: 15, // REMOVIDO
    // top: 45, // REMOVIDO
    marginRight: 10, // Adiciona margem à direita para separação
    zIndex: 1,
  },
  authButton: {
    // Ajustar para flexbox, remover position absolute
    // position: 'absolute', // REMOVIDO
    // right: 15, // REMOVIDO
    // top: 45, // REMOVIDO
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
    zIndex: 1,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderLeft: { // Placeholder para manter o espaçamento à esquerda se não houver backButton ou logo
    width: 24, // Largura de um ícone
    height: 24,
  }
});

export default Header;