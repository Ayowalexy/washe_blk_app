import { Image, StyleSheet } from "react-native";
import { ScrollView, XStack, YStack, useTheme } from "tamagui";
import { user as ii } from "../utils/assets-png";
import { View } from "./libs/view";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../src/constants";
import { Text } from "./libs/text";
import { ReactNode } from "react";
import { useAtom } from "jotai";
import { persistentUserAtom } from "../src/atoms";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const TabLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const [user] = useAtom(persistentUserAtom);
  const {top, bottom} = useSafeAreaInsets()
  // console.log(user, "us");
  return (
    <View
      width={DEVICE_WIDTH}
      backgroundColor="$white1"
      paddingHorizontal={20}
      paddingTop={top + 10}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <XStack>
          <View height={50} width={50}>
            <Image
              source={user?.avatar ? { uri: user.avatar } : ii} // `ii` must be a valid image reference
              style={styles.img}
            />
            ;
          </View>
          <YStack marginLeft={9} marginTop={6}>
            <Text
              color={theme?.primary2}
              fontSize={18}
              fontFamily="$body"
              fontWeight="600"
            >
              Hello{user ? `, ${user?.firstName}!` : ""}
            </Text>
            <Text
              marginTop={3}
              color={theme?.primary2}
              fontSize={13}
              fontFamily="$body"
              fontWeight="400"
            >
              Why haven’t you done your laundry?
            </Text>
          </YStack>
        </XStack>
        <View marginTop={25}>{children}</View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
});
