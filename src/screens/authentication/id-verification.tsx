import { ScrollView, XStack, useTheme } from "tamagui";
import { AuthLayout } from "../../../components/auth-layout";
import { InputBox, InputTextarea } from "../../../components/input";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { CloseButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";
import { YStack } from "tamagui";
import { File } from "../../../utils/assets";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";

type idVerificationScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "id_verification"
>;
export const IdVerification = ({ navigation }: idVerificationScreenProps) => {
  const theme = useTheme();
  const [pickImage, setPickImage] = useState({});
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.assets) {
      console.log(result.assets[0]);
      setPickImage(result.assets[0]);
    }
  };
  console.log(pickImage, 'image')
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
              subtitle="ID Verification"
              text="Upload a picture or scan of a valid identity document"
            >
              <View>
                <Text fontSize={14} color={theme?.black1} marginBottom={8}>
                  ID upload
                </Text>
                <YStack
                  alignItems="center"
                  width="100%"
                  borderColor={theme?.black4?.val}
                  borderWidth={1}
                  height={154}
                  borderRadius={10}
                  paddingVertical={30}
                >
                  <File />
                  <TouchableOpacity onPress={() => pickDocument()}>
                    <Text
                      color={theme?.primary3?.val}
                      fontSize={13}
                      textDecorationStyle="solid"
                      textDecorationLine="underline"
                      textDecorationColor={theme?.primary3?.val}
                    >
                      Browse file
                    </Text>
                  </TouchableOpacity>
                  <Text
                    fontSize={13}
                    marginTop={7}
                    color={theme?.red?.val}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    Format accepted- png, jpg, pdf.
                  </Text>
                  <Text
                    fontSize={13}
                    marginTop={4}
                    color={theme?.black3?.val}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    {" "}
                    maximum file size 5 MB
                  </Text>
                </YStack>
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
            <Button title="Next" onPress={() => null} />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
