import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { AuthLayout } from "../../../components/auth-layout";
import { InputBox } from "../../../components/input";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT } from "../../constants";
import { XStack, useTheme } from "tamagui";
import { CloseButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { Text } from "../../../components/libs/text";
import { Arrow } from "../../../utils/assets";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../../schema/validation";
import { useLogin } from "../../../api/mutations";
import { saveToken } from "../../../resources/storage";
import { useGetCurrentUser } from "../../../api/queries";
import Toast from "react-native-toast-message";
import { persistentUserAtom } from "../../atoms";
import { useAtom } from "jotai";

type LoginScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "onboarding"
>;
export const Login = ({ navigation }: LoginScreenProps) => {
  const theme = useTheme();
  const { mutate, isPending } = useLogin();
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
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: async (response) => {
          await saveToken("accessToken", response?.data?.token);
          const { data } = await refetch();
          console.log(data.data, 'data.data');
          setUser(data?.data);
          Toast.show({
            type: "customSuccess",
            text1: "Logged in successfully",
          });
          navigation.navigate("tabs", {
            screen: "Home",
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
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View paddingTop={106}>
            <AuthLayout>
              <View>
                <InputBox
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  hasError={!!errors.email && touched.email}
                  error={errors.email}
                  label="Email address"
                  placeholder="First name"
                />
                <InputBox
                 onChangeText={handleChange("password")}
                 onBlur={handleBlur("password")}
                 hasError={!!errors.password && touched.password}
                 error={errors.password}
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry={true}
                />
              </View>
            </AuthLayout>
          </View>
        </ScrollView>
        <XStack
          width="88%"
          gap={4}
          marginTop={-6}
          marginHorizontal="auto"
          alignItems="center"
        >
          <Text fontSize={15} color={theme?.primary4?.val}>
            Forgot password
          </Text>
          <Arrow color={theme?.primary4?.val} />
        </XStack>
        <XStack
          gap={20}
          height={90}
          marginTop="30%"
          justifyContent="center"
          alignItems="center"
          width="88%"
          marginHorizontal="auto"
        >
          <CloseButton onPress={() => navigation.goBack()} />
          <View width="80%">
            <Button
              loading={isPending}
              title="Login"
              onPress={() => handleSubmit()}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
