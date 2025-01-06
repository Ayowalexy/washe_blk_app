import { Image, StyleSheet } from "react-native";
import { View } from "../../libs/View";
import { Basket, emptyBox } from "../../utils/assets-png";
import { Text } from "../../libs/Text";
import { Button, useTheme, YStack } from "tamagui";
import { DEVICE_WIDTH } from "../../constants";

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
      justifyContent="center"
      alignItems="center"
      paddingVertical={35}
      backgroundColor={"$lightGrey"}
      borderRadius={12}
      marginTop={30}
    >
      <View width={111.72} height={98}>
        <Image source={emptyBox} resizeMode="cover" style={styles.img} />
      </View>
      <Text
        fontSize={15}
        color="$red2"
        fontFamily="$body"
        fontWeight="600"
        marginTop={10}
      >
        It’s Quiet Over Here
      </Text>
      <Text
        color="$black3"
        fontSize={12}
        width="54%"
        textAlign="center"
        marginHorizontal="auto"
        marginTop={7}
        fontFamily='$body'
        lineHeight={18}
      >
        Laundry request(s) made will be displayed here
      </Text>
      {/* <Button
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
      </Button> */}
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
    height: "100%",
    position: "absolute",
  },
});
