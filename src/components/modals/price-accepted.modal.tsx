import { Modal, StyleSheet } from "react-native";
import { View } from "../../libs/View";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { SetStateAction, useAtom } from "jotai";
import { Dispatch } from "react";
import { useTheme, YStack } from "tamagui";
import { Text } from "../../libs/Text";
import { SuccessIcon2 } from "../../utils/assets";
import { Button } from "../../libs/button";
import { oneAcceptedRequestAtom, requestTypeAtom } from "../../atoms";
import { useUpdateStatus } from "../../../api/mutation";
import Toast from "react-native-toast-message";

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
};
export const PriceAcceptedModal = ({
  setShowModal,
  showModal,
  setVisible,
}: Props) => {
  const theme = useTheme();
  const [requestType, setRequestType] = useAtom(requestTypeAtom);
  const [accepted] = useAtom(oneAcceptedRequestAtom);
  const { mutate, isPending } = useUpdateStatus();
  console.log(accepted, "acce");

  const handleChangeStatus = async () => {
    const resp = {
      riderRequestId: accepted.id,
      status: "drop_off",
    };
    mutate(resp, {
      onSuccess: async (data) => {
        console.log(data);
        Toast.show({
          type: "customSuccess",
          text1: "Dropoff started Successfully",
        });
        setShowModal(false);
        setVisible(true);
        setRequestType("drop_off");
      },
      onError: (error: any) => {
        Toast.show({
          type: "customError",
          text1:
            error?.response?.data.message || "An error occurred, try again",
        });
        console.log(error?.response?.data, "rrr");
      },
    });
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal} height="auto">
            <YStack justifyContent="center" alignItems="center" gap={12}>
              <SuccessIcon2 />
              <Text
                fontFamily="$body"
                fontSize={16}
                fontWeight={500}
                color="textSecondary"
              >
                Alright, Deshawn!
              </Text>
              <Text
                fontFamily="$body"
                color="textBlack"
                fontSize={22}
                fontWeight={600}
              >
                Price accepted
              </Text>
              <Text
                textAlign="center"
                color="$textSecondary"
                fontSize={16}
                fontWeight={500}
                fontFamily="$body"
              >
                The customer has accepted the reviewed price. You can begin
                drop-off.
              </Text>
              <Button
                onPress={() => {
                 handleChangeStatus()
                }}
                title="Slide to begin drop-off"
                textColor={theme.black1 as any}
                textSize={14}
                variant="outline"
                style={{
                  height: 60,
                  backgroundColor: theme.black4?.val,
                  marginTop: 20,
                }}
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
