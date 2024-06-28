import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "./libs/view";
import { CardImg } from "../utils/assets-png";
import { XStack, YStack } from "tamagui";
import { Text } from "./libs/text";
import { Arrow, Washing } from "../utils/assets";
import React from "react";

type props = {
  onPress: () => void;
};
export const HomeCard: React.FC<props> = ({ onPress }) => {
  return (
    <>
      <View width="100%" style={styles.container}>
        <ImageBackground
          imageStyle={styles.cardImage}
          source={CardImg}
          style={styles.card}
        >
          <XStack
            paddingLeft={20}
            paddingTop={20}
            justifyContent="space-between"
          >
            <YStack>
              <Text
                color="$white1"
                fontFamily="$body"
                fontWeight="600"
                fontSize={16}
              >
                Get your laundry
              </Text>
              <Text
                color="$white1"
                fontFamily="$body"
                fontWeight="600"
                fontSize={16}
                marginTop={5}
              >
                done today
              </Text>
              <XStack alignItems="center" marginTop={18}>
                <TouchableOpacity onPress={onPress}>
                  <XStack alignItems='center'>
                    <Text
                      color="$white1"
                      fontSize={12}
                      fontFamily="$body"
                      fontWeight="500"
                    >
                      New laundry request
                    </Text>
                    <View marginLeft={3}>
                      <Arrow color="#F0F6FF" />
                    </View>
                  </XStack>
                </TouchableOpacity>
              </XStack>
            </YStack>
            <View zIndex={1000} position="absolute" right={0}>
              <Washing />
            </View>
          </XStack>
        </ImageBackground>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 144,
    width: "100%",
  },
  card: {
    width: "100%",
    height: "100%",
  },
  cardImage: {
    borderRadius: 20,
  },

  view: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
});
