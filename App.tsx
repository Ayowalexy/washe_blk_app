import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
// import { AppStackNavigation } from "./navigation/root.navigation";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import AppProvider from "./provider/app-provider";
import { RootNavigator } from "./navigation/root.navigation";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";

// if (Platform.OS === "android") {
//   GoogleSignin.configure({
//     iosClientId:
//       "com.googleusercontent.apps.747966698616-nlc46s0ne6f609fu36bqvjt3a3lmooau",
//     webClientId:
//       "676810860447-33heupb16mst3efpvl2lkm2pdavoivlr.apps.googleusercontent.com",
//     offlineAccess: false,
//     scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
//   });
// }

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("./assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
