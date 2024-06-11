import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "../libs/view";
import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { CardImg } from "../../utils/assets-png";
import { AtmCard, Star, Stripe } from "../../utils/assets";
import { PaymentDetails } from "../payment-details";
import { useState } from "react";
import { Radio } from "./radio";

export const PaymentForm = () => {
  const theme = useTheme();
  const [active, setActive] = useState(1);
  const handleActive = (id: number) => {
    setActive(id);
  };
  return (
    <>
      <View width="100%" paddingHorizontal={28} paddingBottom={30}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View width="100%" style={styles.container}>
            <ImageBackground
              imageStyle={styles.cardImage}
              source={CardImg}
              style={styles.card}
            >
              <View padding={22}>
                <YStack>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text
                      color={theme?.blue1?.val}
                      fontSize={12}
                      fontFamily="$body"
                      fontWeight="500"
                    >
                      Sub-total
                    </Text>
                    <Text
                      color={theme?.white1?.val}
                      fontSize={14}
                      fontFamily="$body"
                      fontWeight="500"
                      marginTop={5}
                    >
                      $ 40.00
                    </Text>
                  </XStack>
                  <View
                    borderBottomWidth={1}
                    borderBottomColor={theme?.blue2?.val}
                    paddingVertical={9}
                  />
                </YStack>
                <YStack paddingTop={12}>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text
                      color={theme?.blue1?.val}
                      fontSize={12}
                      fontFamily="$body"
                      fontWeight="500"
                    >
                      Tax
                    </Text>
                    <Text
                      color={theme?.white1?.val}
                      fontSize={14}
                      fontFamily="$body"
                      fontWeight="500"
                      marginTop={5}
                    >
                      $ 0.00
                    </Text>
                  </XStack>
                  <View
                    borderBottomWidth={1}
                    borderBottomColor={theme?.blue2?.val}
                    paddingVertical={9}
                  />
                </YStack>
                <YStack paddingTop={12}>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text
                      color={theme?.blue1?.val}
                      fontSize={12}
                      fontFamily="$body"
                      fontWeight="500"
                    >
                      Total Amount
                    </Text>
                    <Text
                      color={theme?.white1?.val}
                      fontSize={14}
                      fontFamily="$body"
                      fontWeight="500"
                      marginTop={5}
                    >
                      $ 40.00
                    </Text>
                  </XStack>
                </YStack>
              </View>
            </ImageBackground>
          </View>
          <View
            width={"100%"}
            height="auto"
            padding={20}
            marginTop={27}
            borderWidth={1}
            borderRadius={12}
            borderColor={theme?.black4?.val}
          >
            <Text color={theme?.black3?.val} fontSize={13}>
              Select Payment Information
            </Text>
            <FlatList
              data={PaymentDetails}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(item) => (
                <YStack marginTop={20}>
                  <XStack justifyContent="space-between">
                    <XStack>
                      <View
                        width={36}
                        height={24}
                        backgroundColor={theme?.white1?.val}
                        style={styles.atm}
                        justifyContent="center"
                        alignItems="center"
                        paddingVertical={15}
                        paddingHorizontal={20}
                      >
                        {item.item.icon}
                      </View>
                      <YStack marginLeft={14}>
                        <Text color={theme?.black1?.val} fontSize={15}>
                          {item.item.name}
                        </Text>
                        {item.item.email ? (
                          <Text color={theme?.black3?.val} fontSize={12}>
                            {item.item.email}
                          </Text>
                        ) : (
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
                              {item.item.code}
                            </Text>
                            <View
                              borderLeftColor={theme?.black3?.val}
                              borderLeftWidth={1}
                              height={10}
                              marginHorizontal={6}
                            />
                            <Text color={theme?.black3?.val} fontSize={12}>
                              {item.item.expiry}
                            </Text>
                            <View
                              borderLeftColor={theme?.black3?.val}
                              borderLeftWidth={1}
                              height={10}
                              marginHorizontal={6}
                            />
                            <Text color={theme?.black3?.val} fontSize={12}>
                              {item.item.cvv}
                            </Text>
                          </XStack>
                        )}
                      </YStack>
                    </XStack>
                    <Radio
                      active={active === item.item.id}
                      handleActive={() => handleActive(item.item.id)}
                      id={item?.item?.id}
                    />
                  </XStack>
                </YStack>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 179,
    width: "100%",
    marginTop: 20,
  },
  card: {
    width: "100%",
    height: "100%",
  },
  cardImage: {
    borderRadius: 20,
  },
  atm: {
    shadowColor: "rgba(103, 114, 229, 0.08)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 1,
  },
  active: {
    width: 16,
    height: 16,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#00D158",
  },
  inactive: {
    width: 16,
    height: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#DFE2E2",
  },
});
