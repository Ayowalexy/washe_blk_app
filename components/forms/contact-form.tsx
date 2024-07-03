import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { MessageIcon, PurpleIcon, WhatsappIcon } from "../../utils/assets";
import { View } from "../libs/view";
import { InputBox, InputTextarea } from "../input";
import { Button } from "../button";
import { ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { persistentUserAtom } from "../../src/atoms";
import { contactUsValidationSchema } from "../../schema/validation";
import Toast from "react-native-toast-message";
import { useContactUs } from "../../api/mutations";

export const ContactForm = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [user] = useAtom(persistentUserAtom);
  const { mutate, isPending } = useContactUs();
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
      message: "",
    },
    validationSchema: contactUsValidationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: async (response) => {
          Toast.show({
            type: "customSuccess",
            text1: "Message sent successfully",
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
  const isButtonDisabled = !values?.message;
  return (
    <ScrollView style={{ width: "84%" }}>
      <YStack
        width="100%"
        marginTop={30}
        marginHorizontal="auto"
        backgroundColor={theme.secondary3?.val}
        padding={18}
        alignItems="center"
      >
        <Text color={theme?.black3?.val} fontSize={12} textAlign="center">
          Contact washe via
        </Text>
        <XStack marginTop={12} gap={8}>
          <TouchableOpacity>
            <MessageIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <WhatsappIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <PurpleIcon />
          </TouchableOpacity>
        </XStack>
      </YStack>
      <XStack alignItems="center" marginTop={15} gap={10}>
        <View borderBottomColor="$accent4" borderBottomWidth={1} width="22%" />
        <Text color="$black3" fontSize={14}>
          or send message now
        </Text>
        <View borderBottomColor="$accent4" borderBottomWidth={1} width="22%" />
      </XStack>
      <YStack marginTop={20}>
        <InputBox
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          value={user?.email}
          editable={false}
          label="Email address"
          placeholder="Email address"
        />
        <InputTextarea
          onChangeText={handleChange("message")}
          onBlur={handleBlur("message")}
          hasError={!!errors.message && touched.message}
          error={errors.message}
          label="Message"
          placeholder="Type your message here..."
        />
      </YStack>
      <View paddingTop={35}>
        <Button
          loading={isPending}
          disabled={isButtonDisabled} 
          title="Send message"
          onPress={() => handleSubmit()}
        />
      </View>
    </ScrollView>
  );
};
