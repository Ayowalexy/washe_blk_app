import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useCallback, useEffect } from "react";
import "react-native-reanimated";

import AppProvider from "./src/provider/app.provider";
import { View } from "react-native";
import RootNavigator from "./src/navigation/root.navigation";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  const [fontsLoaded, fontError] = useFonts({
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("./assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.preventAutoHideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1, height: "auto" }} onLayout={onLayoutRootView}>
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </View>
  );
}
