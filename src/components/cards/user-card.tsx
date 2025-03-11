import { TouchableOpacity } from "react-native";
import { View } from "../../libs/View";
import { Image, useTheme, XStack, YStack } from "tamagui";
import { Text } from "../../libs/Text";
import { Call, Clock, Location } from "../../../assets/images/svg/icons";
import { useContext } from "react";
import { MyContext } from "../../utils/context/request-context";
import { requestTypeAtom } from "../../atoms";
import { useAtom } from "jotai";

type Props = {
  firstName: string;
  lastName: string;
  estimatedTime: string;
  location: string;
  image?: string;
};
export const UserCard = ({
  firstName,
  lastName,
  estimatedTime,
  location,
  image,
}: Props) => {
  const theme = useTheme();

  const address = "2879 Willow Creek Lane, Little Rock, AR 72212";
  const [requestType] = useAtom(requestTypeAtom);
  console.log(requestType);
  return (
    <View
      width="100%"
      borderBottomWidth={1}
      paddingBottom={20}
      borderBottomColor="$black4"
    >
      <XStack justifyContent="space-between" alignItems="center" width={"auto"}>
        <XStack gap={12} alignItems="center">
          <Image
            source={{ uri: image }}
            backgroundSize="cover"
            backgroundPosition="center"
            width={50}
            height={50}
            borderRadius={100}
          />
          <YStack>
            {requestType === "dropoff" ? (
              <Text
                marginBottom={2}
                fontWeight={600}
                fontSize={16}
                fontFamily="$body"
              >
                Drop-off for Jenny Wilson
              </Text>
            ) : (
              <Text
                marginBottom={2}
                fontWeight={600}
                fontSize={16}
                fontFamily="$body"
              >
                {firstName} {lastName}
              </Text>
            )}
            <XStack justifyContent="space-between" alignItems="center" gap={8}>
              <XStack gap={4} alignItems="center">
                <Clock />
                <Text
                  fontFamily="$body"
                  fontSize={12}
                  color={theme?.black3?.val}
                >
                  {estimatedTime?.length > 12
                    ? `${estimatedTime.substring(0, 12)}...`
                    : estimatedTime}
                </Text>
              </XStack>

              <Text fontFamily="$body" color={theme?.black3?.val} fontSize={12}>
                |
              </Text>
              <XStack gap={4} alignItems="center">
                <Location />
                <Text
                  fontFamily="$body"
                  fontSize={12}
                  color={theme?.black3?.val}
                >
                  {location?.length > 17
                    ? `${location.substring(0, 17)}...`
                    : location}
                </Text>
              </XStack>
            </XStack>
          </YStack>
          <Call />
        </XStack>
      </XStack>
    </View>
  );
};
