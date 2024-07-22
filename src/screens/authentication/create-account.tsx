import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { XStack, ScrollView } from "tamagui";
import { AuthLayout } from "../../../components/auth-layout";
import { InputBox } from "../../../components/input";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT } from "../../constants";
import { CloseButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";
import { useFormik } from "formik";
import { signUpValidationSchema } from "../../../schema/validation";
import { useAtom } from "jotai";
import { UserData } from "../../atoms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type CreateAccountScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "create_account"
>;

export const CreateAccount = ({
  navigation,
  route,
}: CreateAccountScreenProps) => {
  const isUpdate = route.params?.isUpdate;
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
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      setUserdata({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
      });
      navigation.navigate("enter_password");
      console.log(values, "values");
    },
  });

  return (
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View paddingTop={106}>
          <AuthLayout
            text={
              !isUpdate
                ? "By joining you agree to our Terms & and our Privacy Policy"
                : "Please make sure the name matches valid ID"
            }
            subtitle={
              !isUpdate
                ? "Help us get to know you"
                : "Verify information provided is correct"
            }
            title={!isUpdate ? "Create your account" : "Update your account"}
          >
            <View>
              <InputBox
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                label="First name"
                placeholder="First name"
                error={errors.firstName}
                hasError={!!errors.firstName && touched.firstName}
              />
              <InputBox
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                label="Last name"
                placeholder="Last name"
                error={errors.lastName}
                hasError={!!errors.lastName && touched.lastName}
              />
              <InputBox
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                label="Email address"
                placeholder="Email address"
                error={errors.email}
                hasError={!!errors.email && touched.email}
              />
              <InputBox
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                label="Phone number"
                keyboardType="phone-pad"
                placeholder="Phone number"
                error={errors.phoneNumber}
                hasError={!!errors.phoneNumber && touched.phoneNumber}
              />
            </View>
          </AuthLayout>
        </View>
        <XStack
          gap={20}
          height={90}
          marginVertical="auto"
          justifyContent="center"
          alignItems="center"
          width="88%"
          marginHorizontal="auto"
        >
          <CloseButton onPress={() => navigation.goBack()} />
          <View width="80%">
            <Button title="Next" onPress={() => handleSubmit()} />
          </View>
        </XStack>
      </KeyboardAwareScrollView>
    </View>
  );
};
