import { Dispatch, useState } from "react";
import { Text } from "../../libs/Text";
import { View } from "../../libs/View";
import { UserCard } from "../cards/user-card";
import { PickUpCard } from "../cards/pickup-card";
import { PaymentDetails } from "../cards/payment-details";
import { useTheme, XStack, YStack } from "tamagui";
import { Button } from "../../libs/button";
import { Modal, StyleSheet } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { SetStateAction, useAtom } from "jotai";
import { oneAcceptedRequestAtom, requestTypeAtom } from "../../atoms";
import { useNavigation } from "@react-navigation/native";
import { useAcceptPickupRequest } from "../../../api/mutation";
import Toast from "react-native-toast-message";

type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  showSuccessModal: boolean;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
};
export const CustomerInfoModal = ({
  show,
  setShow,
  visible,
  setVisible,
  setShowSuccessModal,
  showSuccessModal,
}: Props) => {
  const theme = useTheme();
  const [isAccepted, setIsAccepted] = useState(true);
  const [completePickup, setCompletePickup] = useState(false);
  const [updatePricing, setUpdatePricing] = useState(false);
  const [price, setPrice] = useState("");
  const [requestType, setRequestType] = useAtom(requestTypeAtom);
  const [accepted] = useAtom(oneAcceptedRequestAtom);
  const { mutate, isPending } = useAcceptPickupRequest();

  const handlePickUpAccepted = async () => {
    const resp = {
      riderRequestId: accepted?.id,
    };
    mutate(resp, {
      onSuccess: async (data) => {
        console.log(data);
        Toast.show({
          type: "customSuccess",
          text1: "Request Accepted Successfully",
        });
        setIsAccepted(false);
        setCompletePickup(true);
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
  const handleDeliveryAccepted = () => {};

  const handlePickup = () => {
    setCompletePickup(false);
    setUpdatePricing(true);
  };

  const handlePricing = () => {
    if (price) {
      const resp = {
        riderRequestId: accepted?.id,
        fee: Number(price),
      };
      mutate(resp, {
        onSuccess: async (data) => {
          console.log(data);
          Toast.show({
            type: "customSuccess",
            text1: "Price Updated Successfully",
          });
          setVisible(false);
          setShow(true);
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
    }
  };
  const navigation = useNavigation();
  console.log(updatePricing, "updatePricing");
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal} height="auto">
          <View paddingBottom={40}>
            <View>
              {/* <View
            marginTop={10}
            marginBottom={14}
            backgroundColor={theme["warning/50"]?.val}
            padding={8}
            width={110}
            borderRadius={100}
          >
            <XStack alignItems="center" gap={7} justifyContent="center">
              <BusFilled />
              <Text
                fontSize={12}
                color={theme["warning/700"]?.val}
                fontWeight={500}
              >
                In Transit
              </Text>
            </XStack>
          </View> */}
              <Text
                color="$black3"
                fontSize={12}
                fontFamily="$body"
                marginBottom={8}
                fontWeight={500}
              >
                Customer's Information
              </Text>
              <UserCard
                firstName={accepted.firstName}
                lastName={accepted.lastName}
                location={accepted.location}
                estimatedTime={accepted.estimatedTime}
              />
              {updatePricing || (requestType === "pick-up" && <PickUpCard />)}
              {!updatePricing || (requestType === "dropoff" && <PickUpCard />)}

              <PaymentDetails
                amount={accepted?.amount}
                baseFee={accepted?.baseFee}
                setPrice={setPrice}
                price={price}
                updatePricing={updatePricing}
              />
              {isAccepted && (
                <XStack
                  gap={10}
                  marginTop={25}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    onPress={() => navigation.goBack()}
                    title="Reject"
                    textColor={theme.black1 as any}
                    textSize={14}
                    variant="outline"
                    style={{ width: "48%", height: 60 }}
                  />
                  <Button
                    onPress={() => handlePickUpAccepted()}
                    title="Accept"
                    isLoading={isPending}
                    textColor={theme.white1 as any}
                    textSize={14}
                    style={{
                      backgroundColor: theme.black1?.val,
                      width: "48%",
                      height: 60,
                    }}
                  />
                </XStack>
              )}
              {completePickup && (
                <YStack
                  gap={15}
                  marginTop={25}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    onPress={() => handlePickup()}
                    title="Slide to complete pickup"
                    textColor={theme.black1 as any}
                    textSize={14}
                    variant="outline"
                    style={{ height: 60, backgroundColor: theme.black4?.val }}
                  />
                  <Button
                    onPress={() => null}
                    title="End trip"
                    variant="outline"
                    textColor={theme.black1?.val as any}
                    textSize={14}
                    style={{
                      height: 60,
                    }}
                  />
                </YStack>
              )}
              {updatePricing && requestType !== "dropoff" && (
                <Button
                  onPress={() => handlePricing()}
                  title="Update pricing"
                  textColor={theme.white1 as any}
                  textSize={14}
                  isLoading={isPending}
                  disabled={!price}
                  style={{
                    height: 60,
                    marginTop: 15,
                    backgroundColor: !price
                      ? theme.disabled?.val
                      : theme.black1?.val,
                  }}
                />
              )}
              {requestType === "dropoff" && (
                <YStack marginVertical={20} gap={14}>
                  <Button
                    onPress={() => {
                      setVisible(false);
                      setShowSuccessModal(true);
                    }}
                    title="Slide to complete drop-off"
                    textColor={theme.black1 as any}
                    textSize={14}
                    variant="outline"
                    style={{ height: 60, backgroundColor: theme.black4?.val }}
                  />
                  <Button
                    onPress={() => null}
                    title="End trip"
                    variant="outline"
                    textColor={theme.black1?.val as any}
                    textSize={14}
                    style={{
                      height: 60,
                    }}
                  />
                </YStack>
              )}
            </View>
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
    backgroundColor: "transparent",
  },
  modal: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingHorizontal: 20,
    marginTop: "auto",
    borderRadius: 30,
    position: "relative",
  },
});
