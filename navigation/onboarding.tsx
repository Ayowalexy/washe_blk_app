import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { AppRootStackParamsList } from "./app.roots.types";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  AddressInfo,
  CreateAccount,
  EnterPassword,
  ForgotPassword,
  IdVerification,
  Login,
  ResetPassword,
  UserDetails,
  VerifyOtp,
  Welcome,
} from "../src/screens";

export type AuthenticationStackParamsList = {
  welcome: undefined;
  create_account: {
    isUpdate: boolean;
  };
  enter_password: undefined;
  user_details: undefined;
  address_info: undefined;
  id_verification: undefined;
  login: undefined;
  forgot_password: undefined;
  verify_otp: {
    email: string;
  };
  reset_password: undefined;
};

export type AuthenticationStackScreenProps<
  T extends keyof AuthenticationStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<AuthenticationStackParamsList, T>,
  NativeStackScreenProps<AppRootStackParamsList>
>;
const Stack = createNativeStackNavigator<AuthenticationStackParamsList>();

export const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="create_account" component={CreateAccount as any} />
      <Stack.Screen name="enter_password" component={EnterPassword} />
      <Stack.Screen name="user_details" component={UserDetails} />
      <Stack.Screen name="address_info" component={AddressInfo} />
      <Stack.Screen name="id_verification" component={IdVerification as any} />
      <Stack.Screen name="login" component={Login as any} />
      <Stack.Screen name="forgot_password" component={ForgotPassword as any} />
      <Stack.Screen name="verify_otp" component={VerifyOtp as any} />
      <Stack.Screen name="reset_password" component={ResetPassword as any} />
    </Stack.Navigator>
  );
};
