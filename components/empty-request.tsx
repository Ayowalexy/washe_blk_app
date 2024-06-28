import { Image, StyleSheet } from "react-native";
import { View } from "./libs/view";
import { Basket } from "../utils/assets-png";
import { Text } from "./libs/text";
import { Button, useTheme } from "tamagui";
import { DEVICE_WIDTH } from "../src/constants";

type props = {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  onPress?: () => void;
};
export const EmptyRequest = ({
  color = "#051923",
  backgroundColor = "#FFF",
  borderColor = "#D3DBDF",
  onPress,
}: props) => {
  const theme = useTheme();
  return (
    <View
      width={DEVICE_WIDTH - 80}
      justifyContent="center"
      alignItems="center"
      paddingVertical={35}
      //   backgroundColor={'$red1'}
    >
      <View style={styles.image}>
        <Image source={Basket} style={styles.img} />
      </View>
      <Text
        fontSize={15}
        color="$red2"
        fontFamily="$body"
        fontWeight="600"
        marginTop={25}
      >
        It’s Quiet Over Here
      </Text>
      <Text
        color="$black3"
        fontSize={12}
        width="50%"
        textAlign="center"
        marginHorizontal="auto"
        marginTop={7}
      >
        Start by adding a laundry request
      </Text>
      <Button
        backgroundColor={backgroundColor}
        borderWidth={1}
        borderColor={borderColor}
        paddingHorizontal={16}
        borderRadius={100}
        color={color}
        fontWeight="600"
        marginTop={28}
        onPress={onPress}
      >
        New laundry request
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: "#DCEAFE",
    zIndex: 1000,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "150%",
    position: "absolute",
    top: 25,
    left: 0,
  },
});
