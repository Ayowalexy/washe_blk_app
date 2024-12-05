import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../libs/button";
import { View } from "../libs/View";
import { InputBox } from "./input";
import { useFormik } from "formik";
import { changePasswordValidationSchema } from "../../schema/validation";
import { useChangePassword } from "../../api/mutation";
import Toast from "react-native-toast-message";

export const ChangePassword = () => {
  const { mutate, isPending } = useChangePassword();
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
      oldPassword: "",
      newPassword: "",
      password_confirmation: "",
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: (values) => {
      const newUserPassword = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      mutate(newUserPassword, {
        onSuccess: async (data) => {
          Toast.show({
            type: "customSuccess",
            text1: "Password changed successfully",
          });
        },
        onError: (error: any) => {
          Toast.show({
            type: "customError",
            text1: error?.message || "An error occured, try again",
          });
          console.log(error.response?.data?.errors);
        },
      });
    },
  });
  return (
    <KeyboardAwareScrollView style={{ width: "83%" }}>
      <View marginTop={30}>
        <InputBox
          onChangeText={handleChange("oldPassword")}
          onBlur={handleBlur("oldPassword")}
          error={errors.oldPassword}
          hasError={!!errors.oldPassword && touched.oldPassword}
          secureTextEntry={true}
          label="Current Password"
          placeholder="Enter your password"
        />
        <InputBox
          onChangeText={handleChange("newPassword")}
          onBlur={handleBlur("newPassword")}
          error={errors.newPassword}
          hasError={!!errors.newPassword && touched.newPassword}
          secureTextEntry={true}
          label="New Password"
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
          label="Confirm New Password"
          placeholder="Re-enter your password"
        />
        <Button
          title="Save"
          style={{ height: 56, marginTop: 120 }}
          onPress={() => handleSubmit()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
