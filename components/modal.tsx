import { Modal, StyleSheet } from "react-native";
import { View } from "./libs/view";
import { YStack, useTheme } from "tamagui";
import { SuccessIcon2 } from "../utils/assets";
import { Text } from "./libs/text";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../src/constants";
import { Button } from "./button";

type props = {
  title: string;
  text: string;
  text2?: string;
  onPress: () => void;
  disabled?: boolean;
};
export const SuccessModal = ({
  title,
  text,
  text2,
  onPress,
  disabled = false,
}: props) => {
  const theme = useTheme();
  return (
    <Modal transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <YStack alignItems="center" paddingTop={5}>
            <SuccessIcon2 />
            <Text
              fontSize={16}
              color={theme?.black1}
              paddingTop={15}
              fontFamily="$body"
              fontWeight="500"
            >
              Welldone, Karen James!
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
              color={theme?.black3}
              textAlign="center"
              fontSize={14}
              minWidth={"65%"}
              width={"69%"}
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
          </YStack>
          <View
            width={"88%"}
            marginHorizontal="auto"
            position="absolute"
            top="95%"
            left="6%"
          >
            <Button title="Done" onPress={onPress} disabled={disabled} />
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
