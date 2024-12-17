import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../libs/View";
import { KeyIcon } from "../../assets/images/svg/icons";
import { LockIcon } from "../utils/assets";
import { useTheme, XStack, YStack } from "tamagui";
import { Text } from "../libs/Text";
import ToggleSwitch from "toggle-switch-react-native";
import { useAtom } from "jotai";
import { TwoFactorAuthenticationState } from "../atoms";
import { useToggle2FA } from "../../api/queries";

const SecurityList = [
  {
    image: KeyIcon,
    title: "Change Password",
    subText: "Edit user profile information",
  },
  {
    image: LockIcon,
    title: "Two Factor Authentication",
    subText:
      "A 6-digit OTP code will be sent to you every time you access your account",
  },
];
type Props = {
  onPress?: VoidFunction;
  open?: VoidFunction;
};
export const Security = ({ onPress, open }: Props) => {
  const theme = useTheme();
  const [open2FA, setOpen2FA] = useAtom(TwoFactorAuthenticationState);
  const { refetch } = useToggle2FA();
  
  const handleToggleAvailability = async () => {
    try {
      const response = await refetch();
      if (response.data.status) {
        setOpen2FA(response.data.message.includes("turned on"));
        console.log(response.data.message, 'kdk')

      } else {
        console.error("Failed to toggle availability");
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };
  return (
    <View>
      <View style={styles.content}>
        <YStack>
          <TouchableOpacity onPress={onPress}>
            <XStack>
              <View>
                <KeyIcon />
              </View>
              <YStack marginLeft={13} width="68%">
                <Text
                  fontFamily="$body"
                  color={theme?.black1?.val}
                  fontSize={14}
                  fontWeight={500}
                >
                  Change Password
                </Text>
                <Text
                  fontFamily="$body"
                  color={theme?.black3?.val}
                  fontSize={12}
                  fontWeight={500}
                >
                  Edit user profile information
                </Text>
              </YStack>
            </XStack>
          </TouchableOpacity>

          <View
            borderBottomColor="#E2E7E9"
            borderBottomWidth={1}
            paddingVertical={10}
          />
        </YStack>
        <YStack>
          <TouchableOpacity onPress={open}>
            <XStack alignItems="flex-start">
              <View>
                <LockIcon />
              </View>
              <YStack marginLeft={13} width="68%" paddingBottom={20}>
                <Text
                  fontFamily="$body"
                  color={theme?.black1?.val}
                  fontSize={14}
                  fontWeight={500}
                >
                  Two Factor Authentication
                </Text>
                <Text
                  fontFamily="$body"
                  color={theme?.black3?.val}
                  fontSize={12}
                  fontWeight={500}
                >
                  A 6-digit OTP code will be sent to you every time you access
                  your account
                </Text>
              </YStack>
              <ToggleSwitch
                isOn={open2FA}
                onColor="#00D158"
                offColor="#D9D9D9"
                labelStyle={{ color: "black", fontWeight: "900" }}
                size="large"
                onToggle={handleToggleAvailability}
              />
            </XStack>
          </TouchableOpacity>
        </YStack>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignSelf: "center",
    height: 194,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 26,
  },
  contentContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 35,
    marginHorizontal: "auto",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  cardImage: {
    borderRadius: 20,
  },
  user: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  content: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E2E7E9",
    marginTop: 30,
    padding: 20,
    gap: 20,
    borderRadius: 12,
  },
});
