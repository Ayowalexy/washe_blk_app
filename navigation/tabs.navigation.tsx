import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { AppRootStackParamsList } from "./app.roots.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  HomeIcon,
  Notifications,
  RequestIcon,
  SettingsIcon,
} from "../utils/assets";
import { useTheme } from "tamagui";
import {
  Home,
  Requests,
  Settings,
  NotificationsPage,
} from "../src/screens/tabs";

export type BottomTabParamList = {
  Home: undefined;
  request: undefined;
  notifications: undefined;
  settings: undefined;
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
  notifications: ({ color, focused }) => (
    <Notifications color={color} focused={focused} />
  ),
  settings: ({ color, focused }) => (
    <SettingsIcon color={color} focused={focused} />
  ),
};
const Tab = createBottomTabNavigator();
export type RootTabNavigationProp<T extends keyof BottomTabParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, T>,
    NativeStackNavigationProp<AppRootStackParamsList>
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
          shadowOffset: { width: 3, height: -9 }, // Negative height for shadow on top
          shadowOpacity: 0.6,
          shadowRadius: 5,
          // Shadow for Android
          elevation: 10, // Increase elevation if needed
          backgroundColor: "white",
          borderTopWidth: 0,
          paddingTop: 20,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home as any} />
      <Tab.Screen name="request" component={Requests as any} />
      <Tab.Screen name="notifications" component={NotificationsPage as any} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  );
};
