import { useFormik } from "formik";
import { addressValidationSchema } from "../../../schema/validation";
import { useTheme } from "tamagui";
import { AddressAtom } from "../../atoms";
import { useAtom } from "jotai";
import { DEVICE_HEIGHT } from "../../constants";
import { View } from "../../libs/View";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { AuthLayout } from "../../components/layouts/auth-layout";
import { InputBox, InputTextarea } from "../../components/input";
import { Text } from "../../libs/Text";
import { XStack } from "tamagui";
import { CloseButton } from "../../components/buttons/close-button";
import { Button } from "../../libs/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamList } from "../../navigation/onboarding.navigation";

type addressInfoScreenProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "address_info"
>;
export const AddressInfo = ({ navigation }: addressInfoScreenProps) => {
  const theme = useTheme();
  const [address, setAddress] = useAtom(AddressAtom);
  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        address: "",
        state: "",
        city: "",
        zipCode: "",
      },
      validationSchema: addressValidationSchema,
      onSubmit: (values) => {
        setAddress({
          address: values.address,
          city: values.city,
          zipCode: values.zipCode,
          state: values.state,
        });
        console.log(values, "vals");
        navigation.navigate("id_verification");
      },
    });
  return (
    <AuthLayout
      buttonTitle="Next"
      onPress={() => null}
      submit={() => handleSubmit()}
      auth={false}
      title="Complete Onboarding"
      subtitle="Enter your Address Details"
      text=""
    >
      <View marginTop={-20}>
        <InputBox
          onChangeText={handleChange("address")}
          onBlur={handleBlur("address")}
          label="Address"
          placeholder="4, James Street"
          hasError={!!errors.address && touched.address}
          error={errors.address}
        />
      </View>
      <View>
        <InputBox
          onChangeText={handleChange("city")}
          onBlur={handleBlur("city")}
          label="City"
          placeholder="4, James Street"
          hasError={!!errors.city && touched.city}
          error={errors.city}
        />
      </View>
      <View>
        <InputBox
          onChangeText={handleChange("state")}
          onBlur={handleBlur("state")}
          label="State/Province/Region"
          placeholder="4, James Street"
          hasError={!!errors.state && touched.state}
          error={errors.state}
        />
      </View>
      <View>
        <InputBox
          onChangeText={handleChange("zipCode")}
          onBlur={handleBlur("zipCode")}
          label="ZIP/Postal Code"
          placeholder="4, James Street"
          hasError={!!errors.zipCode && touched.zipCode}
          error={errors.zipCode}
        />
      </View>
    </AuthLayout>
  );
};
