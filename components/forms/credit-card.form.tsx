import { ScrollView, StyleSheet } from "react-native";
import { View } from "../libs/view";
import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { InputBox } from "../input";
import { Button } from "../button";
import { SuccessModal } from "../modal";
import { Dispatch, SetStateAction, useState } from "react";
import { useFormik } from "formik";
import { createPaymentMethodValidationSchema } from "../../schema/validation";
import { useCreateCard, useAddCard } from "../../api/mutations";

type props = {
  //   setShow: Dispatch<SetStateAction<boolean>>;
  //   setOpenCreditCard: Dispatch<SetStateAction<boolean>>;
  onPress: () => void;
};
export const CreditCard = ({ onPress }: props) => {
  const theme = useTheme();
  const { mutateAsync, isPending } = useCreateCard();
  const { mutateAsync: addCard, isPending: loading } = useAddCard();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      number: "",
      exp: "",
      cvc: "",
    },
    validationSchema: createPaymentMethodValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await mutateAsync({
          number: values.number,
          exp_month: Number(values.exp.split("/")[0]),
          exp_year: Number(
            new Date()
              .getFullYear()
              .toString()
              .slice(0, 2)
              .concat(values.exp.split("/")[1])
          ),
          cvv: values.cvc,
        });
        await addCard({
          paymentMethodId: response.data?.id,
          isDefault: true,
        });
        onPress();
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <>
      <View width={"100%"} paddingHorizontal={28}>
        <YStack height={"auto"}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollview}
          >
            <View height="80%" width="100%" style={styles.container}>
              <InputBox
                label="Card number"
                keyboardType="number-pad"
                placeholder="0000 0000 0000 0000"
                onChangeText={handleChange("number")}
                onBlur={handleBlur("number")}
                hasError={!!errors.number && touched.number}
                error={errors.number}
              />
              <InputBox
                label="Expiry date"
                keyboardType="number-pad"
                placeholder="MM/YY"
                onChangeText={(text) => {
                  setFieldValue("exp", text);
                }}
                value={values.exp.toString()}
                onBlur={handleBlur("exp")}
                onKeyPress={(event) => {
                  if (
                    event.nativeEvent.key === "Backspace" &&
                    values.exp.toString().length === 3
                  ) {
                    setFieldValue("exp", values.exp.toString().slice(0, 2));
                  } else if (values.exp.toString().length === 2) {
                    setFieldValue("exp", values.exp.toString().concat("/"));
                  }
                }}
                hasError={!!errors.exp && touched.exp}
                error={errors.exp}
              />
              <InputBox
                label="CVV"
                keyboardType="number-pad"
                placeholder="123"
                onChangeText={handleChange("cvc")}
                onBlur={handleBlur("cvc")}
                hasError={!!errors.cvc && touched.cvc}
                error={errors.cvc}
              />
            </View>
          </ScrollView>
          <View paddingTop={30}>
            <Button
              loading={isPending || loading}
              title="Add card"
              onPress={() => handleSubmit()}
            />
          </View>
        </YStack>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  card: {
    width: "100%",
    height: "100%",
  },
  cardImage: {
    borderRadius: 20,
  },
  atm: {
    shadowColor: "rgba(103, 114, 229, 0.08)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 1,
  },
  active: {
    width: 16,
    height: 16,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#00D158",
  },
  inactive: {
    width: 16,
    height: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#DFE2E2",
  },
  scrollview: {
    height: "79%",
  },
});
