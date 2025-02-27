import React, { useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { View } from "./libs/view";
import { YStack, useTheme } from "tamagui";
import { SuccessIcon2 } from "../utils/assets";
import { Text } from "./libs/text";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../src/constants";
import { Button } from "./button";
import { Dispatch, SetStateAction } from "react";
import { useAtom } from "jotai";
import { UserData, persistentUserAtom } from "../src/atoms";
import { saveToken } from "../resources/storage";
import { useGetCurrentUser } from "../api/queries";

type Props = {
  title: string;
  text: string;
  text2?: string;
  onPress: () => void;
  disabled?: boolean;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export const SuccessModal = ({
  title,
  text,
  text2,
  onPress,
  disabled = false,
  visible,
  setVisible,
}: Props) => {
  const theme = useTheme();
  const [user, setUser] = useAtom(persistentUserAtom);
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <YStack alignItems="center" paddingTop={5}>
            <SuccessIcon2 />
            <Text
              fontSize={16}
              color={"$black1"}
              paddingTop={15}
              fontFamily="$body"
              fontWeight="500"
            >
              Welldone, {`${user?.firstName} ${user?.lastName}`}
            </Text>
            <Text
              fontSize={24}
              fontFamily="$body"
              fontWeight="600"
              marginTop={13}
              textAlign="center"
              paddingHorizontal={20}
            >
              {title}
            </Text>
            <Text
              fontFamily="$body"
              fontWeight="500"
              color={"$black3"}
              textAlign="center"
              fontSize={14}
              minWidth={"65%"}
              width={"69%"}
              marginTop={20}
            >
              {text}
            </Text>
            <Text
              fontFamily="$body"
              fontWeight="500"
              color={"$black3"}
              textAlign="center"
              fontSize={14}
              maxWidth={"65%"}
              marginTop={20}
            >
              {text2}
            </Text>
          </YStack>
          <View
            width={"88%"}
            marginHorizontal="auto"
            position="absolute"
            top="95%"
            left="6%"
          >
            <Button
              title="Done"
              onPress={onPress}
              disabled={loading || disabled}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: "rgba(1, 40, 96, 0.4)",
  },
  modal: {
    width: "94%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#FFF",
    height: "77%",
    paddingTop: 40,
    paddingBottom: 40,
    marginTop: "auto",
    marginBottom: "3%",
    borderRadius: 30,
    position: "relative",
  },
});
