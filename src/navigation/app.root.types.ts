import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AuthenticationStackParamList } from "./onboarding.navigation";
import { BottomTabParamList } from "./tabs.navigation";

export type AppRootStackParamList = {
  onboarding: NavigatorScreenParams<AuthenticationStackParamList>;
  tab: NavigatorScreenParams<BottomTabParamList>;
};

export type AppStackScreenProps<T extends keyof AppRootStackParamList> =
  NativeStackScreenProps<AppRootStackParamList, T>;

export type AppStackNavigationProp<T extends keyof AppRootStackParamList> =
  NativeStackNavigationProp<AppRootStackParamList, T>;
