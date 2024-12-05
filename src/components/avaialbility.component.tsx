import { useTheme, XStack, YStack } from "tamagui";
import { View } from "../libs/View";
import { BroadcastIcon, LocationOutlined } from "../../assets/images/svg/icons";
import { Text } from "../libs/Text";
import ToggleSwitch from "toggle-switch-react-native";
import { useToggleAvailability } from "../../api/queries";
import { availabilityState } from "../atoms";
import { useAtom } from "jotai";

export const AvailabilityCard = () => {
  const theme = useTheme();
  const { refetch, data, isLoading } = useToggleAvailability();

  const [isAvailable, setIsAvailable] = useAtom(availabilityState);
  const handleToggleAvailability = async () => {
    try {
      const response = await refetch();
      if (response.data.status) {
        setIsAvailable(response.data.message.includes("turned on"));
      } else {
        console.error("Failed to toggle availability");
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };
  return (
    <View>
      <XStack width={"80%"} marginTop={25} justifyContent="space-between">
        <XStack gap={10}>
          <View
            backgroundColor={theme?.["secondary/700"]?.val}
            width={40}
            height={40}
            borderRadius={100}
            justifyContent="center"
            alignItems="center"
          >
            <BroadcastIcon />
          </View>
          <YStack>
            <Text
              color={theme.black1?.val}
              fontSize={14}
              fontFamily="$body"
              fontWeight={500}
            >
              Availability
            </Text>
            <Text fontSize={12} fontFamily="$body" color={theme?.black3?.val}>
              {isAvailable
                ? "You are currently online"
                : "You are currently offline"}
            </Text>
          </YStack>
        </XStack>
        <ToggleSwitch
          isOn={isAvailable}
          onColor="#00D158"
          offColor="#D9D9D9"
          labelStyle={{ color: "black", fontWeight: "900" }}
          size="medium"
          onToggle={handleToggleAvailability}
          disabled={isLoading}
        />
      </XStack>
      <View borderBottomWidth={1} borderBottomColor={theme.black4?.val} marginTop={25} />
    </View>
  );
};
