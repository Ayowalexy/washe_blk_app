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
};
export const UserHistoryCard = ({
  firstName,
  lastName,
  estimatedTime,
  location,
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
              uri: "https://s3-alpha-sig.figma.com/img/4b51/cee6/d27dccad68facb12a73eb3def8dc1d6d?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nGa9rX7Yq0quuwr2iMVhyaP6BX67SI8mP7DLox6VsgrqYUsj0KvG4ajCHGQZju9VZpODuYdCvU8cqipBsv2-85XMLq0pxnvdJlugzNPdV69o4gbCJzqU0oucoXnpIZ2QGo46qFFm7VBaRVkbiVBaWwXXtPVkTfDUQi8LagH9y4PshBTl2bDXrU8QsGX9ORGKpBhwbIhVy6W1vb7F5J~p-lnN~2h2qDsFuTeMSKsalRYpbLcEmdiqCHp9BPXKmOyGSmet2nzBXwkTNd2Yo8gakmMxEQZ0vDPVbXopRPidbt8wPv8pQTwYbpK4R9c7k659ayql1HkSfQBxAxpOik9qNg__",
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

            <Text fontFamily="$body" fontWeight={500} fontSize={12} color={theme?.black3?.val}>
              {location?.length > 17
                ? `${location.substring(0, 17)}...`
                : location}
            </Text>
            <Text fontFamily="$body" fontWeight={500} fontSize={12} color={theme?.black3?.val}>
              10:50 AM
            </Text>
          </YStack>
        </XStack>
      </XStack>
    </View>
  );
};
