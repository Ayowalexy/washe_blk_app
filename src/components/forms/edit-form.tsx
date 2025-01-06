import { Input, XStack, useTheme } from "tamagui";
import { InputBox } from "../input";
import { useAtom } from "jotai";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { persistentUserAtom } from "../../atoms";
import { useGetCurrentUser } from "../../../api/queries";
import { View } from "../../libs/View";
import { Button } from "../../libs/button";
import { updateProfileValidationSchema } from "../../../schema/validation";
import { useUpdateProfile } from "../../../api/mutation";

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
            console.log(error?.response?.data?.message)
          },
        });
    },
  });
  return (
    <View width={"85%"} marginHorizontal={"auto"} marginTop={25}>
      <InputBox
        onChangeText={handleChange("firstName")}
        onBlur={handleBlur("firstName")}
        value={values.firstName}
        placeholder="Karen"
        editable={false}
        label="First name"
      />
      <InputBox
        onChangeText={handleChange("lastName")}
        onBlur={handleBlur("lastName")}
        value={values.lastName}
        placeholder="James"
        editable={false}
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
          style={{ height: 56 }}
          title="Save"
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
    </View>
  );
};
