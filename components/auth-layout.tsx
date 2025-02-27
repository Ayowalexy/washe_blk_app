import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "./libs/text";
import { View } from "./libs/view";
import { StyleSheet } from "react-native";
import { Google, Facebook } from "../utils/assets";
import { ReactNode } from "react";
import { Button } from "./button";

export const AuthLayout = ({
  children,
  auth = true,
  title = "Create your account",
  subtitle = "Help us get to know you",
  text = "By joining you agree to our Terms and our Privacy Policy",
  googleAuth,
}: {
  children: ReactNode;
  auth?: boolean;
  title?: string;
  subtitle?: string;
  text?: string;
  googleAuth?: VoidFunction;
}) => {
  const theme = useTheme();
  return (
    <View>
      <View width="88%" marginHorizontal="auto">
        <View alignItems="center" rowGap={5}>
          <Text
            textTransform="uppercase"
            fontSize={12}
            fontFamily="$body"
            fontWeight="600"
            color="$black1"
          >
            {title}
          </Text>
          <Text
            fontSize={24}
            fontFamily="$body"
            fontWeight="600"
            color="$primary2"
            textAlign="center"
          >
            {subtitle}
          </Text>
          <Text
            textAlign="center"
            paddingHorizontal={70}
            fontFamily="$body"
            fontWeight={"400"}
            color="$black3"
            fontSize={14}
          >
            {text}
          </Text>
        </View>
        {auth && (
          <>
            <XStack
              width="100%"
              marginTop={40}
              justifyContent="center"
              gap={20}
            >
              <YStack
                onPress={googleAuth}
                width="47%"
                height={90}
                style={styles.card}
              >
                <Google />
                <Text fontSize={15} fontFamily="$body" fontWeight="500">
                  Google
                </Text>
              </YStack>
              {/* <YStack width="47%" height={90} style={styles.card}>
                <Facebook />
                <Text fontSize={15} fontFamily="$body" fontWeight="500">
                  Facebook
                </Text>
              </YStack> */}
            </XStack>
            <XStack
              gap={10}
              alignItems="center"
              paddingTop={45}
              justifyContent="space-between"
            >
              <View
                borderBottomWidth={1}
                borderBottomColor={'$black4'}
                width="43%"
              />
              <Text
                fontSize={14}
                color={'$black3'}
                fontFamily="$body"
                fontWeight="500"
              >
                or
              </Text>
              <View
                borderBottomWidth={1}
                borderBottomColor={'$black4'}
                width="43%"
              />
            </XStack>
          </>
        )}
        <View paddingTop={40}>{children}</View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#F0F3F4",
    // Shadow for iOS
    shadowColor: "rgba(103, 114, 229, 0.08)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 1,
    alignItems: "center",
    gap: 10,
  },
});
