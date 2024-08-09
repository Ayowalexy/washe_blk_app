import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { AuthLayout } from "../../../components/auth-layout";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT } from "../../constants";
import { XStack, useTheme } from "tamagui";
import { BackButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { useFormik } from "formik";
import { forgotPasswordValidationSchema } from "../../../schema/validation";
import {
  useForgotPassword,
  useVerifyOtpEndpoint,
} from "../../../api/mutations";
import { useGetCurrentUser } from "../../../api/queries";
import Toast from "react-native-toast-message";
import { persistentUserAtom } from "../../atoms";
import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import { useRoute } from "@react-navigation/native";
import { saveToken } from "../../../resources/storage";

type VerifyOtpScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "onboarding"
>;
export const VerifyOtp = ({ navigation }: VerifyOtpScreenProps) => {
  const theme = useTheme();
  const { mutate } = useVerifyOtpEndpoint();
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
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <ScrollView style={{ height: DEVICE_HEIGHT - 100 }}>
          <View paddingTop={106}>
            <AuthLayout
              title="Verify OTP"
              text="Access your washe account"
              subtitle="Enter password reset code"
              auth={false}
            >
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
            </AuthLayout>
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
              //   loading={isPending}
              title="Verify code"
              onPress={() => handleVerifyOtp()}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
