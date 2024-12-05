import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { AppRootStackParamList } from "./app.root.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HistoryIcon, HomeIcon, RequestIcon, SettingsIcon } from "../utils/assets";
import { useTheme } from "tamagui";
import { History, Home, Settings } from "../screens/tabs";
import { RequestStack, RequestStackParamList } from "./requests.navigation";

export type BottomTabParamList = {
  Home: undefined;
  request: NavigatorScreenParams<RequestStackParamList>;
  history: undefined;
  settings: undefined
};

const tabBarIconMap: Record<
  string,
  ({ color, focused }: { color: string; focused: boolean }) => JSX.Element
> = {
  Home: ({ color, focused }) => {
    return <HomeIcon focused={focused} color={color} />;
  },
  request: ({ color, focused }) => (
    <RequestIcon color={color} focused={focused} />
  ),
  history: ({ color, focused }) => (
    <HistoryIcon color={color} focused={focused} />
  ),
  settings: ({ color, focused }) => (
    <SettingsIcon color={color} focused={focused} />
  ),
};
const Tab = createBottomTabNavigator();
export type RootTabNavigationProp<T extends keyof BottomTabParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, T>,
    NativeStackNavigationProp<AppRootStackParamList>
  >;
export const BottomTabNavigation = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: tabBarIconMap[route.name],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme?.primary3?.val,
        tabBarInactiveTintColor: theme?.black3?.val,
        tabBarStyle: {
          height: 72,
          shadowColor: "rgba(103, 114, 229, 0.08)",
          shadowOffset: { width: 3, height: -9 },
          shadowOpacity: 0.6,
          shadowRadius: 5,
          elevation: 10,
          backgroundColor: "white",
          borderTopWidth: 0,
          paddingTop: 20,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="request" component={RequestStack} />
      <Tab.Screen name="history" component={History} />
      <Tab.Screen name="settings" component={Settings as any} />
    </Tab.Navigator>
  );
};
