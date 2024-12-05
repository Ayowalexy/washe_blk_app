import { Stack, TamaguiProvider, View } from "@tamagui/core";

import config from "../../theme";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/ui/toast.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
  children: ReactNode;
};
export const queryClient = new QueryClient();

export default function AppProvider({ children }: Props) {
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              {children}
              <Toast config={toastConfig} />
            </GestureHandlerRootView>
          </NavigationContainer>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
