import { Input, XStack, useTheme } from "tamagui";
import CountryCodePicker from "../country-code";
import { InputBox } from "../input";
import { View } from "../libs/view";
import { Button } from "../button";
import { useAtom } from "jotai";
import { UserData, persistentUserAtom } from "../../src/atoms";
import { useFormik } from "formik";
import { updateProfileValidationSchema } from "../../schema/validation";
import { useUpdateProfile } from "../../api/mutations";
import { useGetCurrentUser } from "../../api/queries";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const EditForm = () => {
  const theme = useTheme();
  const [user, setUser] = useAtom(persistentUserAtom);
  const { mutate, isPending } = useUpdateProfile();
  const { refetch } = useGetCurrentUser();
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
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
    },
    validationSchema: updateProfileValidationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: async (response) => {
          const { data } = await refetch();
          console.log(data.data, "data.data");
          setUser(data?.data);
          Toast.show({
            type: "customSuccess",
            text1: "User updated successfully",
          });
        },
        onError: (error: any) => {
          Toast.show({
            type: "customError",
            text1:
              JSON.stringify(error?.response?.data?.message) ||
              "An error occured, try again",
          });
          console.log(error?.response?.data?.message);
        },
      });
    },
  });
  console.log(user);
  return (
    <View width={"85%"} marginHorizontal={"auto"} marginTop={25}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <InputBox
          onChangeText={handleChange("firstName")}
          onBlur={handleBlur("firstName")}
          value={values.firstName}
          placeholder="Karen"
          label="First name"
        />
        <InputBox
          onChangeText={handleChange("lastName")}
          onBlur={handleBlur("lastName")}
          value={values.lastName}
          placeholder="James"
          label="Last name"
        />
        <InputBox
          value={values.email}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          editable={false}
          placeholder="karenjames@gmail.com"
          label="Email address"
        />
        <InputBox
          value={values.phoneNumber}
          onChangeText={handleChange("phoneNumber")}
          onBlur={handleBlur("phoneNumber")}
          placeholder="+1"
          label="Phone number"
        />
        <View paddingTop={55}>
          <Button
            title="Save"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
