import { useTheme, XStack, YStack } from "tamagui";
import { View } from "../../libs/View";
import { Text } from "../../libs/Text";
import { Clock } from "../../../assets/images/svg/icons";
import { InputBox } from "../input";
import { Dispatch, SetStateAction } from "react";
import { KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAtom } from "jotai";
import { requestTypeAtom } from "../../atoms";
import { formatNumberWithTwoDecimals } from "../../utils/format-number";

type Props = {
  updatePricing: boolean;
  setPrice: Dispatch<SetStateAction<string>>;
  price: string;
  amount: number;
  baseFee: number;
};
export const PaymentDetails = ({
  updatePricing,
  price,
  setPrice,
  amount,
  baseFee,
}: Props) => {
  const theme = useTheme();
  const [requestType] = useAtom(requestTypeAtom);
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={{ width: "100%" }}>
        <View
          gap={12}
          paddingVertical={15}
          borderBottomWidth={1}
          borderBottomColor="$black4"
          width="100%"
        >
          <XStack justifyContent="space-between">
            <Text
              fontFamily="$body"
              color={theme.black1}
              fontSize={19}
              fontWeight={600}
            >
              Total
            </Text>
            <Text
              fontFamily="$body"
              color={theme["primary/300"]}
              fontWeight={500}
              fontSize={16}
            >
              -${formatNumberWithTwoDecimals(amount + baseFee)}
            </Text>
          </XStack>
          <XStack justifyContent="space-between">
            <Text
              fontFamily="$body"
              fontSize={16}
              fontWeight={500}
              color={theme.black1}
            >
              Base Fee
            </Text>
            <Text
              fontFamily="$body"
              color={theme.primary3}
              fontWeight={500}
              fontSize={16}
            >
              ${formatNumberWithTwoDecimals(baseFee)}
            </Text>
          </XStack>
          <XStack justifyContent="space-between">
            <Text
              fontFamily="$body"
              fontSize={16}
              fontWeight={500}
              color={theme.black1}
            >
              Laundry
            </Text>
            <Text
              fontFamily="$body"
              color={theme.primary3}
              fontWeight={500}
              fontSize={16}
            >
              ${formatNumberWithTwoDecimals(amount)}
            </Text>
          </XStack>
        </View>

        {requestType !== "dropoff" && (
          <>
            <XStack alignItems="flex-start" marginTop={10} gap={4}>
              <Clock />
              {updatePricing ? (
                <Text
                  fontFamily="$body"
                  fontSize={12}
                  color={theme.black3}
                  width="80%"
                >
                  Weigh the customer’s laundry to determine the exact service
                  fees.
                </Text>
              ) : (
                <Text
                  fontFamily="$body"
                  fontSize={12}
                  color={theme.black3}
                  width={"80%"}
                >
                  Laundry service fees might change upon weighing customer’s
                  load.
                </Text>
              )}
            </XStack>

            <View>
              {updatePricing && (
                <XStack gap={10} marginTop={20}>
                  <View width={170}>
                    <InputBox
                      keyboardType="number-pad"
                      rightElement={
                        <XStack
                          gap={4}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Text color={theme["neutral/300"]?.val} fontSize={20}>
                            |
                          </Text>
                          <Text color={theme["neutral/300"]?.val} fontSize={14}>
                            lbs
                          </Text>
                        </XStack>
                      }
                      label="Weight"
                      placeholder="0.0"
                      onChangeText={(text) => setPrice(text)}
                    />
                  </View>
                  <View width="48%">
                    <Text fontFamily="$body" fontSize={14}>
                      Laundry fee
                    </Text>
                    <Text
                      fontFamily="$body"
                      fontSize={14}
                      textAlign="right"
                      marginTop={16}
                    >
                      {price ? `$${price}` : "$0"}
                    </Text>
                  </View>
                </XStack>
              )}
            </View>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};
