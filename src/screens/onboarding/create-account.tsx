import { AuthLayout } from "../../components/layouts/auth-layout";
import { InputBox } from "../../components/input";
import { useFormik } from "formik";
import { signUpValidationSchema } from "../../../schema/validation";
import { useAtom } from "jotai";
import { UserData } from "../../atoms";
import { AuthenticationStackParamList } from "../../navigation/onboarding.navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "../../libs/View";
import { useEffect, useState } from "react";

type CreateAccountScreenProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "create_account"
>;

export const CreateAccount = ({
  navigation,
  route,
}: CreateAccountScreenProps) => {
  const [userData, setUserdata] = useAtom(UserData);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      console.log(values, "values");
      navigation.navigate("enter_password");
    },
  });

  return (
    <View>
      <AuthLayout
        onPress={() => navigation.goBack()}
        submit={() => handleSubmit()}
        buttonTitle="Next"
        // googleAuth={signIn}
        show
        subtitle={"Verify information provided is correct"}
        title={"Create your account"}
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
  );
};
