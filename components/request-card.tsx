import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "./libs/view";
import { Basket } from "../utils/assets-png";
import { Text } from "./libs/text";
import { XStack, useTheme } from "tamagui";
import { Arrow } from "../utils/assets";

type props = {
  text: string;
  date: string;
  status: string;
  onPress: () => void;
};
export const RequestCard = ({ text, date, status, onPress }: props) => {
  const theme = useTheme();
  return (
    <View
      style={styles.card}
      width={"100%"}
      borderRadius={12}
      backgroundColor="$white1"
      padding={20}
      marginTop={18}
    >
      <View style={styles.image}>
        <Image source={Basket} style={styles.img} />
      </View>
      <View
        backgroundColor="$secondary1"
        width="100%"
        height={6}
        marginTop={10}
      >
        {status === "pending" ? (
          <View backgroundColor="$accent2" width={"5%"} height={6} />
        ) : (
          <View backgroundColor="$accent3" width={"85%"} height={6} />
        )}
      </View>
      <Text fontSize={12} color="$black1" marginTop={9}>
        {text}
      </Text>
      <Text fontSize={12} color="$black3" marginTop={9}>
        {date}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <XStack alignItems="center" marginTop={20}>
          <Text fontSize={12} color={theme?.secondary5?.val} marginRight={3}>
            Make payment
          </Text>
          <Arrow color="#006B2D" />
        </XStack>
      </TouchableOpacity>
    </View>
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
  card: {
    shadowColor: "rgba(103, 114, 229, 0.08)",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 1,
  },
});
