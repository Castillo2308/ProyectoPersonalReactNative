// Simple web polyfill for AsyncStorage using localStorage

type MaybeString = string | null;

const AsyncStorage = {
  async getItem(key: string): Promise<MaybeString> {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch {}
  },
  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch {}
  },
};

export default AsyncStorage;
