import { useAtom } from "jotai";
import { persistentUserAtom } from "../../atoms";
import { View } from "../../libs/View";
import { XStack, YStack } from "tamagui";
import { Text } from "../../libs/Text";
import { Close } from "../../utils/assets";
import { Image, TouchableOpacity } from "react-native";
import { Sand } from "../../utils/assets-png";
import { Dispatch, SetStateAction } from "react";

type props = {
  setOpenVerification: Dispatch<SetStateAction<boolean>>;
  close: () => void;
};
export const VerificationCard = ({ setOpenVerification, close }: props) => {
  const [user] = useAtom(persistentUserAtom);
  return (
    <>
      {user?.verificationDocument?.isApproved ? (
        <View
          marginTop={-33}
          padding={20}
          width="100%"
          height="auto"
          backgroundColor="$primary6"
          borderRadius={10}
        >
          <XStack justifyContent="space-between" alignItems="center">
            <Text
              fontSize={15}
              fontFamily="$body"
              fontWeight="600"
              color="$secondary7"
            >
              Verification Successful
            </Text>
            <TouchableOpacity onPress={close}>
              <Close />
            </TouchableOpacity>
          </XStack>
          <Text
            color="$black3"
            width="97%"
            fontFamily="$body"
            fontWeight="500"
            fontSize={13}
            marginTop={10}
            lineHeight={18}
          >
            All information provided have been reviewed by the admin. You can
            now start using Washe
          </Text>
        </View>
      ) : user?.verificationDocument?.rejectionReason === "" ? (
        <View
          marginTop={-33}
          padding={20}
          width="100%"
          height='auto'
          backgroundColor="$primary8"
          borderRadius={10}
          position="relative"
        >
          <XStack justifyContent="space-between" alignItems="center">
            <Text
              fontSize={15}
              fontFamily="$body"
              fontWeight="600"
              color="$primary7"
            >
              Verification unsuccessful
            </Text>
          </XStack>
          <XStack justifyContent="space-between">
            <YStack width="80%">
              <Text
                color="$black1"
                width="94%"
                fontFamily="$body"
                fontWeight="500"
                fontSize={13}
                marginTop={10}
                lineHeight={18}
              >
                Your washe account verification was unsuccessful & rejected by
                the admin
              </Text>
              <TouchableOpacity onPress={() => setOpenVerification(true)}>
                <XStack>
                  <Text color="$red1" fontSize={12} marginTop={10}>
                    View rejection reason
                  </Text>
                </XStack>
              </TouchableOpacity>
            </YStack>
            <View
              width={55}
              height={88}
              position="absolute"
              right={10}
              top={"0%"}
            >
              <Image source={Sand} style={{ width: "100%", height: "100%" }} />
            </View>
          </XStack>
        </View>
      ) : (
        user?.isVerified === false && (
          <View
            marginTop={-33}
            padding={20}
            width="100%"
            height="auto"
            backgroundColor="$primary6"
            borderRadius={10}
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Text
                fontSize={15}
                fontFamily="$body"
                fontWeight="600"
                color="$secondary7"
              >
                Verification in progress
              </Text>
              <Close />
            </XStack>
            <Text
              color="$black1"
              width="90%"
              fontFamily="$body"
              fontWeight="500"
              fontSize={13}
              marginTop={10}
              lineHeight={18}
            >
              Information provided is being reviewed by the admin. Verification
              takes 2-5 business days.
            </Text>
          </View>
        )
      )}
    </>
  );
};
