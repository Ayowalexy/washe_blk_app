import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { Star } from "../../utils/assets";
import { View } from "../libs/view";

export const PaymentInfo = () => {
  const theme = useTheme();
  return (
    <YStack
      width="80%"
      marginTop={30}
      marginHorizontal="auto"
      backgroundColor={theme.secondary3}
      padding={18}
    >
      <Text color={theme?.black3?.val} fontSize={12}>
        Payment Information
      </Text>
      <Text color={theme.red2?.val} fontSize={14} marginTop={5}>
        Gabriel Inyamah
      </Text>
      <XStack alignItems="center" marginTop={5}>
        <XStack alignItems="center">
          {Array(4)
            .fill("_")
            .map((elem, index) => (
              <Star key={index} />
            ))}
        </XStack>
        <Text marginLeft={4} color={theme?.black3?.val} fontSize={12}>
          8509
        </Text>
        <View
          borderLeftColor={theme?.black3?.val}
          borderLeftWidth={1}
          height={10}
          marginHorizontal={6}
        />
        <Text color={theme?.black3?.val} fontSize={12}>
          09/25
        </Text>
        <View
          borderLeftColor={theme?.black3?.val}
          borderLeftWidth={1}
          height={10}
          marginHorizontal={6}
        />
        <Text color={theme?.black3?.val} fontSize={12}>
          645
        </Text>
      </XStack>
    </YStack>
  );
};
