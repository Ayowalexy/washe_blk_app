import { useTheme, XStack, YStack } from "tamagui";
import { AppStackScreenProps } from "../../navigation/app.root.types";
import { useAtom } from "jotai";
import { AddressAtom, persistentUserAtom } from "../../atoms";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { View } from "../../libs/View";
import { Text } from "../../libs/Text";
import { AuthLayout } from "../../components/layouts/auth-layout";
import { TouchableOpacity } from "react-native";
import { File, PdfFile } from "../../utils/assets";
import { SuccessModal } from "../../components/layouts/success-layout";
import * as DocumentPicker from "expo-document-picker";
import { useGetCurrentUser } from "../../../api/queries";
import { useSubmitDocument } from "../../../api/mutation";
import Toast from "react-native-toast-message";
import { SubmitId } from "../../components/id-verification.component";

export const IdVerification = ({
  navigation,
}: AppStackScreenProps<"onboarding">) => {
  const theme = useTheme();
  const { mutate, isPending } = useSubmitDocument();
  const [fileSizeKB, setFileSizeKB] = useState(0);
  const [visible, setVisible] = useState(false);
  const { refetch } = useGetCurrentUser();
  const [user, setUser] = useAtom(persistentUserAtom);
  const [address] = useAtom(AddressAtom);

  const { handleSubmit, values, setFieldValue } = useFormik({
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

      mutate(newUser, {
        onSuccess: async (data) => {
          console.log(data, "datas");
          Toast.show({
            type: "customSuccess",
            text1: "Verification successfully",
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

  useEffect(() => {
    if (user) {
      console.log(user, "Updated user after refetch");
    }
  }, [user]);

  return (
    <View>
      <AuthLayout
        onPress={() => navigation.goBack()}
        submit={() => handleSubmit()}
        buttonTitle="Complete Onboarding"
        auth={false}
        isLoading={isPending}
        title="complete onboarding"
        subtitle="ID Verification"
        text="Upload a picture or scan of a valid identity document"
      >
        <SubmitId onPress={() => pickDocument()} fileSizeKB={fileSizeKB} values={values} />
      </AuthLayout>

      <SuccessModal
        info
        height="55%"
        visible={visible}
        setVisible={setVisible}
        onPress={() => {
          setVisible(false);
          navigation.navigate("tab", {
            screen: "Home",
          });
        }}
        buttonTitle="Done"
        title="Onboarding Completed"
        text="Your information have been sent to Washe admin for verification. In the main time, explore your washe account"
      />
    </View>
  );
};
