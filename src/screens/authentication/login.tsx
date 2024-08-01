import React from "react";
import { TouchableOpacity, Platform } from "react-native";
import { AuthLayout } from "../../../components/auth-layout";
import { InputBox } from "../../../components/input";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT } from "../../constants";
import { XStack, useTheme } from "tamagui";
import { CloseButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { Text } from "../../../components/libs/text";
import { Arrow } from "../../../utils/assets";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../../schema/validation";
import { useLogin, useGoogleAuth } from "../../../api/mutations";
import { saveToken } from "../../../resources/storage";
import { useGetCurrentUser } from "../../../api/queries";
import Toast from "react-native-toast-message";
import { persistentUserAtom } from "../../atoms";
import { useAtom } from "jotai";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";


type LoginScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "onboarding"
>;

export const Login = ({ navigation }: LoginScreenProps) => {
  const theme = useTheme();
  const { mutate, isPending } = useLogin();
  const { refetch } = useGetCurrentUser();
  const [user, setUser] = useAtom(persistentUserAtom);
  const {mutateAsync, isPending: loading} = useGoogleAuth()
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
          console.log(response?.data?.token, "response?.data?.token");
          const { data } = await refetch();
          setUser(data?.data);
          console.log(data.data, "data.data");
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
              error?.response?.data?.errors[0]?.message ||
              "An error occurred, try again",
          });
          console.log(error?.response?.data.message);
        },
      });
    },
  });

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log(userInfo, 'userInfo')
  //     if (userInfo?.idToken) {
  //       await mutateAsync({
    // idToken: userInfo?.idToken
  // });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View paddingTop={106}>
          <AuthLayout
            title="Log in to your account"
            text="Access your washe account"
            subtitle="Welcome back"
            // googleAuth={signIn}
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("onboarding", {
              screen: "forgot_password",
            })
          }
        >
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
        </TouchableOpacity>
        <XStack
          gap={20}
          height={90}
          justifyContent="center"
          marginBottom={20}
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
      </KeyboardAwareScrollView>
    </View>
  );
};
