import { XStack, YStack } from "tamagui";
import { View } from "../libs/view";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { Text } from "../libs/text";
import { DEVICE_WIDTH } from "../../src/constants";
import { Basket } from "../../utils/assets-png";

type Props = {
  date?: string;
  name: string;
  time?: string;
  width?: string;
  top_img?: boolean;
};

export const OneSavedRequest = ({
  date,
  name,
  time,
  width = "100%",
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
          <Text
            fontSize={12}
            color={"$black3"}
            fontFamily={"$body"}
            fontWeight={"500"}
            marginLeft={10}
          >
            {date}
          </Text>

          <Text marginLeft={10} fontSize={12} paddingRight={20}>
            {name}
          </Text>
        </YStack>
      </XStack>
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
