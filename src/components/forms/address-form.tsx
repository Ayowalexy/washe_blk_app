import React, { useState } from "react";
import { ScrollView, useTheme } from "tamagui";
import { InputBox, InputTextarea } from "../input";
import { View } from "../../libs/View";
import { Text } from "../../libs/Text";
import { Button } from "../../libs/button";
import { AddressAtom } from "../../atoms";
import { addressValidationSchema } from "../../../schema/validation";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { KeyboardAvoidingView } from "react-native";
import { useUpdateProfile } from "../../../api/mutation";
import { UpdateAccountDTO } from "../../../api/types";
import Toast from "react-native-toast-message";

export const AddressForm = () => {
  const theme = useTheme();

  const [address, setAddress] = useAtom(AddressAtom);
  const { mutateAsync, isPending: isLoading } = useUpdateProfile();

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        address: {
          lineOne: "",
          city: "",
          zipCode: "",
          state: "",
        },
      },
      validationSchema: addressValidationSchema,
      onSubmit: (values) => {
        const data = {
          address: {
            lineOne: values.address.lineOne,
            city: values.address.city,
            zipCode: values.address.zipCode,
            state: values.address.state,
          },
        };

        mutateAsync(data, {
          onSuccess: () => {
            Toast.show({
              type: "customSuccess",
              text1: "User updated successfully",
            });
          },
          onError: (error: any) => {
            Toast.show({
              type: "customError",
              text1: JSON.stringify(error) || "An error occured, try again",
            });
            console.log(error);
          },
        });

        console.log(values, "vals44");
      },
    });
  return (
    <ScrollView
      style={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View width="88%" marginTop={30} marginHorizontal={"auto"}>
        <View marginTop={-20}>
          <InputBox
            value={values.lineOne}
            onChangeText={handleChange("lineOne")}
            onBlur={handleBlur("lineOne")}
            label="Address"
            placeholder="4, James Street"
            hasError={!!errors.lineOne && touched.lineOne}
            error={errors.lineOne}
          />
        </View>
        <View>
          <InputBox
            value={values.city}
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
            value={values.state}
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
            value={values.zipCode}
            onChangeText={handleChange("zipCode")}
            onBlur={handleBlur("zipCode")}
            label="ZIP/Postal Code"
            placeholder="4, James Street"
            hasError={!!errors.zipCode && touched.zipCode}
            error={errors.zipCode}
          />
        </View>

        <View
          marginTop={6}
          marginHorizontal="auto"
          backgroundColor={theme.secondary3}
          padding={18}
          width="100%"
        >
          <Text
            fontFamily="$body"
            fontWeight={500}
            color={theme.red2?.val}
            fontSize={12}
          >
            Note
          </Text>
          <Text fontFamily="$body" color={theme.secondary7?.val} fontSize={14}>
            New addresses will be subject to another verification.
          </Text>
          <Text
            fontFamily="$body"
            color={theme.secondary7?.val}
            fontSize={14}
            marginTop={14}
          >
            Home address provided above should be an Arkansas address as Washe
            only operate within the Arkansas area.
          </Text>
        </View>
        <View paddingTop={30}>
          <Button
            title="Save"
            style={{ height: 56 }}
            onPress={() => handleSubmit()}
            disabled={!address}
          />
        </View>
      </View>
    </ScrollView>
  );
};
