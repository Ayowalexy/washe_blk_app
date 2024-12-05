import { Modal, StyleSheet } from "react-native";
import { View } from "../../libs/View";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { SetStateAction } from "jotai";
import { Dispatch, useEffect, useState } from "react";
import { StopClock } from "../../../assets/images/svg/icons";
import { YStack } from "tamagui";
import { Text } from "../../libs/Text";

type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  timeout?: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
export const PriceReview = ({
  show,
  setShow,
  timeout = 5000,
  setShowModal,
}: Props) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
        setShowModal(true);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [show, timeout, setShow]);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => setShow(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal} height="auto">
            <YStack justifyContent="center" alignItems="center" gap={12}>
              <StopClock />
              <Text fontFamily='$body' fontSize={16} fontWeight={500} color="textSecondary">
                Sit tight, Deshawn!
              </Text>
              <Text fontFamily='$body' color="textBlack" fontSize={22} fontWeight={600}>
                Price Review
              </Text>
              <Text
                textAlign="center"
                color="$textSecondary"
                fontSize={16}
                fontWeight={500}
                fontFamily='$body'
              >
                The customer is currently reviewing the final service fee. Do
                remind them the base fee is nonrefundable should they cancel.
              </Text>
            </YStack>
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
