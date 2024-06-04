import { KeyboardAvoidingView, Platform } from "react-native";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT } from "../../constants";
import { XStack } from "tamagui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";
import { AuthLayout } from "../../../components/auth-layout";
import { InputBox } from "../../../components/input";
import { CloseButton } from "../../../components/close-button";
import { Button } from "../../../components/button";

type EnterPasswordScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "enter_password"
>;
export const EnterPassword = ({ navigation }: EnterPasswordScreenProps) => {
  return (
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <View paddingTop={106} height={DEVICE_HEIGHT - 110}>
          <AuthLayout auth={false}>
            <View>
              <InputBox
                secureTextEntry={true}
                label="Password"
                placeholder="Enter your password"
              />
              <InputBox
                secureTextEntry={true}
                label="Confirm password"
                placeholder="Re-enter your password"
              />
            </View>
          </AuthLayout>
        </View>
        <XStack
          gap={20}
          paddingVertical={20}
          height={100}
          width="88%"
          marginHorizontal="auto"
        >
          <CloseButton onPress={() => navigation.goBack()} />
          <View width="80%">
            <Button
              title="Create account"
              onPress={() => navigation.navigate('user_details')}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
