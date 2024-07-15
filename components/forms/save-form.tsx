import React, { useState } from "react";
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
  setOpenConfirmation: Dispatch<SetStateAction<boolean>>;
  setPaymentModal: Dispatch<SetStateAction<boolean>>;
  isEnabled: boolean;
  loading?: boolean;
  toggleSwitch: () => void;
};

export const SaveForm = ({ isEnabled, toggleSwitch }: Props) => {
  const theme = useTheme();
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);

  const { refetch, data } = useGetLaundryType();
  const [LaundryServiceName] = useAtom(laundryRequestServiceNameAtom);

  const serviceName = Array.isArray(data?.data)
    ? data.data.find(
        (elem: any) => elem.id === oneLaundryRequest.laundryRequestTypeId
      )?.name
    : null;

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
                    color={theme?.blue1?.val}
                    fontSize={12}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    Service
                  </Text>
                  <Text
                    color={theme?.white1?.val}
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
                    color={theme?.blue1?.val}
                    fontSize={12}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    Laundry Type
                  </Text>

                  <Text
                    color={theme?.white1?.val}
                    fontSize={14}
                    fontFamily="$body"
                    fontWeight="500"
                    marginTop={5}
                    textTransform="capitalize"
                  >
                    {serviceName}
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
            borderColor={theme?.black4?.val}
          >
            <Text color={theme?.black1?.val} fontSize={15}>
              Pickup Information
            </Text>
            <YStack marginTop={20}>
              <Text color={theme?.black3?.val} fontSize={13}>
                Date/Time
              </Text>
              <XStack gap={4}>
                <Text color={theme?.black1?.val} fontSize={15}>
                  {moment(oneLaundryRequest.pickupDate).format("Do MMM YY")},
                </Text>
                <Text color={theme?.black1?.val} fontSize={15}>
                  {oneLaundryRequest.pickupTime}
                </Text>
              </XStack>
              <View
                borderBottomWidth={1}
                borderBottomColor={theme?.black4?.val}
                paddingVertical={13}
              />
            </YStack>
            <YStack marginTop={20}>
              <Text color={theme?.black3?.val} fontSize={13}>
                TimeFrame
              </Text>
              <Text color={theme?.black1?.val} fontSize={15}>
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
            borderColor={theme?.black4?.val}
          >
            <Text color={theme?.black1?.val} fontSize={15}>
              Preferences
            </Text>
            <YStack marginTop={20}>
              <XStack justifyContent="space-between">
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Detergent Type
                  </Text>
                  <Text
                    color={theme?.black1?.val}
                    fontSize={15}
                    textTransform="capitalize"
                  >
                    {oneLaundryRequest.detergentType}
                  </Text>
                </YStack>
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Water Temperature
                  </Text>
                  <Text
                    color={theme?.black1?.val}
                    fontSize={15}
                    textTransform="capitalize"
                  >
                    {oneLaundryRequest.waterTemperature}
                  </Text>
                </YStack>
              </XStack>
              <View
                borderBottomWidth={1}
                borderBottomColor={theme?.black4?.val}
                paddingVertical={13}
              />
            </YStack>
            <YStack marginTop={20}>
              <XStack
                justifyContent="space-between"
                alignItems="flex-start"
                gap={"3%"}
              >
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Fabric Softener
                  </Text>
                  <Text color={theme?.black1?.val} fontSize={15}>
                    {oneLaundryRequest.softener ? "Yes" : "No"}
                  </Text>
                </YStack>
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Bleach
                  </Text>
                  <Text color={theme?.black1?.val} fontSize={15}>
                    {oneLaundryRequest.bleach ? "Yes" : "No"}
                  </Text>
                </YStack>
              </XStack>
              <View
                borderBottomWidth={1}
                borderBottomColor={theme?.black4?.val}
                paddingVertical={13}
              />
              <XStack
                justifyContent="space-between"
                alignItems="flex-start"
                gap={"3%"}
                marginTop={20}
              >
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Dye
                  </Text>
                  <Text color={theme?.black1?.val} fontSize={15}>
                    {oneLaundryRequest.dye ? "Yes" : "No"}
                  </Text>
                </YStack>
                <YStack width={"47%"} alignItems="flex-start">
                  <Text color={theme?.black3?.val} fontSize={13}>
                    Dye Color
                  </Text>
                  <Text
                    color={theme?.black1?.val}
                    fontSize={15}
                    textTransform="capitalize"
                  >
                    {oneLaundryRequest.dyeColor}
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          </View>
          <XStack marginTop={10} gap={8} marginBottom={10}>
            <ToggleSwitch
              isOn={isEnabled}
              onColor="#00D158"
              offColor="#F9FAFB"
              labelStyle={{ color: "black", fontWeight: "900" }}
              size="small"
              onToggle={toggleSwitch}
            />
            <Text color={theme?.black1?.val} fontSize={14}>
              Save request to be used in the future
            </Text>
          </XStack>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 149,
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
