import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  NavigationContainer,
} from "@react-navigation/native";

import { useColorScheme } from "react-native";

import { TamaguiProvider } from "tamagui";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReactNode } from "react";
import config from "../theme";
import { Toast } from "react-native-toast-message/lib/src/Toast";

type Props = {
  children: ReactNode;
};
export default function AppProvider({ children }: Props) {
  const colorScheme = useColorScheme();
  return (
    // add this

    <TamaguiProvider config={config} defaultTheme={colorScheme}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {children}
            {/* <Toast config={toastConfig} /> */}
          </GestureHandlerRootView>
        </NavigationContainer>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
