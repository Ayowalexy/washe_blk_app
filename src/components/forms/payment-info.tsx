import { XStack, YStack, useTheme } from "tamagui";
import { Star } from "../../utils/assets";
import { useAtom } from "jotai";
import { FlatList } from "react-native-gesture-handler";
import { persistentUserAtom } from "../../atoms";
import { Text } from "../../libs/Text";
import { View } from "../../libs/View";
import { useGetPaymentMethods } from "../../../api/queries";

export const PaymentInfo = () => {
  const theme = useTheme();
  const { data } = useGetPaymentMethods();
  const [user] = useAtom(persistentUserAtom);
  return (
    <>
      <FlatList
        style={{ width: "100%"}}
        data={Array.isArray(data?.data?.data) ? data?.data?.data : []}
        // data={[]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 200}}
        keyExtractor={(item) => item}
        renderItem={(item) => (
          <YStack
            width="80%"
            marginTop={30}
            marginHorizontal="auto"
            backgroundColor={theme.secondary3}
            padding={18}
          >
            <Text color={theme?.black3?.val} fontSize={12}>
              Payment Information
            </Text>
            <XStack justifyContent="space-between">
              <XStack>
                <YStack>
                  <Text color={theme?.black1?.val} fontSize={15}>
                    {item?.item?.billing_details?.name ??
                      `${user?.firstName} ${user?.lastName}`}
                  </Text>
                  {
                    <XStack alignItems="center">
                      <XStack alignItems="center">
                        {Array(4)
                          .fill("_")
                          .map((elem, index) => (
                            <Star key={index} />
                          ))}
                      </XStack>
                      <Text
                        marginLeft={4}
                        color={theme?.black3?.val}
                        fontSize={12}
                      >
                        {item.item?.exp_month}
                      </Text>
                      <View
                        borderLeftColor={theme?.black3?.val}
                        borderLeftWidth={1}
                        height={10}
                        marginHorizontal={6}
                      />
                      <Text color={theme?.black3?.val} fontSize={12}>
                        {item.item?.card?.exp_month}
                      </Text>
                      <View
                        borderLeftColor={theme?.black3?.val}
                        borderLeftWidth={1}
                        height={10}
                        marginHorizontal={6}
                      />
                      <Text color={theme?.black3?.val} fontSize={12}>
                        {item.item?.card?.last4}
                      </Text>
                    </XStack>
                  }
                </YStack>
              </XStack>
            </XStack>
          </YStack>
        )}
      />
    </>
  );
};
