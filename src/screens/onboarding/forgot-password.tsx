import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { DEVICE_HEIGHT } from "../../constants";
import { XStack, useTheme } from "tamagui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import { AuthLayout } from "../../components/layouts/auth-layout";

import {
  forgotPasswordValidationSchema,
  loginValidationSchema,
} from "../../../schema/validation";
import { useGetCurrentUser } from "../../../api/queries";
import Toast from "react-native-toast-message";
import { persistentUserAtom } from "../../atoms";
import { useAtom } from "jotai";
import { AppRootStackParamList } from "../../navigation/app.root.types";
import { useForgotPassword } from "../../../api/mutation";
import { View } from "../../libs/View";
import { InputBox } from "../../components/input";
import { BackButton } from "../../components/buttons/close-button";
import { Button } from "../../libs/button";
import { Text } from "../../libs/Text";

type ForgotPasswordScreenProps = NativeStackScreenProps<
  AppRootStackParamList,
  "onboarding"
>;
export const ForgotPassword = ({ navigation }: ForgotPasswordScreenProps) => {
  const theme = useTheme();
  const { mutate, isPending } = useForgotPassword();
  const { refetch } = useGetCurrentUser();
  const [, setUser] = useAtom(persistentUserAtom);
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: async (response) => {
          Toast.show({
            type: "customSuccess",
            text1: "Reset OTP sent successfully",
          });
            navigation.navigate("onboarding", {
              screen: "verify_otp",
              params: {
                email: values.email,
              },
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
    },
  });
  console.log(values.email);
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
          <View paddingTop={86}>
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
              <InputBox
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                hasError={!!errors.email && touched.email}
                error={errors.email}
                label="Email address"
                placeholder="Email address"
              />
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
              //   loading={isPending}
              title="Send code"
              onPress={() => handleSubmit()}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
