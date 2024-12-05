import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppRootStackParamList } from "./app.root.types";
import AuthenticationStack from "./onboarding.navigation";
import { BottomTabNavigation } from "./tabs.navigation";

const Stack = createNativeStackNavigator<AppRootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="onboarding" component={AuthenticationStack} />
      <Stack.Screen name="tab" component={BottomTabNavigation} />
    </Stack.Navigator>
  );
}
