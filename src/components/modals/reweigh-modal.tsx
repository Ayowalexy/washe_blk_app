import { Modal, StyleSheet } from "react-native";
import { View } from "../../libs/View";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { SetStateAction, useAtom } from "jotai";
import { Dispatch } from "react";
import { useTheme, YStack } from "tamagui";
import { Text } from "../../libs/Text";
import { Button } from "../../libs/button";
import { ArrowLeft, Weigh } from "../../../assets/images/svg/icons";

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
};
export const ReweighModal = () => {
  const theme = useTheme();

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
              <Weigh />

              <Text color="textBlack" fontSize={22} fontWeight={600}>
                Reweigh Request
              </Text>
              <Text
                textAlign="center"
                color="$textSecondary"
                fontSize={16}
                fontWeight={500}
                marginVertical={8}
              >
                The customer has opted to reweigh the laundry load for a new
                price.
              </Text>
              <Button
                onPress={() => null}
                title="Reweigh"
                textColor={theme.white1 as any}
                textSize={14}
                icon={<ArrowLeft />}
                iconPosition="center"
                variant="outline"
                style={{ height: 60, backgroundColor: theme.black1?.val }}
              />
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
