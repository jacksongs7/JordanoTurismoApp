// app/_lib/services/AuthService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/app/_lib/types'; // Caminho ajustado

const USER_TOKEN_KEY = 'user_token';
const FAKE_USERS: { [email: string]: string } = {
  'teste@email.com': '12345',
  'jackson@email.com': 'dev123',
}; // Simulação de usuários

export const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      if (!email || !password) {
        return reject({ success: false, message: 'Email e senha são obrigatórios.' });
      }
      if (FAKE_USERS[email] === password) {
        const token = `fake_jwt_token_for_user_${email}`;
        await AsyncStorage.setItem(USER_TOKEN_KEY, token);
        resolve({ email, token });
      } else {
        reject({ success: false, message: 'Email ou senha inválidos.' });
      }
    }, 1000);
  });
};

export const register = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      if (!email || !password) {
        return reject({ success: false, message: 'Email e senha são obrigatórios.' });
      }
      if (FAKE_USERS[email]) {
        return reject({ success: false, message: 'Este e-mail já está cadastrado.' });
      }
      FAKE_USERS[email] = password;
      const token = `fake_jwt_token_for_new_user_${email}`;
      await AsyncStorage.setItem(USER_TOKEN_KEY, token);
      resolve({ email, token });
    }, 1000);
  });
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(USER_TOKEN_KEY);
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem(USER_TOKEN_KEY);
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getToken();
  return !!token;
};