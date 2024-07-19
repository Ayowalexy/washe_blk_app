import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  NavigationContainer,
} from "@react-navigation/native";

import { useColorScheme } from "react-native";

import { TamaguiProvider } from "@tamagui/core";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReactNode } from "react";
import config from "../theme";
import Toast from "react-native-toast-message";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { toastConfig } from "../components/ui/toast-config";

type Props = {
  children: ReactNode;
};
export const queryClient = new QueryClient();

export default function AppProvider({ children }: Props) {
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
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
