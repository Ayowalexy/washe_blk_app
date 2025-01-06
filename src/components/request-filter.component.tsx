import { XStack, useTheme } from "tamagui"
import { View } from "../libs/View"
import { Text } from "../libs/Text"


export const RequestFilter = () => {
    const theme = useTheme()
    return(
        <XStack gap={10} marginTop={15}>
        <View
          paddingHorizontal={16}
          paddingVertical={10}
          justifyContent="center"
          backgroundColor={theme?.accent6?.val}
          borderWidth={1}
          borderColor={theme?.primary3?.val}
          borderRadius={100}
        >
          <Text fontSize={12} color={theme?.primary3?.val}>
            Newest - Oldest{" "}
          </Text>
        </View>
        <View
          paddingHorizontal={16}
          paddingVertical={10}
          justifyContent="center"
          backgroundColor={theme?.white1?.val}
          borderWidth={1}
          borderColor={theme?.black4?.val}
          borderRadius={100}
        >
          <Text fontSize={12} color={theme?.black3?.val}>
            Oldest - Newest{" "}
          </Text>
        </View>
      </XStack>
    )
}