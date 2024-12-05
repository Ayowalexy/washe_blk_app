import { Modal, StyleSheet } from "react-native";
import { View } from "../../libs/View";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { SetStateAction } from "jotai";
import { Dispatch, useEffect, useState } from "react";
import {
  ArrowLeft,
  SadIcon,
  StopClock,
} from "../../../assets/images/svg/icons";
import { useTheme, YStack } from "tamagui";
import { Text } from "../../libs/Text";
import { Button } from "../../libs/button";
import { useNavigation } from "@react-navigation/native";

export const PriceRejectedModal = () => {
  //   useEffect(() => {
  //     if (!show) {
  //       const timer = setTimeout(() => {
  //         setShow(true);
  //       }, timeout);

  //       return () => clearTimeout(timer);
  //     }
  //   }, [show, timeout, setShow]);
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={false}
        onRequestClose={() => null}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal} height="auto">
            <YStack justifyContent="center" alignItems="center" gap={12}>
              <SadIcon />

              <Text color="textBlack" fontSize={22} fontWeight={600}>
                Price Rejected
              </Text>
              <Text
                textAlign="center"
                color="$textSecondary"
                fontSize={16}
                fontWeight={500}
              >
                The customer has rejected the new price and canceled the order.
              </Text>
            </YStack>
            <Button
              title="Back to home"
              iconPosition="center"
              color={theme.black1?.val}
              textColor={theme.white1?.val}
              style={{ height: 60, marginTop: 20 }}
              textSize={14}
              //   onPress={() => navigation.navigate('')}
              icon={
                <>
                  <ArrowLeft />
                </>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: "transparent",
  },
  modal: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 70,
    marginTop: "auto",
    borderRadius: 30,
    position: "relative",
  },
});
