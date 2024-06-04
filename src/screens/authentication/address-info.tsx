import { ScrollView, XStack, useTheme } from "tamagui";
import { AuthLayout } from "../../../components/auth-layout";
import { InputBox, InputTextarea } from "../../../components/input";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { KeyboardAvoidingView, Platform } from "react-native";
import { CloseButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";

type addressInfoScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "address_info"
>;
export const AddressInfo = ({ navigation }: addressInfoScreenProps) => {
  const theme = useTheme();
  return (
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View paddingTop={106} height={DEVICE_HEIGHT - 110}>
            <AuthLayout
              auth={false}
              title="complete onboarding"
              subtitle="Address Information"
              text="Please enter your pickup and delivery location."
            >
              <View>
                <InputTextarea
                  label="Home address"
                  placeholder="Home address"
                />
              </View>
              <View
                marginTop={50}
                backgroundColor={theme.secondary3}
                padding={24}
              >
                <Text
                  fontSize={13}
                  color={theme?.red?.val}
                  fontFamily="$body"
                  fontWeight="500"
                >
                  Who’s eligible to use Washe?
                </Text>
                <Text
                  color={theme?.secondary7?.val}
                  fontSize={14}
                  marginTop={5}
                >
                  Washe is only available to customers located in the Arkansas
                  area so home address provided above should be an Arkansan
                  address
                </Text>
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
              onPress={() => navigation.navigate("id_verification")}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
