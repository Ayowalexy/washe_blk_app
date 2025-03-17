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
import { enterPasswordValidationSchema } from "../../../schema/validation";
import { useResetPassword } from "../../../api/mutations";
import Toast from "react-native-toast-message";

type ResetPasswordScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "onboarding"
>;
export const ResetPassword = ({ navigation }: ResetPasswordScreenProps) => {
  const theme = useTheme();
  const { mutate, isPending } = useResetPassword();
  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        password: "",
        password_confirmation: "",
      },
      validationSchema: enterPasswordValidationSchema,
      onSubmit: (values) => {
        const newPassword = {
          password: values.password,
        };
        mutate(newPassword, {
          onSuccess: async (response) => {
            Toast.show({
              type: "customSuccess",
              text1: "password updated successfully",
            });
            navigation.navigate("onboarding", {
              screen: "login",
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
  return (
    <View>
      <AuthLayout
        isLoading={isPending}
        handleSubmit={handleSubmit}
        buttonSub={false}
        buttonTitle="Reset password"
        title="reset password"
        text="Access your washe account"
        subtitle="Enter your new password"
        auth={false}
      >
        <View>
          <InputBox
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            hasError={!!errors.password && touched.password}
            error={errors.password}
            secureTextEntry={true}
            label="Password"
            placeholder="Enter your password"
          />
          <InputBox
            onChangeText={handleChange("password_confirmation")}
            onBlur={handleBlur("password_confirmation")}
            secureTextEntry={true}
            hasError={
              !!errors.password_confirmation && touched.password_confirmation
            }
            error={errors.password_confirmation}
            label="Confirm password"
            placeholder="Re-enter your password"
          />
        </View>
      </AuthLayout>
    </View>
  );
};
