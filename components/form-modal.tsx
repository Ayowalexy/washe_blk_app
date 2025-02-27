import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "./libs/view";
import { XStack, YStack, useTheme } from "tamagui";
import { Arrow, ArrowBack, CloseIcon, SuccessIcon2 } from "../utils/assets";
import { Text } from "./libs/text";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../src/constants";
import { Button } from "./button";
import { Children, Dispatch, ReactNode, SetStateAction } from "react";
import { useNavigation } from "@react-navigation/native";

type props = {
  children: ReactNode;
  goBack?: Boolean;
  button?: ReactNode;
  close: () => void;
  title: string;
  text: string;
  show_button?: boolean;
  visible: boolean;
  onGoBack?: () => void;
  setVisible: Dispatch<SetStateAction<boolean>>;
};
export const FormModal = ({
  children,
  goBack = false,
  button,
  close,
  title,
  text,
  show_button = true,
  visible,
  setVisible,
  onGoBack,
}: props) => {
  const theme = useTheme();
  const navigation = useNavigation();
  // console.log(visible, "Hello")
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <XStack style={goBack ? styles.iconContainer : styles.iconContainer2}>
          {goBack ? (
            <>
              <TouchableOpacity onPress={onGoBack}>
                <View style={styles.iconWrapper}>
                  <ArrowBack />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={close}>
                <View style={styles.iconWrapper}>
                  <CloseIcon />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={close}>
              <View style={styles.iconWrapper}>
                <CloseIcon />
              </View>
            </TouchableOpacity>
          )}
        </XStack>
        <View style={styles.modal}>
          <YStack alignItems="center" paddingTop={5}>
            <YStack
              justifyContent="center"
              alignItems="center"
              paddingHorizontal={22}
            >
              <Text
                color={"$black1"}
                fontSize={18}
                fontFamily="$body"
                fontWeight="500"
              >
                {title}
              </Text>
              <Text
                textAlign="center"
                color={"$black3"}
                fontSize={14}
                fontFamily="$body"
                fontWeight="500"
                marginTop={6}
                paddingHorizontal={10}
              >
                {text}
              </Text>
            </YStack>
            {children}
          </YStack>
          {show_button && <View style={styles.buttonContainer}>{button}</View>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    position: "relative",
    backgroundColor: "rgba(1, 40, 96, 0.4)",
  },
  modal: {
    width: "94%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#FFF",
    height: "75%",
    paddingTop: 40,
    paddingBottom: 100,
    marginTop: "auto",
    marginBottom: "3%",
    borderRadius: 30,
    position: "relative",
    overflow: "hidden",
  },
  iconContainer: {
    position: "absolute",
    top: 165,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginHorizontal: "auto",
    left: "5%",
  },
  iconContainer2: {
    position: "absolute",
    top: Platform.OS === "android" ? 130 : 165,
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "95%",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 50,
  },
  buttonContainer: {
    width: "88%",
    marginHorizontal: "auto",
    position: "absolute",
    bottom: 0,
    zIndex: 1000,
    left: "6%",
    backgroundColor: "#fff",
    paddingVertical: 30,
  },
});
