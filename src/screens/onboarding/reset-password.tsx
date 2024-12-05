import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { DEVICE_HEIGHT } from "../../constants";
import { XStack, useTheme } from "tamagui";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import { enterPasswordValidationSchema } from "../../../schema/validation";
import Toast from "react-native-toast-message";
import { AppRootStackParamList } from "../../navigation/app.root.types";
import { useResetPassword } from "../../../api/mutation";
import { View } from "../../libs/View";
import { InputBox } from "../../components/input";
import { BackButton } from "../../components/buttons/close-button";
import { Button } from "../../libs/button";
import { Text } from "../../libs/Text";

type ResetPasswordScreenProps = NativeStackScreenProps<
  AppRootStackParamList,
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
    <View height={DEVICE_HEIGHT} backgroundColor="$white1" paddingHorizontal={25}>
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
                Reset password
              </Text>
              <Text
                fontSize={24}
                fontFamily="$body"
                fontWeight="600"
                color="$primary2"
                lineHeight={40}
                textAlign="center"
              >
               Enter your new password
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
                  !!errors.password_confirmation &&
                  touched.password_confirmation
                }
                error={errors.password_confirmation}
                label="Confirm password"
                placeholder="Re-enter your password"
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
              isLoading={isPending}
              title="Reset password"
              onPress={() => handleSubmit()}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>
    </View>
  );
};
