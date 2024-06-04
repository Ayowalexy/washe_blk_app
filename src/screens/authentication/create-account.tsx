import { ScrollView, XStack } from "tamagui";
import { AuthLayout } from "../../../components/auth-layout";
import { InputBox } from "../../../components/input";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { KeyboardAvoidingView, Platform } from "react-native";
import { CloseButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";

type createAccountScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "create_account"
>;
export const CreateAccount = ({ navigation }: createAccountScreenProps) => {
  return (
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View paddingTop={106}>
            <AuthLayout>
              <View>
                <InputBox label="First name" placeholder="First name" />
                <InputBox label="Last name" placeholder="Last name" />
                <InputBox label="Email address" placeholder="Email address" />
                <InputBox
                  label="Phone number"
                  keyboardType="phone-pad"
                  placeholder="Phone number"
                />
              </View>
            </AuthLayout>
          </View>
        </ScrollView>
        <XStack
          gap={20}
          height={90}
          marginVertical="auto"
          justifyContent="center"
          alignItems="center"
          width="88%"
          marginHorizontal="auto"
        >
          <CloseButton onPress={() => navigation.goBack()} />
          <View width="80%">
            <Button
              title="Next"
              onPress={() => navigation.navigate("enter_password")}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
