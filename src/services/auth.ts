import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  email: string;
  name: string;
};

const USERS_KEY = 'APP_USERS';
const TOKEN_KEY = 'APP_TOKEN';

// Simulated auth storage
export async function register(email: string, password: string, name: string) {
  const usersRaw = await AsyncStorage.getItem(USERS_KEY);
  const users: Record<string, { password: string; name: string }> = usersRaw
    ? JSON.parse(usersRaw)
    : {};
  if (users[email]) {
    throw new Error('El correo ya está registrado');
  }
  users[email] = { password, name };
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  const token = `token-${Date.now()}`;
  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify({ token, email }));
  return { token, user: { email, name } as User };
}

export async function login(email: string, password: string) {
  const usersRaw = await AsyncStorage.getItem(USERS_KEY);
  const users: Record<string, { password: string; name: string }> = usersRaw
    ? JSON.parse(usersRaw)
    : {};
  const entry = users[email];
  if (!entry || entry.password !== password) {
    throw new Error('Credenciales inválidas');
  }
  const token = `token-${Date.now()}`;
  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify({ token, email }));
  return { token, user: { email, name: entry.name } as User };
}

export async function logout() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function getCurrentSession(): Promise<
  | { token: string; user: User }
  | null
> {
  const raw = await AsyncStorage.getItem(TOKEN_KEY);
  if (!raw) return null;
  try {
    const { token, email } = JSON.parse(raw);
    const usersRaw = await AsyncStorage.getItem(USERS_KEY);
    const users: Record<string, { password: string; name: string }> = usersRaw
      ? JSON.parse(usersRaw)
      : {};
    const entry = users[email];
    if (!entry) return null;
    return { token, user: { email, name: entry.name } };
  } catch (e) {
    return null;
  }
}
