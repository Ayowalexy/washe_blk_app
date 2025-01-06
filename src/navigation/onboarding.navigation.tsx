import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AddressInfo,
  CreateAccount,
  EnterPassword,
  ForgotPassword,
  IdVerification,
  Login,
  ResetPassword,
  VerifyOtp,
  Welcome,
} from "../screens/onboarding";

export type AuthenticationStackParamList = {
  welcome: undefined;
  create_account: undefined;
  enter_password: undefined;
  address_info: undefined;
  id_verification: undefined;
  login: undefined;
  forgot_password: undefined;
  verify_otp: {
    email: string;
  };
  reset_password: undefined;
};

const Stack = createNativeStackNavigator();

export default function AuthenticationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={Welcome as any} />
      <Stack.Screen name="create_account" component={CreateAccount as any} />
      <Stack.Screen name="enter_password" component={EnterPassword as any} />
      <Stack.Screen name="address_info" component={AddressInfo as any} />
      <Stack.Screen name="id_verification" component={IdVerification as any} />
      <Stack.Screen name="login" component={Login as any} />
      <Stack.Screen name="forgot_password" component={ForgotPassword as any} />
      <Stack.Screen name="verify_otp" component={VerifyOtp as any} />
      <Stack.Screen name="reset_password" component={ResetPassword as any} />
    </Stack.Navigator>
  );
}
