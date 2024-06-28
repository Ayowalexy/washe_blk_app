import * as SecureStore from "expo-secure-store";

export const saveToken = async (key: string, value: string) =>
  await SecureStore.setItemAsync(key, value);
export const getToken = async (key: string): Promise<string | null> => {
  const value = await SecureStore.getItemAsync(key);
  return value ?? null;
};
