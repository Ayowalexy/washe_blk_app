import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "./app.roots.types";
import { PaymentSuccessful, RequestHistory } from "../src/screens/home";

export type HomeStackParamList = {
  payment_successful: undefined;
  request_history: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    NativeStackScreenProps<AppRootStackParamsList>
  >;
const Stack = createNativeStackNavigator<HomeStackParamList>();
export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="payment_successful"
        component={PaymentSuccessful as any}
      />
      <Stack.Screen
        name="request_history"
        component={RequestHistory as any}
      />
    </Stack.Navigator>
  );
};
