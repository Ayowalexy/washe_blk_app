import { View } from "../../libs/View";
import { Image, useTheme, XStack, YStack } from "tamagui";
import { Text } from "../../libs/Text";
import { Call, Clock, Location } from "../../../assets/images/svg/icons";
import { requestTypeAtom } from "../../atoms";
import { useAtom } from "jotai";

type Props = {
  firstName: string;
  lastName: string;
  estimatedTime: string;
  location: string;
  image: string;
};
export const UserHistoryCard = ({
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
    <View width="100%">
      <XStack
        paddingVertical={15}
        paddingHorizontal={20}
        justifyContent="space-between"
        alignItems="center"
        width={"auto"}
        backgroundColor={theme?.lightGrey?.val}
      >
        <XStack gap={12}>
          <Image
            source={{
              uri: image,
            }}
            backgroundSize="cover"
            backgroundPosition="center"
            width={50}
            height={50}
            borderRadius={100}
          />
          <YStack>
            <Text
              marginBottom={2}
              fontWeight={600}
              fontSize={16}
              fontFamily="$body"
            >
              {firstName} {lastName}
            </Text>

            <Text
              fontFamily="$body"
              fontWeight={500}
              fontSize={12}
              color={theme?.black3?.val}
            >
              {location}
            </Text>
            <Text
              fontFamily="$body"
              fontWeight={500}
              fontSize={12}
              color={theme?.black3?.val}
            >
              10:50 AM
            </Text>
          </YStack>
        </XStack>
      </XStack>
    </View>
  );
};
