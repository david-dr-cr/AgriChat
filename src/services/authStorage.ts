import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@AgriChat:token';
const USER_KEY = '@AgriChat:user';

// Enregistrer le JWT
export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

// Récupérer le JWT
export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

// Enregistrer les informations utilisateur
export const saveUser = async (user: any) => {
  await AsyncStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

// Récupérer l'utilisateur
export const getUser = async () => {
  const user = await AsyncStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user);
};

// Supprimer la session
export const clearAuth = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);

};