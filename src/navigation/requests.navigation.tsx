import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen, RequestScreen } from "../screens/tabs";

export type RequestStackParamList = {
  request_screen: undefined;
  map_screen: undefined;
};

const Stack = createNativeStackNavigator();

export const RequestStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="request_screen" component={RequestScreen as any} />
      <Stack.Screen name="map_screen" component={MapScreen as any} />
    </Stack.Navigator>
  );
};
