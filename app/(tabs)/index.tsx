// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { useRouter } from 'expo-router';
// import Logo from '@/assets/images/logo-jt.png'; // REMOVIDO: Logo será renderizado no Header
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '@/components/Header'; // Importa seu componente Header

export default function HomeScreen() {
  const router = useRouter();

  const whatsappLinkLeft = 'http://wa.me/+5554981133370?text=Oi,%20tudo%20bem?%20Gostaria%20de%20Saber%20a%20Respeito%20dos%20passeios%20Pode%20me%20ajudar?%20';
  const whatsappLinkRight = 'http://wa.me/+5554992391616?text=Oi,%20tudo%20bem?%20Gostaria%20de%20Saber%20a%20Respeito%20dos%20passeios%20Pode%20me_ajudar?%20';

  const openWhatsApp = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error("Erro ao abrir WhatsApp: ", error);
    }
  };

  return (
    <View style={styles.fullContainer}>
      <Header showAuthButton={true} showLogoInHeader={true} /> {/* Passa a nova prop para mostrar o logo no header */}

      <View style={styles.contentContainer}>
        {/* REMOVIDO: <Image source={Logo} style={styles.logo} resizeMode="contain" /> */}

        <Text style={styles.title}>Bem-vindo à Jordano Turismo!</Text>

        <Text style={styles.description}>
          Desvende os encantos da Serra Gaúcha com a Jordano Turismo.
          Conheça nossos roteiros e viva experiências inesquecíveis!
        </Text>

        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfoText}>
            Nosso objetivo é proporcionar as melhores experiências de viagem para nossos clientes. Somos amantes da Serra Gaúcha, por isso nos dedicamos em levar o melhor atendimento para todos os turistas que desejam ardentemente conhecer as melhores atrações desses maravilhosos lugares.
          </Text>
          <Text style={styles.additionalInfoText}>
            Se o seu sonho é conhecer a Serra Gaúcha e não se preocupar com a qualidade dos seus passeios, entre em contato conosco e reserve já o seu passeio!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/tours')}
        >
          <Text style={styles.buttonText}>Ver Passeios</Text>
        </TouchableOpacity>
      </View>

      {/* Botões Flutuantes do WhatsApp */}
      <TouchableOpacity
        style={[styles.fab, styles.fabLeft]}
        onPress={() => openWhatsApp(whatsappLinkLeft)}
      >
        <Icon name="whatsapp" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.fab, styles.fabRight]}
        onPress={() => openWhatsApp(whatsappLinkRight)}
      >
        <Icon name="whatsapp" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  // REMOVIDO: logo style
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  additionalInfoContainer: {
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  additionalInfoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 5,
    marginBottom: Platform.OS === 'ios' ? 75 : 65,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    bottom: Platform.OS === 'ios' ? 55 : 50,
  },
  fabLeft: {
    left: 15,
  },
  fabRight: {
    right: 15,
  },
});