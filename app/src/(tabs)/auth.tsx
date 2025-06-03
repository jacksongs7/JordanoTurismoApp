// app/(tabs)/auth.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Importa useRouter
import AuthInput from '@/components/AuthInput'; // Caminho corrigido
import { login, register } from '@/services/AuthService'; // Caminho corrigido
import Logo from '@/assets/images/logo-jt.png'; // Caminho corrigido para o alias e nome minúsculo

export default function AuthScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isLoginMode) {
        await login(email, password);
        Alert.alert('Sucesso!', 'Login realizado com sucesso.');
      } else {
        await register(email, password);
        Alert.alert('Sucesso!', 'Conta criada com sucesso. Você já está logado!');
      }
      router.replace('/reservations'); // Redireciona para a tela de reservas
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>{isLoginMode ? 'Entrar' : 'Criar Conta'}</Text>

      <AuthInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <AuthInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>{isLoginMode ? 'Entrar' : 'Cadastrar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchButton} onPress={() => setIsLoginMode(!isLoginMode)}>
            <Text style={styles.switchButtonText}>
              {isLoginMode ? 'Não tem conta? Crie uma!' : 'Já tem conta? Faça login!'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
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
  switchButton: {
    marginTop: 10,
  },
  switchButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
});