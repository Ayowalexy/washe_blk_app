import { YStack } from "tamagui";
import { View } from "../../libs/View";
import { Text } from "../../libs/Text";
import { useAtom } from "jotai";
import { oneAcceptedRequestAtom, requestTypeAtom } from "../../atoms";

export const PickUpCard = () => {
  const [requestType] = useAtom(requestTypeAtom);
  const [accepted] = useAtom(oneAcceptedRequestAtom)
  return (
    <View>
      <YStack
        paddingVertical={20}
        borderBottomWidth={1}
        borderBottomColor="$black4"
      >
        <Text fontFamily='$body' fontSize={12} color={"$black3"}>
          Pickup from
        </Text>
        <Text
        fontFamily='$body' 
          fontWeight={500}
          fontSize={15}
          color={requestType !== "dropoff" ? "$black1" : "$black3"}
          marginTop={8}
        >
         {accepted?.location}
        </Text>
      </YStack>
      <YStack paddingVertical={20}>
        <Text fontFamily='$body' fontSize={12} color={"$black3"}>
          Drop off at
        </Text>
        <Text
          fontWeight={500}
          fontFamily='$body'
          fontSize={15}
          color={requestType === "dropoff" ? "$black1" : "$black3"}
          marginTop={8}
        >
          456 Elm Street, Pine Bluff, AR 71601
        </Text>
      </YStack>
    </View>
  );
};
