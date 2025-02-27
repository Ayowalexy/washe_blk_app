import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "./libs/text";
import { View } from "./libs/view";
import { SuccessIcon, SuccessIcon2 } from "../utils/assets";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../src/constants";
import { Image, ImageBackground, Platform, StyleSheet } from "react-native";
import { CardImg, SuccessGif } from "../utils/assets-png";
import { Button } from "./button";
import { useNavigation } from "@react-navigation/native";

type props = {
  onPress: () => void;
  successText: string;
  title: string;
  text: string;
  nameTitle: string;
  name: string;
  secondTitle: string;
  secondText: string;
  thirdTitle: string;
  thirdText: string;
  buttonTitle: string;
};
export const SuccessLayout = ({
  onPress,
  title,
  text,
  successText,
  name,
  nameTitle,
  thirdText,
  thirdTitle,
  secondText,
  secondTitle,
  buttonTitle,
}: props) => {
  const navigation = useNavigation();
  return (
    <View
      height={Platform.OS === 'ios' ? DEVICE_HEIGHT : DEVICE_HEIGHT + 100}
      width={DEVICE_WIDTH}
      backgroundColor="$primary3"
    >
      <Image source={SuccessGif} style={styles.success} />
      <YStack justifyContent="center" alignItems="center" paddingTop={150}>
        <SuccessIcon />
        <Text
          color={"$blue1"}
          fontSize={16}
          fontFamily="$body"
          fontWeight="400"
          marginTop={15}
        >
          {successText}
        </Text>
        <Text
          color={"$white1"}
          fontFamily="$body"
          fontWeight="600"
          fontSize={24}
          marginTop={10}
        >
          {title}
        </Text>
        <Text
          textAlign="center"
          fontSize={14}
          paddingHorizontal={30}
          fontFamily="$body"
          fontWeight="400"
          color={"$white2"}
          marginTop={7}
        >
          {text}
        </Text>
      </YStack>
      <View style={styles.cardContainer}>
        <ImageBackground
          source={CardImg}
          style={styles.cardImg}
          imageStyle={styles.cardImage}
        >
          <View paddingHorizontal={35}>
            <YStack paddingTop={20}>
              <XStack
                paddingBottom={20}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize={13} color={"$blue1"}>
                  {nameTitle}
                </Text>
                <Text
                  fontSize={15}
                  color={"$white1"}
                  fontFamily="$body"
                  fontWeight="400"
                >
                  {name}
                </Text>
              </XStack>
              <View borderBottomColor={'$blue2'} borderBottomWidth={1} />
            </YStack>
            <YStack paddingTop={20}>
              <XStack
                paddingBottom={20}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize={13} color={"$blue1"}>
                  {secondTitle}
                </Text>
                <Text
                  fontSize={15}
                  color={"$white1"}
                  fontFamily="$body"
                  fontWeight="400"
                >
                  {secondText}
                </Text>
              </XStack>
              <View borderBottomColor={"$blue2"} borderBottomWidth={1} />
            </YStack>
            <YStack paddingTop={20}>
              <XStack
                paddingBottom={20}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize={13} color={"$blue1"}>
                  {thirdTitle}
                </Text>
                <Text
                  fontSize={15}
                  color={"$white1"}
                  fontFamily="$body"
                  fontWeight="400"
                >
                  {thirdText}
                </Text>
              </XStack>
              {/* <View borderBottomColor={"$blue2"} borderBottomWidth={1} /> */}
            </YStack>
          </View>
        </ImageBackground>
      </View>
      <View width="80%" marginHorizontal="auto" marginTop="45%">
        <Button
          onPress={onPress}
          color="$primary4"
          title={buttonTitle}
          textColor="$black1"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "88%",
    alignSelf: "center",
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 26,
  },
  cardImg: {
    width: "100%",
    height: "100%",
  },
  cardImage: {
    borderRadius: 20,
  },
  success: {
    position: "absolute",
    top: "5%",
    zIndex: 500,
    width: "100%",
  },
});
