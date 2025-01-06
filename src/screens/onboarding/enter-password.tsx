import { useAtom } from "jotai";
import { UserData } from "../../atoms";
import { useFormik } from "formik";
import { AuthenticationStackParamList } from "../../navigation/onboarding.navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { enterPasswordValidationSchema } from "../../../schema/validation";
import { View } from "tamagui";
import { AuthLayout } from "../../components/layouts/auth-layout";
import { InputBox } from "../../components/input";
import { SuccessModal } from "../../components/layouts/success-layout";
import { useState } from "react";
import { ArrowRight } from "../../../assets/images/svg/icons";
import { useSignUp } from "../../../api/mutation";
import { saveToken } from "../../../resources/storage";
import Toast from "react-native-toast-message";

type EnterPasswordScreenProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "enter_password"
>;
export const EnterPassword = ({ navigation }: EnterPasswordScreenProps) => {
  const { mutate, isPending } = useSignUp();
  const [userdata, setUserdata] = useAtom(UserData);
  const [visible, setVisible] = useState(false);
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
        type: userdata.type,
        latitude: userdata.latitude,
        longitude: userdata.longitude,
      };
      setUserdata({
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        phoneNumber: userdata.phoneNumber,
        email: userdata.email,
        type: userdata.type,
        latitude: userdata.latitude,
        longitude: userdata.longitude,
      });
      console.log(newUser, "new");

      mutate(newUser, {
        onSuccess: async (data) => {
          Toast.show({
            type: "customSuccess",
            text1: "Account created successfully",
          });
          await saveToken("accessToken", data?.data?.token?.token);
          console.log(data?.data?.token?.token, "token saved");
          // navigation.navigate("user_details");
          setVisible(true);
        },
        onError: (error: any) => {
          Toast.show({
            type: "customError",
            text1: error?.message || "An error occured, try again",
          });
          console.log(error.response?.data?.errors[0]?.message, "rrr");
        },
      });
    },
  });
  return (
    <AuthLayout
      show
      buttonTitle="Create Account"
      onPress={() => navigation.goBack()}
      isLoading={isPending}
      submit={() => {
        handleSubmit();
      }}
      auth={false}
    >
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
            !!errors.password_confirmation && touched.password_confirmation
          }
          secureTextEntry={true}
          label="Confirm password"
          placeholder="Re-enter your password"
        />
      </View>
      <SuccessModal
        onReject={() => null}
        buttonTitle="Complete Onboarding"
        icon={<ArrowRight />}
        visible={visible}
        setVisible={setVisible}
        title="You’re Almost There"
        text=" Your washe driver account has been successfully created"
        onPress={() => {
          setVisible(false);
          navigation.navigate("address_info");
        }}
      />
    </AuthLayout>
  );
};
