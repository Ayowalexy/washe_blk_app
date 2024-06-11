import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { SuccessIcon } from "../../../utils/assets";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { CardImg, SuccessGif } from "../../../utils/assets-png";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";
import { SuccessLayout } from "../../../components/success-layout";

type userDetailsScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "user_details"
>;
export const UserDetails = ({ navigation }: userDetailsScreenProps) => {
  const theme = useTheme();
  return (
    <SuccessLayout
    buttonTitle="Complete Onboarding"
      nameTitle="Name"
      name="Karen James"
      secondText="karenjames@gmail.com"
      secondTitle="Email"
      thirdTitle="Phone Number"
      thirdText="+1 453-985-0082"
      successText="Welldone, Karen James!"
      title="You’re almost there"
      text=" Your washe account has been successfully created"
      onPress={() => navigation.navigate("address_info")}
    />
  );
};
