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

type userDetailsScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "user_details"
>;
export const UserDetails = ({navigation}: userDetailsScreenProps) => {
  const theme = useTheme();
  return (
    <View
      height={DEVICE_HEIGHT}
      width={DEVICE_WIDTH}
      backgroundColor="$primary3"
    >
      <Image source={SuccessGif} style={styles.success} />
      <YStack justifyContent="center" alignItems="center" paddingTop={150}>
        <SuccessIcon />
        <Text
          color={theme?.blue1}
          fontSize={16}
          fontFamily="$body"
          fontWeight="400"
          marginTop={15}
        >
          Welldone, Karen James!
        </Text>
        <Text
          color={theme?.white1}
          fontFamily="$body"
          fontWeight="600"
          fontSize={24}
          marginTop={10}
        >
          You’re almost there{" "}
        </Text>
        <Text
          textAlign="center"
          fontSize={14}
          paddingHorizontal={70}
          fontFamily="$body"
          fontWeight="400"
          color={theme?.white2}
          marginTop={7}
        >
          Your washe account has been successfully created
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
                <Text fontSize={13} color={theme?.blue1}>
                  Name
                </Text>
                <Text
                  fontSize={15}
                  color={theme?.white1}
                  fontFamily="$body"
                  fontWeight="400"
                >
                  Karen James
                </Text>
              </XStack>
              <View borderBottomColor={theme?.blue2} borderBottomWidth={1} />
            </YStack>
            <YStack paddingTop={20}>
              <XStack
                paddingBottom={20}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize={13} color={theme?.blue1}>
                  Email
                </Text>
                <Text
                  fontSize={15}
                  color={theme?.white1}
                  fontFamily="$body"
                  fontWeight="400"
                >
                  karenjames@gmail.com
                </Text>
              </XStack>
              <View borderBottomColor={theme?.blue2} borderBottomWidth={1} />
            </YStack>
            <YStack paddingTop={20}>
              <XStack
                paddingBottom={20}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize={13} color={theme?.blue1}>
                  Phone Number
                </Text>
                <Text
                  fontSize={15}
                  color={theme?.white1}
                  fontFamily="$body"
                  fontWeight="400"
                >
                  +1 453-985-0082
                </Text>
              </XStack>
              {/* <View borderBottomColor={theme?.blue2} borderBottomWidth={1} /> */}
            </YStack>
          </View>
        </ImageBackground>
      </View>
      <View width="80%" marginHorizontal="auto" marginTop="45%">
        <Button
          onPress={() => navigation.navigate('address_info')}
          color="$primary4"
          title="Complete Onboarding"
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
    zIndex: 200,
    width: "100%",
  },
});
