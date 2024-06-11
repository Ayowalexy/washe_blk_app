import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { View } from "../libs/view";
import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { CardImg } from "../../utils/assets-png";

export const SaveForm = () => {
  const theme = useTheme();
  return (
    <>
      <View width="100%" paddingHorizontal={28} paddingBottom={150}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View width="100%" style={styles.container}>
            <ImageBackground
              imageStyle={styles.cardImage}
              source={CardImg}
              style={styles.card}
            >
              <View padding={22}>
                <YStack>
                  <Text
                    color={theme?.blue1?.val}
                    fontSize={12}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    Service
                  </Text>
                  <Text
                    color={theme?.white1?.val}
                    fontSize={14}
                    fontFamily="$body"
                    fontWeight="500"
                    marginTop={5}
                  >
                    Drycleaning
                  </Text>
                </YStack>
                <YStack marginTop={20}>
                  <Text
                    color={theme?.blue1?.val}
                    fontSize={12}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    Laundry Type
                  </Text>
                  <Text
                    color={theme?.white1?.val}
                    fontSize={14}
                    fontFamily="$body"
                    fontWeight="500"
                    marginTop={5}
                  >
                    Bedspreads, Pillows, Blankets
                  </Text>
                </YStack>
              </View>
            </ImageBackground>
          </View>
          <View
            width={"100%"}
            height="auto"
            padding={20}
            marginTop={27}
            borderWidth={1}
            borderRadius={12}
            borderColor={theme?.black4?.val}
          >
            <Text color={theme?.black1?.val} fontSize={15}>
              Pickup Information
            </Text>
            <YStack marginTop={20}>
              <Text color={theme?.black3?.val} fontSize={13}>
                Date/Time
              </Text>
              <Text color={theme?.black1?.val} fontSize={15}>
                25th Aug 23, 04:45 PM
              </Text>
              <View
                borderBottomWidth={1}
                borderBottomColor={theme?.black4?.val}
                paddingVertical={13}
              />
            </YStack>
            <YStack marginTop={20}>
              <Text color={theme?.black3?.val} fontSize={13}>
                Date/Time
              </Text>
              <Text color={theme?.black1?.val} fontSize={15}>
                25th Aug 23, 04:45 PM
              </Text>
            </YStack>
          </View>
          <View
            width={"100%"}
            height="auto"
            padding={20}
            marginTop={27}
            borderWidth={1}
            borderRadius={12}
            borderColor={theme?.black4?.val}
          >
            <Text color={theme?.black1?.val} fontSize={15}>
              Preferences
            </Text>
            <YStack marginTop={20}>
              <XStack justifyContent="space-between">
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Detergent Type
                  </Text>
                  <Text color={theme?.black1?.val} fontSize={15}>
                    Scented
                  </Text>
                </YStack>
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Water Temperature
                  </Text>
                  <Text color={theme?.black1?.val} fontSize={15}>
                    Hot
                  </Text>
                </YStack>
              </XStack>
              <View
                borderBottomWidth={1}
                borderBottomColor={theme?.black4?.val}
                paddingVertical={13}
              />
            </YStack>
            <YStack marginTop={20}>
              <XStack
                justifyContent="space-between"
                alignItems="flex-start"
                gap={"3%"}
              >
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Fabric Softener
                  </Text>
                  <Text color={theme?.black1?.val} fontSize={15}>
                    Yes{" "}
                  </Text>
                </YStack>
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Bleach
                  </Text>
                  <Text color={theme?.black1?.val} fontSize={15}>
                    No{" "}
                  </Text>
                </YStack>
              </XStack>
              <View
                borderBottomWidth={1}
                borderBottomColor={theme?.black4?.val}
                paddingVertical={13}
              />
              <XStack
                justifyContent="space-between"
                alignItems="flex-start"
                gap={"3%"}
                marginTop={20}
              >
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Dye
                  </Text>
                  <Text color={theme?.black1?.val} fontSize={15}>
                    Yes{" "}
                  </Text>
                </YStack>
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Dye Color
                  </Text>
                  <Text color={theme?.black1?.val} fontSize={15}>
                    Blue
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 149,
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
});
