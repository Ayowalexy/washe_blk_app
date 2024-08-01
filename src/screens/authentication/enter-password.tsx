import { KeyboardAvoidingView, Platform } from "react-native";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT } from "../../constants";
import { XStack } from "tamagui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";
import { AuthLayout } from "../../../components/auth-layout";
import { InputBox } from "../../../components/input";
import { CloseButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { useFormik } from "formik";
import { enterPasswordValidationSchema } from "../../../schema/validation";
import { useAtom } from "jotai";
import { UserData } from "../../atoms";
import { useSignUp } from "../../../api/mutations";
import Toast from "react-native-toast-message";
import { saveToken } from "../../../resources/storage";

type EnterPasswordScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "enter_password"
>;
export const EnterPassword = ({ navigation }: EnterPasswordScreenProps) => {
  const { mutate, isPending } = useSignUp();
  const [userdata, setUserdata] = useAtom(UserData);
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
      password: "",
      password_confirmation: "",
    },
    validationSchema: enterPasswordValidationSchema,
    onSubmit: (values) => {
      const newUser = {
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        email: userdata.email,
        phoneNumber: userdata.phoneNumber,
        password: values.password,
      };
      setUserdata({
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        phoneNumber: userdata.phoneNumber,
        email: userdata.email,
      });
      console.log(newUser);

      mutate(newUser, {
        onSuccess: async (data) => {
          console.log(data, "data");
          Toast.show({
            type: "customSuccess",
            text1: "Account created successfully",
          });
          await saveToken("accessToken", data?.data?.token?.token);
          console.log(data?.data?.token?.token, 'token saved');
          navigation.navigate("user_details");
        },
        onError: (error: any) => {
          Toast.show({
            type: "customError",
            text1:
              error?.response?.data?.errors[0]?.message ||
              "An error occured, try again",
          });
          console.log(error.response?.data?.errors[0]?.message, "rrr");
        },
      });
    },
  });
  return (
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <View paddingTop={106} height={DEVICE_HEIGHT - 110}>
          <AuthLayout auth={false}>
            <View>
              <InputBox
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password}
                hasError={!!errors.password && touched.password}
                secureTextEntry={true}
                label="Password"
                placeholder="Enter your password"
              />
              <InputBox
                onChangeText={handleChange("password_confirmation")}
                onBlur={handleBlur("password_confirmation")}
                error={errors.password_confirmation}
                hasError={
                  !!errors.password_confirmation &&
                  touched.password_confirmation
                }
                secureTextEntry={true}
                label="Confirm password"
                placeholder="Re-enter your password"
              />
            </View>
          </AuthLayout>
        </View>
        <XStack
          gap={20}
          paddingVertical={20}
          height={100}
          width="88%"
          marginHorizontal="auto"
        >
          <CloseButton onPress={() => navigation.goBack()} />
          <View width="80%">
            <Button
              loading={isPending}
              title="Create account"
              onPress={() => handleSubmit()}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
