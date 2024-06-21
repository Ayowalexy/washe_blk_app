import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthenticationStackParamsList } from "./onboarding";
import { BottomTabParamList } from "./tabs.navigation";
import { HomeStackParamList } from "./home.navigation";

export type AppRootStackParamsList = {
  onboarding: NavigatorScreenParams<AuthenticationStackParamsList>;
  tabs: NavigatorScreenParams<BottomTabParamList>;
  home_stack: NavigatorScreenParams<HomeStackParamList>;
  // Home: NavigatorScreenParams<HomeStackParamList>;
};

export type AppStackScreenProps<T extends keyof AppRootStackParamsList> =
  NativeStackScreenProps<AppRootStackParamsList, T>;

export type AppStackNavigationProp<T extends keyof AppRootStackParamsList> =
  NativeStackNavigationProp<AppRootStackParamsList, T>;
