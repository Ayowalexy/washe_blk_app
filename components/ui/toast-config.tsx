import { XStack, YStack } from "tamagui";
import { Text } from "../libs/text";
import { useTheme } from "tamagui";

export const toastConfig = {
  customSuccess: ({ text1, props }: any) => {
    const theme = useTheme();
    return (
      <XStack
        justifyContent="center"
        alignItems="center"
        style={[{ height: 50 }, props?.styles]}
        height={40}
        gap={9}
        width="auto"
        paddingHorizontal={20}
        borderRadius={10}
        backgroundColor={"$success2"}
      >
        <Text fontFamily="$body" fontSize={16} fontWeight="500">
          ✅
        </Text>
        <Text fontFamily="$body" fontSize={16} fontWeight="500" color="$black3">
          {text1}
        </Text>
      </XStack>
    );
  },
  customError: ({ text1, props }: any) => {
    return (
      <XStack
        justifyContent="center"
        alignItems="center"
        style={[{ height: 50 }, props?.styles]}
        height={40}
        gap={9}
        width="auto"
        paddingHorizontal={20}
        borderRadius={14}
        backgroundColor={"$primary1"}
      >
        <Text fontFamily="$body" fontSize={16} fontWeight="500">
          🚫
        </Text>
        <Text
          fontFamily="$body"
          fontSize={14}
          fontWeight="500"
          color="$white1"
          style={props?.textStyle}
        >
          {text1}
        </Text>
      </XStack>
    );
  },
};
