import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../../libs/Text";
import { View } from "../../libs/View";
import { SafeAreaView, StyleSheet } from "react-native";
import { Google, Facebook } from "../../utils/assets";
import { ReactNode } from "react";
import { ArrowRight, ButtonIcon } from "../../../assets/images/svg/icons";
import { Button } from "../../libs/button";
import { CloseButton } from "../buttons/close-button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DEVICE_HEIGHT } from "../../constants";

export const AuthLayout = ({
  children,
  auth = true,
  buttonTitle,
  title = "Create your account",
  subtitle = "Help us get to know you",
  text = "By joining you agree to our Terms and our Privacy Policy",
  onPress,
  submit,
  isLoading = false,
  googleAuth,
  show = false,
}: {
  children: ReactNode;
  auth?: boolean;
  title?: string;
  subtitle?: string;
  text?: string;
  onPress: VoidFunction;
  submit: VoidFunction;
  googleAuth?: VoidFunction;
  buttonTitle: string;
  show?: boolean;
  isLoading?: boolean;
}) => {
  const theme = useTheme();
  return (
    <View height={DEVICE_HEIGHT} backgroundColor="$white1" paddingTop={60}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View paddingTop={30} width={"100%"}>
          <View width="88%" marginHorizontal="auto" flexDirection="column">
            <View style={styles.round}>
              <ButtonIcon />
            </View>
            <View rowGap={5} marginTop={20}>
              <Text
                fontSize={16}
                fontFamily="$body"
                fontWeight="600"
                color="$black3"
              >
                {title}
              </Text>
              <Text
                fontSize={24}
                fontFamily="$body"
                fontWeight="600"
                color="$primary2"
                lineHeight={40}
              >
                {subtitle}
              </Text>
              <Text
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
                  {/* <YStack
                  // onPress={googleAuth}
                  width="47%"
                  height={90}
                  style={styles.card}
                >
                  <Google />
                  <Text fontSize={15} fontFamily="$body" fontWeight="500">
                    Google
                  </Text>
                </YStack> */}
                  <Button
                    icon={<Google />}
                    iconPosition="right"
                    title="Continue with Google"
                    variant="outline"
                    textColor="$black1"
                    style={{ height: 60 }}
                  />
                </XStack>
                <XStack
                  gap={10}
                  alignItems="center"
                  paddingTop={45}
                  justifyContent="space-between"
                >
                  <View
                    borderBottomWidth={1}
                    width={"35%"}
                    borderBottomColor={theme.borderLine?.val}
                  />
                  <View
                    borderWidth={1}
                    width={60}
                    height={35}
                    borderColor={"$borderLine"}
                    borderRadius={19}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text
                      fontSize={15}
                      textAlign="center"
                      color={theme.black1?.val}
                    >
                      OR
                    </Text>
                  </View>
                  <View
                    width={"35%"}
                    borderBottomWidth={1}
                    borderBottomColor={theme.borderLine?.val}
                  />
                </XStack>
              </>
            )}
            <View paddingTop={40}>{children}</View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <YStack height={show ? 150 : 100}>
        <XStack
          gap={20}
          marginVertical="auto"
          justifyContent="center"
          alignItems="center"
          width="88%"
          marginHorizontal="auto"
        >
          <CloseButton onPress={onPress} />
          <View width="80%">
            <Button
              title={buttonTitle}
              style={{ height: 60 }}
              onPress={submit}
              isLoading={isLoading}
              icon={<ArrowRight />}
              iconPosition="right"
              textSize={14}
            />
          </View>
        </XStack>
        {show && (
          <Text
            fontSize={12}
            textAlign="center"
            paddingHorizontal={50}
            paddingBottom={20}
          >
            By creating your account, you agree to Washe’s Terms of Use and
            Privacy Policy
          </Text>
        )}
      </YStack>
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
    shadowColor: "rgba(103, 114, 229, 0.08)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
    alignItems: "center",
    gap: 10,
  },
  round: {
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: "#0468F6",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
});
