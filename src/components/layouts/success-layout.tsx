import React, { ReactNode, useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { View } from "../../libs/View";
import { XStack, YStack, useTheme } from "tamagui";
import { SuccessIcon2 } from "../../utils/assets";
import { Text } from "../../libs/Text";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { Button } from "../../libs/button";
import { Dispatch, SetStateAction } from "react";
import { useAtom } from "jotai";
import { UserData, persistentUserAtom } from "../../atoms";
import { Info } from "../../../assets/images/svg/icons";

type Props = {
  title: string;
  text: string;
  text2?: string;
  onPress: () => void;
  disabled?: boolean;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  icon?: ReactNode;
  buttonTitle?: string;
  iconPosition?: "left" | "right" | "center";
  height?: string;
  info?: ReactNode;
  close?: boolean;
  top?: string;
  closeButton?: string;
  onReject?: VoidFunction;
};

export const SuccessModal = ({
  title,
  text,
  text2,
  onPress,
  disabled = false,
  visible,
  setVisible,
  icon,
  buttonTitle = "Done",
  iconPosition = "right",
  height = "45%",
  info,
  close,
  top = "95%",
  closeButton,
  onReject,
}: Props) => {
  const theme = useTheme();
  // const [user, setUser] = useAtom(UserData);
  const [loading, setLoading] = useState(false);
  const [user] = useAtom(persistentUserAtom)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal} height={height}>
          <YStack alignItems="center" paddingTop={5}>
            <SuccessIcon2 />
            <Text
              color={theme?.textSecondary?.val}
              paddingTop={15}
              fontFamily="$body"
              fontSize={16}
              fontWeight="500"
            >
              Welldone, {`${user?.firstName} ${user?.lastName}`}!
            </Text>
            <Text
              fontSize={24}
              fontFamily="$body"
              fontWeight="600"
              marginTop={13}
              textAlign="center"
              lineHeight={40}
              paddingHorizontal={20}
            >
              {title}
            </Text>
            <Text
              fontFamily="$body"
              fontWeight="500"
              color={theme?.black3}
              textAlign="center"
              fontSize={14}
              minWidth={"65%"}
              width={"69%"}
              lineHeight={20}
              marginTop={7}
            >
              {text}
            </Text>
            <Text
              fontFamily="$body"
              fontWeight="500"
              color={theme?.black3}
              textAlign="center"
              fontSize={14}
              maxWidth={"65%"}
              marginTop={15}
            >
              {text2}
            </Text>
            {info && (
              <XStack
                borderRadius={100}
                alignItems="center"
                justifyContent="center"
                gap={4}
                marginHorizontal="auto"
                width="88%"
                backgroundColor={theme?.lightGrey?.val}
                paddingVertical={20}
                paddingHorizontal={10}
                borderWidth={1}
                borderColor={theme?.black1?.val}
              >
                <Info />
                <Text
                  fontSize={16}
                  fontFamily="$body"
                  color={theme?.textSecondary?.val}
                  fontWeight={500}
                >
                  Verification takes 2-5 business days
                </Text>
              </XStack>
            )}
          </YStack>
          <View
            width={"88%"}
            marginHorizontal="auto"
            position="absolute"
            top={top}
            left="6%"
            gap={20}
          >
            <Button
              style={{ backgroundColor: theme?.black1?.val, height: 60 }}
              icon={icon}
              iconPosition={iconPosition}
              title={buttonTitle}
              onPress={onPress}
              textSize={14}
              disabled={loading || disabled}
            />
            {close && (
              <Button
                variant="outline"
                style={{ height: 60 }}
                icon={icon}
                iconPosition={iconPosition}
                title={closeButton as any}
                onPress={onReject}
                textSize={14}
                textColor={theme.black1?.val}
                disabled={loading || disabled}
              />
            )}
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
    paddingTop: 40,
    paddingBottom: 40,
    marginTop: "auto",
    marginBottom: "3%",
    borderRadius: 30,
    position: "relative",
  },
});
