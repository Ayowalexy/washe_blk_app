import { XStack, YStack } from "tamagui";
import { View } from "../libs/view";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { Text } from "../libs/text";

type props = {
  img: ImageSourcePropType;
  show?: boolean;
  date?: string;
  name: string;
  time?: string;
};
export const Request = ({ img, date, name, time, show = true }: props) => {
  return (
    <XStack paddingVertical={20}>
      <View style={styles.image}>
        <Image source={img} style={styles.img} />
      </View>
      <YStack marginLeft={10}>
        {show && (
          <Text
            fontSize={12}
            color={"$black3"}
            fontFamily={"$body"}
            fontWeight={"500"}
          >
            {date}
          </Text>
        )}
        <Text fontSize={12} paddingRight={20} style={styles.text}>
          {name}
        </Text>
        <Text
          fontSize={12}
          color={"$black3"}
          fontFamily={"$body"}
          fontWeight={"500"}
        >
          {time}
        </Text>
      </YStack>
    </XStack>
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
  text: {},
});
