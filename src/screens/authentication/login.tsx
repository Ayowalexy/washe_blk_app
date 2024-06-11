import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { AuthLayout } from "../../../components/auth-layout";
import { InputBox } from "../../../components/input";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT } from "../../constants";
import { XStack, useTheme } from "tamagui";
import { CloseButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { Text } from "../../../components/libs/text";
import { Arrow } from "../../../utils/assets";

type LoginScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "onboarding"
>;
export const Login = ({ navigation }: LoginScreenProps) => {
  const theme = useTheme();
  return (
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View paddingTop={106}>
            <AuthLayout>
              <View>
                <InputBox label="Email address" placeholder="First name" />
                <InputBox
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry={true}
                />
              </View>
            </AuthLayout>
          </View>
        </ScrollView>
        <XStack width="88%" gap={4} marginTop={-6} marginHorizontal="auto" alignItems="center">
          <Text fontSize={15} color={theme?.primary4?.val}>Forgot password</Text>
          <Arrow color={theme?.primary4?.val} />
        </XStack>
        <XStack
          gap={20}
          height={90}
          marginTop="30%"
          justifyContent="center"
          alignItems="center"
          width="88%"
          marginHorizontal="auto"
        >
          <CloseButton onPress={() => navigation.goBack()} />
          <View width="80%">
            <Button
              title="Login"
              onPress={() =>
                navigation.navigate("tabs", {
                  screen: "Home",
                })
              }
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
