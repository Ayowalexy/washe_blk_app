import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../../libs/View";
import { Bg } from "../../utils/assets-png";
import { XStack, YStack } from "tamagui";
import { Text } from "../../libs/Text";
import { Arrow, Washing } from "../../utils/assets";
import React from "react";

type props = {
  onPress: () => void;
};

export const HomeCard: React.FC<props> = ({ onPress }) => {
  return (
    <ImageBackground
      imageStyle={styles.cardImage}
      source={Bg}
      style={styles.card}
    >
      <XStack paddingLeft={20} paddingTop={60} justifyContent="space-between">
        <YStack>
          <Text
            color="$white1"
            fontFamily="$body"
            fontWeight="600"
            fontSize={16}
          >
            Enjoy your
          </Text>
          <Text
            color="$white1"
            fontFamily="$body"
            fontWeight="600"
            fontSize={16}
            marginTop={5}
          >
            deliveries today!
          </Text>
          <XStack alignItems="center" marginTop={18}>
            <TouchableOpacity onPress={onPress}>
              <XStack alignItems="center">
                <Text
                  color="$white1"
                  fontSize={12}
                  fontFamily="$body"
                  fontWeight="500"
                >
                  You have 2 requests
                </Text>
                <View marginLeft={3}>
                  <Arrow color="#F0F6FF" />
                </View>
              </XStack>
            </TouchableOpacity>
          </XStack>
        </YStack>

        {/* Absolute positioning for the 'Washing' component */}
        <View zIndex={1000} position="absolute" right={12} top={50}>
          <Washing />
        </View>
      </XStack>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 254, // Set the card height
    borderRadius: 20,
    overflow: "hidden", // Ensure child elements are clipped within the card
  },
  cardImage: {
    resizeMode: "cover", // Ensure the background image covers the entire area
  },
});
