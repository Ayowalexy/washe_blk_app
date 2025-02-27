import { XStack, useTheme } from "tamagui"
import { View } from "./libs/view"
import { Text } from "./libs/text"

export const RequestFilter = () => {
    const theme = useTheme()
    return(
        <XStack gap={10} marginTop={15}>
        <View
          paddingHorizontal={16}
          paddingVertical={10}
          justifyContent="center"
          backgroundColor={'$accent6'}
          borderWidth={1}
          borderColor={'$primary3'}
          borderRadius={100}
        >
          <Text fontSize={12} color={'$primary3'}>
            Newest - Oldest{" "}
          </Text>
        </View>
        <View
          paddingHorizontal={16}
          paddingVertical={10}
          justifyContent="center"
          backgroundColor={"$white1"}
          borderWidth={1}
          borderColor={'$black4'}
          borderRadius={100}
        >
          <Text fontSize={12} color={'$black3'}>
            Oldest - Newest{" "}
          </Text>
        </View>
      </XStack>
    )
}