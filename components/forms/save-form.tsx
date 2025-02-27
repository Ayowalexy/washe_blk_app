import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { View } from "../libs/view";
import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { CardImg } from "../../utils/assets-png";
import { useAtom } from "jotai";
import {
  LaundryRequests,
  laundryRequestServiceNameAtom,
} from "../../src/atoms";
import { Dispatch, SetStateAction } from "react";
import { useGetLaundryType } from "../../api/queries";
import moment from "moment";
import ToggleSwitch from "toggle-switch-react-native";

type Props = {
  time?: string;
};

export const SaveForm = ({ time }: Props) => {
  const theme = useTheme();
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);
  const [laundryType, setLaundryType] = useState([""]);

  const { refetch, data } = useGetLaundryType();
  const [LaundryServiceName] = useAtom(laundryRequestServiceNameAtom);

  useEffect(() => {
    if (data?.data && oneLaundryRequest?.laundryRequestTypes?.length) {
      const serviceNames = oneLaundryRequest.laundryRequestTypes.map((type) => {
        const matchedItem = data.data.find(
          (elem: any) => elem.id === type.laundryRequestTypeId
        );
        return matchedItem?.name || null;
      });

      setLaundryType(serviceNames);
    }
  }, [data?.data, oneLaundryRequest.laundryRequestTypes]);

  console.log(oneLaundryRequest, "oneLaundryRequest.pickupTime");
  return (
    <>
      <View width="100%" paddingHorizontal={28} paddingBottom={150}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
        >
          <View width="100%" style={styles.container}>
            <ImageBackground
              imageStyle={styles.cardImage}
              source={CardImg}
              style={styles.card}
            >
              <View padding={22}>
                <YStack>
                  <Text
                    color={"$blue1"}
                    fontSize={12}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    Service
                  </Text>
                  <Text
                    color={"$white1"}
                    fontSize={14}
                    fontFamily="$body"
                    fontWeight="500"
                    marginTop={5}
                    textTransform="capitalize"
                  >
                    {LaundryServiceName}
                  </Text>
                </YStack>
                <YStack marginTop={20}>
                  <Text
                    color={"$blue1"}
                    fontSize={12}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    Laundry Type
                  </Text>

                  <Text
                    color={"$white1"}
                    fontSize={14}
                    fontFamily="$body"
                    fontWeight="500"
                    marginTop={5}
                    textTransform="capitalize"
                    flexDirection="row"
                  >
                    {laundryType.join(", ")}
                  </Text>
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
            borderColor={"$black4"}
          >
            <Text color={"$black1"} fontSize={15}>
              Pickup Information
            </Text>
            <YStack marginTop={20}>
              <Text color={"$black3"} fontSize={13}>
                Date/Time
              </Text>
              <XStack gap={4}>
                <Text color={"$black1"} fontSize={15}>
                  {moment(oneLaundryRequest.pickupDate).format("Do MMM YY")},
                </Text>
                <Text color={"$black1"} fontSize={15}>
                  {time}
                </Text>
              </XStack>
              <View
                borderBottomWidth={1}
                borderBottomColor={"$black4"}
                paddingVertical={13}
              />
            </YStack>
            <YStack marginTop={20}>
              <Text color={"$black3"} fontSize={13}>
                TimeFrame
              </Text>
              <Text color={"$black1"} fontSize={15}>
                {oneLaundryRequest.timeframe === "same_day"
                  ? "Same day"
                  : oneLaundryRequest.timeframe === "2_days"
                  ? "2 days"
                  : oneLaundryRequest.timeframe === "normal"
                  ? "Normal"
                  : ""}
              </Text>
            </YStack>
          </View>
          <View
            width={"100%"}
            height="auto"
            padding={20}
            marginTop={27}
            borderWidth={1}
            borderRadius={12}
            borderColor={"$black4"}
          >
            <Text color={"$black1"} fontSize={15}>
              Preferences
            </Text>
            <YStack marginTop={20}>
              <XStack justifyContent="space-between">
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={"$black3"} fontSize={13}>
                    Detergent Type
                  </Text>
                  <Text
                    color={"$black1"}
                    fontSize={15}
                    textTransform="capitalize"
                  >
                    {oneLaundryRequest.detergentType}
                  </Text>
                </YStack>
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={"$black3"} fontSize={13}>
                    Water Temperature
                  </Text>
                  <Text
                    color={"$black1"}
                    fontSize={15}
                    textTransform="capitalize"
                  >
                    {oneLaundryRequest.waterTemperature}
                  </Text>
                </YStack>
              </XStack>
              <View
                borderBottomWidth={1}
                borderBottomColor={"$black4"}
                paddingVertical={13}
              />
            </YStack>
            <YStack marginTop={20}>
              <XStack
                justifyContent="space-between"
                alignItems="flex-start"
                gap={4}
              >
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={"$black3"} fontSize={13}>
                    Fabric Softener
                  </Text>
                  <Text color={"$black1"} fontSize={15}>
                    {oneLaundryRequest.softener ? "Yes" : "No"}
                  </Text>
                </YStack>
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={"$black3"} fontSize={13}>
                    Bleach
                  </Text>
                  <Text color={"$black1"} fontSize={15}>
                    {oneLaundryRequest.bleach ? "Yes" : "No"}
                  </Text>
                </YStack>
              </XStack>
              <View
                borderBottomWidth={1}
                borderBottomColor={"$black4"}
                paddingVertical={13}
              />
              <XStack
                justifyContent="space-between"
                alignItems="flex-start"
                gap={4}
                marginTop={20}
              >
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={"$black3"} fontSize={13}>
                    Dye
                  </Text>
                  <Text color={"$black1"} fontSize={15}>
                    {oneLaundryRequest.dye ? "Yes" : "No"}
                  </Text>
                </YStack>
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={"$black3"} fontSize={13}>
                    Dye Color
                  </Text>
                  <Text
                    color={"$black1"}
                    fontSize={15}
                    textTransform="capitalize"
                  >
                    {oneLaundryRequest.dyeColor}
                  </Text>
                </YStack>
              </XStack>
            </YStack>
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
  scrollview: {
    height: "95%",
  },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
  },
});
