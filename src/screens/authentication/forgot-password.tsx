import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { AuthLayout } from "../../../components/auth-layout";
import { InputBox } from "../../../components/input";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT } from "../../constants";
import { XStack, useTheme } from "tamagui";
import { BackButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { useFormik } from "formik";
import {
  forgotPasswordValidationSchema,
  loginValidationSchema,
} from "../../../schema/validation";
import { useForgotPassword, useLogin } from "../../../api/mutations";
import { saveToken } from "../../../resources/storage";
import { useGetCurrentUser } from "../../../api/queries";
import Toast from "react-native-toast-message";
import { persistentUserAtom } from "../../atoms";
import { useAtom } from "jotai";

type ForgotPasswordScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
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
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <ScrollView style={{ height: DEVICE_HEIGHT - 100 }}>
          <View paddingTop={106}>
            <AuthLayout
              title="forgot password"
              text="Access your washe account"
              subtitle="Enter your registered email address"
              auth={false}
            >
              <View>
                <InputBox
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  hasError={!!errors.email && touched.email}
                  error={errors.email}
                  label="Email address"
                  placeholder="First name"
                />
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
              loading={isPending}
              title="Send code"
              onPress={() => handleSubmit()}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
