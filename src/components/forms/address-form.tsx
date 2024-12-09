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

export const AddressForm = () => {
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
