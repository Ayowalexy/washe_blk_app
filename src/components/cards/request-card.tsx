import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "../../libs/View";
import { Text } from "../../libs/Text";
import { XStack, useTheme } from "tamagui";
import { Clock } from "../../../assets/images/svg/icons";
import { Anchor, Arrow } from "../../utils/assets";

type Status = "pending" | "ongoing" | "completed";
type RequestType = "pick_up" | "delivery" | "drop_off";

type Props = {
  text: string;
  date: string;
  status: Status;
  img: ImageSourcePropType;
  name: string;
  onPress: () => void;
  location: string;
  firstName?: string;
  requestType: RequestType;
};
export const RequestCard = ({
  text,
  date,
  status,
  onPress,
  img,
  name,
  location,
  firstName,
  requestType,
}: Props) => {
  const theme = useTheme();

  const statusMessages: Record<Status, Record<RequestType, string>> = {
    pending: {
      pick_up: `${firstName} is requesting a pickup`,
      delivery: `Make a delivery to ${firstName} in ${location}`,
      drop_off: "",
    },
    ongoing: {
      delivery: `You are delivering to ${firstName}`,
      drop_off: `You are dropping off ${firstName}'s laundry`,
      pick_up: `You are picking up ${firstName}'s laundry`,
    },
    completed: {
      delivery: `Your laundry delivery to ${firstName} is complete`,
      drop_off: `You have dropped off ${firstName}'s laundry at washe`,
      pick_up: "",
    },
  };

  const requestMessage = statusMessages[status]?.[requestType] || "";

  return (
    <View
      style={styles.card}
      width={"100%"}
      borderRadius={12}
      backgroundColor="$white1"
      padding={20}
      marginTop={18}
    >
      <XStack gap={8}>
        <View style={styles.image}>
          <Image source={img} style={styles.img} />
        </View>
        <Text
          fontSize={16}
          color="$black1"
          fontWeight={"$10"}
          fontFamily="$body"
        >
          {name}
        </Text>
      </XStack>
      <XStack alignItems="center" gap={8}>
        <XStack alignItems="center" marginTop={3} gap={2}>
          <Clock />
          <Text fontSize={12} color="$black3">
          {text.length > 8
              ? `${text.substring(0, 8)}...`
              : text}
          </Text>
        </XStack>
        <Text marginTop={3} color="$black3" fontSize={14}>
          |
        </Text>
        <XStack alignItems="center" marginTop={3} gap={2}>
          <Anchor />
          <Text fontSize={12} color="$black3">
            {location?.length > 12
              ? `${location.substring(0, 12)}...`
              : location}
          </Text>
        </XStack>
      </XStack>
      <View
        backgroundColor="$secondary1"
        width="100%"
        height={6}
        marginTop={10}
      >
        <View
          backgroundColor={status === "pending" ? "$accent2" : "$accent3"}
          width={status === "pending" ? "5%" : "85%"}
          height={6}
        />
      </View>

      {requestMessage && (
        <Text
          fontFamily="$body"
          fontWeight={500}
          marginTop={15}
          lineHeight={20}
          fontSize={12}
        >
          {requestMessage}
        </Text>
      )}

      <Text fontSize={12} color="$black3" marginTop={9}>
        {date}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <XStack alignItems="center" marginTop={20}>
          <Text fontSize={12} color={theme?.secondary5?.val} marginRight={3}>
            View
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
    borderRadius: 50,
  },
  card: {
    shadowColor: "rgba(103, 114, 229, 0.08)",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 3,
    elevation: 1,
  },
});
