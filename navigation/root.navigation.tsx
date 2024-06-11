import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "./app.roots.types";
import { useState } from "react";
import { AuthenticationStack } from "./onboarding";
import { BottomTabNavigation } from "./tabs.navigation";
import { HomeStack } from "./home.navigation";

const Stack = createNativeStackNavigator<AppRootStackParamsList>();
export const RootNavigator = () => {
  //   const [isLoggedIn, SetIsLoggedIn] = useState(false);
  //   useLayoutEffect(() => {
  //     (async () => {
  //       const looge = await getItem("isLoggedIn");
  //     //   await saveItem('isLoggedIn', '')
  //       setTimeout(async() => {
  //         await SplasScreen.hideAsync()
  //       }, 1000);
  //       SetIsLoggedIn(looge as any);
  //     })();
  //   }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* {!Boolean(isLoggedIn) && ( */}
      <Stack.Screen name="onboarding" component={AuthenticationStack} />
      {/* )} */}
      <Stack.Screen name="tabs" component={BottomTabNavigation} />
      <Stack.Screen name="home_stack" component={HomeStack} />
    </Stack.Navigator>
  );
};
