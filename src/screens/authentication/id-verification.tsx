import { ScrollView, XStack, useTheme } from "tamagui";
import { AuthLayout } from "../../../components/auth-layout";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT } from "../../constants";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { CloseButton } from "../../../components/close-button";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";
import { YStack } from "tamagui";
import { File, PdfFile } from "../../../utils/assets";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { SuccessModal } from "../../../components/modal";
import { AppStackScreenProps } from "../../../navigation/app.roots.types";
import { AddressAtom, persistentUserAtom } from "../../atoms";
import { useAtom } from "jotai";
import { useSubmitDocument } from "../../../api/mutations";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useGetCurrentUser } from "../../../api/queries";

type idVerificationScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "id_verification"
>;

export const IdVerification = ({
  navigation,
}: AppStackScreenProps<"onboarding">) => {
  const theme = useTheme();
  const [address] = useAtom(AddressAtom);
  const { mutate, isPending } = useSubmitDocument();
  const [fileSizeKB, setFileSizeKB] = useState(0);
  const [visible, setVisible] = useState(false);
  const { refetch } = useGetCurrentUser();
  const [user, setUser] = useAtom(persistentUserAtom);

  const { handleSubmit, values, setFieldValue, resetForm } = useFormik({
    initialValues: {
      fileName: "",
      fileUrl: "",
    },
    onSubmit: (values) => {
      const newUser = {
        address: address.address,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        fileName: values.fileName,
        fileUrl: "file",
      };
      console.log(newUser);

      mutate(newUser, {
        onSuccess: async (data) => {
          console.log(data, "datas");
          Toast.show({
            type: "customSuccess",
            text1: "Confirm the OTP we sent to you",
          });
          const { data: datas } = await refetch();
          console.log(datas?.data, "user saved");
          setUser(datas?.data);
          setVisible(true);
        },
        onError: (error: any) => {
          Toast.show({
            type: "customError",
            text1:
              error?.response?.data.message || "An error occurred, try again",
          });
          console.log(error?.response?.data, "rrr");
        },
      });
    },
  });

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.assets) {
      const asset = result.assets[0];
      console.log(asset);
      if (asset.size) {
        const fileSizeBytes = asset.size;
        const fileSizeInKB = fileSizeBytes / 1024;
        setFileSizeKB(fileSizeInKB);
      }
      setFieldValue("fileName", asset.name);
      setFieldValue("fileUrl", "file");
      setFieldValue("size", fileSizeKB.toString());
    }
  };

  console.log(values, "image");
  return (
    <View height={DEVICE_HEIGHT} backgroundColor="$white1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View paddingTop={106} height={DEVICE_HEIGHT - 110}>
            <AuthLayout
              auth={false}
              title="complete onboarding"
              subtitle="ID Verification"
              text="Upload a picture or scan of a valid identity document"
            >
              <View>
                <Text fontSize={14} color={"$black1"} marginBottom={8}>
                  ID upload
                </Text>
                <YStack
                  alignItems="center"
                  width="100%"
                  borderColor={"$black4"}
                  borderWidth={1}
                  height={154}
                  borderRadius={10}
                  paddingVertical={30}
                >
                  <TouchableOpacity
                    onPress={() => pickDocument()}
                    style={{ alignItems: "center" }}
                  >
                    <File />

                    <Text
                      color={theme?.primary3?.val}
                      fontSize={13}
                      textDecorationStyle="solid"
                      textDecorationLine="underline"
                      textDecorationColor={theme?.primary3?.val}
                    >
                      Browse file
                    </Text>
                  </TouchableOpacity>
                  <Text
                    fontSize={13}
                    marginTop={7}
                    color={theme?.red?.val}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    Format accepted- png, jpg, pdf.
                  </Text>
                  <Text
                    fontSize={13}
                    marginTop={4}
                    color={"$black3"}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    maximum file size 5 MB
                  </Text>
                </YStack>

                {values.fileName && (
                  <View marginTop={25}>
                    <XStack>
                      <PdfFile />
                      <YStack marginLeft={10}>
                        <Text
                          fontSize={14}
                          color={"$black1"}
                          fontFamily="$body"
                          fontWeight="500"
                        >
                          {values.fileName}
                        </Text>
                        <XStack alignItems="center" marginTop={5}>
                          <Text
                            color={"$black3"}
                            fontSize={12}
                            marginRight={7}
                          >
                            {Number(fileSizeKB).toFixed(2)} KB
                          </Text>
                          <Text color={"$black3"} fontSize={12}>
                            |
                          </Text>
                          <TouchableOpacity></TouchableOpacity>
                          <Text
                            color={theme?.red1}
                            fontSize={12}
                            marginLeft={7}
                          >
                            Delete
                          </Text>
                        </XStack>
                      </YStack>
                    </XStack>

                    <YStack
                      marginTop={50}
                      backgroundColor={theme.secondary3}
                      padding={24}
                    >
                      <Text
                        color={"$black1"}
                        fontSize={13}
                        fontFamily="$body"
                        fontWeight="500"
                      >
                        Accepted document type
                      </Text>
                      <View marginTop={8}>
                        {[
                          "Driver's License",
                          "Non-Driver Photo ID",
                          "U.S. Passport",
                          "Foreign Passport",
                          "U.S. Military ID Card",
                          "U.S. Military Dependent's",
                          " ID Card Tribal Card",
                        ].map((elem) => (
                          <View
                            key={elem}
                            flexDirection="row"
                            alignItems="center"
                            gap={8}
                            marginTop={3}
                          >
                            <View
                              width={4}
                              height={4}
                              backgroundColor={theme?.secondary7?.val}
                            />
                            <Text color={theme?.secondary7?.val} fontSize={15}>
                              {elem}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </YStack>
                  </View>
                )}
              </View>
            </AuthLayout>
          </View>
        </ScrollView>
        <XStack
          gap={20}
          height={90}
          marginVertical="auto"
          justifyContent="center"
          alignItems="center"
          width="88%"
          marginHorizontal="auto"
        >
          <CloseButton onPress={() => navigation.goBack()} />
          <View width="80%">
            <Button
              loading={isPending}
              disabled={values.fileName ? false : true}
              title="Complete Onboarding"
              onPress={() => handleSubmit()}
            />
          </View>
        </XStack>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={visible}
        setVisible={setVisible}
        onPress={() => {
          setVisible(false);
          navigation.navigate("tabs", {
            screen: "Home",
          });
        }}
        title="Onboarding Completed"
        text="Your information have been sent to Washe admin for verification. verification takes 2-5 business days.."
        text2="In the main time, explore your washe account"
      />
    </View>
  );
};
