import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { DEVICE_HEIGHT } from "../../constants";
import { XStack, useTheme } from "tamagui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useGetCurrentUser } from "../../../api/queries";
import Toast from "react-native-toast-message";
import { persistentUserAtom } from "../../atoms";
import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { saveToken } from "../../../resources/storage";
import { AppRootStackParamList } from "../../navigation/app.root.types";
import { useVerifyOtpEndpoint } from "../../../api/mutation";
import { View } from "../../libs/View";
import OTPTextInput from "react-native-otp-textinput";
import { BackButton } from "../../components/buttons/close-button";
import { Button } from "../../libs/button";
import { Text } from "../../libs/Text";

type VerifyOtpScreenProps = NativeStackScreenProps<
  AppRootStackParamList,
  "onboarding"
>;
export const VerifyOtp = ({ navigation }: VerifyOtpScreenProps) => {
  const theme = useTheme();
  const { mutate, isPending } = useVerifyOtpEndpoint();
  const { refetch } = useGetCurrentUser();
  const route = useRoute<any>();

  const otpInputRef = useRef(null);
  const [otp, setOtp] = useState("");
  console.log(route.params, "email");
  const handleVerifyOtp = async () => {
    const resp = {
      email: route.params.email,
      otp: otp,
    };
    mutate(resp, {
      onSuccess: async (response) => {
        Toast.show({
          type: "customSuccess",
          text1: "Reset OTP sent successfully",
        });

        await saveToken("accessToken", response.data.data.token);
        navigation.navigate("onboarding", {
          screen: "reset_password",
        });
      },
      onError: (error: any) => {
        Toast.show({
          type: "customError",
          text1:
            JSON.stringify(error?.response?.data?.message) ||
            "An error occured, try again",
        });
      },
    });
  };
  return (
    <View
      height={DEVICE_HEIGHT}
      backgroundColor="$white1"
      paddingHorizontal={25}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <ScrollView style={{ height: DEVICE_HEIGHT - 100 }}>
          <View paddingTop={106}>
            <View
              rowGap={5}
              marginTop={20}
              marginBottom={40}
              justifyContent="center"
              alignItems="center"
            >
              <Text
                fontSize={12}
                fontFamily="$body"
                fontWeight="600"
                color="$black1"
                textTransform="uppercase"
              >
                forgot password
              </Text>
              <Text
                fontSize={24}
                fontFamily="$body"
                fontWeight="600"
                color="$primary2"
                lineHeight={40}
                textAlign="center"
              >
                Enter your registered email address
              </Text>
              <Text
                fontFamily="$body"
                fontWeight={"400"}
                color="$black3"
                fontSize={14}
              >
                Access your washe account
              </Text>
            </View>
            <View>
              <View>
                <OTPTextInput
                  containerStyle={{
                    width: "98%",
                    margin: "auto",
                  }}
                  tintColor={"rgba(4, 104, 246,1)"}
                  textInputStyle={{
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    borderBottomWidth: 1,
                  }}
                  ref={otpInputRef}
                  handleTextChange={(text: any) => setOtp(text)}
                  inputCount={6}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <XStack
          gap={20}
          height={90}
          marginBottom={20}
          justifyContent="center"
          alignItems="center"
          width="88%"
          marginHorizontal="auto"
        >
          <BackButton onPress={() => navigation.goBack()} />
          <View width="80%">
            <Button
            style={{height: 56}}
              isLoading={isPending}
              title="Verify code"
              onPress={() => handleVerifyOtp()}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
