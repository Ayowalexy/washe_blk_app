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
    <View>
      <AuthLayout
        buttonSub={false}
        handleSubmit={handleSubmit}
        buttonTitle="Send code"
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
            placeholder="Email address"
          />
        </View>
      </AuthLayout>
    </View>
  );
};
