import { XStack, YStack } from "tamagui";
import { View } from "../libs/view";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { Text } from "../libs/text";
import { DEVICE_WIDTH } from "../../src/constants";
import { Basket } from "../../utils/assets-png";

type Props = {
  show?: boolean;
  date?: string;
  name: string;
  time?: string;
  width?: string;
  status: "pending" | "processing";
  showImg?: boolean;
  top_img?: boolean;
};

export const Request = ({
  date,
  name,
  time,
  show = true,
  width = "100%",
  status = "pending",
  showImg = true,
  top_img = true,
}: Props) => {
  return (
    <YStack>
      <XStack paddingVertical={20}>
        {top_img && (
          <View style={styles.image}>
            <Image source={Basket} style={styles.img} />
          </View>
        )}
        <YStack>
          {show && (
            <Text
              fontSize={12}
              color={"$black3"}
              fontFamily={"$body"}
              fontWeight={"500"}
              marginLeft={10}
            >
              {date}
            </Text>
          )}

          <Text marginLeft={10} fontSize={12} paddingRight={20}>
            {name}
          </Text>
          <Text
            marginLeft={10}
            fontSize={12}
            color={"$black3"}
            fontFamily={"$body"}
            fontWeight={"500"}
          >
            {time}
          </Text>
        </YStack>
      </XStack>
      {status === "pending" ? (
        <YStack
          width={width}
          backgroundColor={"$white1"}
          paddingVertical={12}
          paddingHorizontal={15}
          marginTop={-5}
          marginLeft={"auto"}
          marginBottom={20}
        >
          {showImg && (
            <View style={styles.image}>
              <Image source={Basket} style={styles.img} />
            </View>
          )}
          <View
            backgroundColor="$secondary1"
            width="100%"
            height={6}
            marginTop={10}
          >
            <View backgroundColor="$accent2" width={"5%"} height={6} />
          </View>
          <Text fontSize={12} color="$black1" marginTop={9}>
            Your laundry request is currently pending
          </Text>
          <Text
            fontSize={12}
            color={"$black3"}
            fontFamily={"$body"}
            fontWeight={"500"}
          >
            {date}
          </Text>
        </YStack>
      ) : (
        <YStack
          width={width}
          backgroundColor={"$white1"}
          paddingVertical={12}
          paddingHorizontal={15}
          marginTop={-5}
          marginBottom={20}
          marginLeft={"auto"}
        >
          {showImg && (
            <View style={styles.image}>
              <Image source={Basket} style={styles.img} />
            </View>
          )}
          <View
            backgroundColor="$secondary1"
            width="100%"
            height={6}
            marginTop={10}
          >
            <View backgroundColor="$accent3" width={"50%"} height={6} />
          </View>
          <Text fontSize={12} color="$black1" marginTop={9}>
            Your laundry request is currently being processed
          </Text>
          <Text
            fontSize={12}
            color={"$black3"}
            fontFamily={"$body"}
            fontWeight={"500"}
          >
            {date}
          </Text>
        </YStack>
      )}
    </YStack>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: "#DCEAFE",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  text: {
    display: "flex",
  },
  text2: {
    display: "none",
    height: 0,
  },
});
