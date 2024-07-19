import { YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { View } from "../libs/view";
import { FlatList } from "react-native";
import { EmptyRequest } from "../empty-request";
import { DEVICE_WIDTH } from "../../src/constants";
import { RequestCard } from "../request-card";
import { useGetRequests } from "../../api/queries";
import moment from "moment";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { SetStateAction, useAtom } from "jotai";
import { FormModal } from "../form-modal";
import { Button } from "../button";
import { PaymentForm } from "./payment-modal";
import { useMakePayment } from "../../api/mutations";
import {
  LaundryRequests,
  laundryRequestServiceNameAtom,
} from "../../src/atoms";
import { useNavigation } from "@react-navigation/native";
import { TrackForm } from "./track-form";
import axios from "axios";

type props = {
  paymentModal: boolean;
  openTracking: boolean;
  setPaymentModal: Dispatch<SetStateAction<boolean>>;
  setOpenConfirmation: Dispatch<SetStateAction<boolean>>;
  setOpenTracking: Dispatch<SetStateAction<boolean>>;
};
export const OngoingRequests = ({
  paymentModal,
  setOpenConfirmation,
  setPaymentModal,
  setOpenTracking,

  openTracking,
}: props) => {
  const theme = useTheme();
  const { refetch, data, isError } = useGetRequests();
console.log(data, '---')
  const navigation = useNavigation<any>();
  const itemWidth =
    data?.data?.length === 1 ? DEVICE_WIDTH - 80 : DEVICE_WIDTH * 0.56;
  const [selected_payment_id, setSelectedPaymentId] = useState("");
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);
  const { mutateAsync, isPending: loading } = useMakePayment();
  const [LaundryServiceName, setLaundryServiceName] = useAtom(
    laundryRequestServiceNameAtom
  );
  const [trackDetails, setTrackdetails] = useState([]);

  const handleMayPayment = useCallback(async () => {
    try {
      const response = await mutateAsync({
        laundryRequestId: oneLaundryRequest.laundryRequestId as string,

        paymentMethodId: selected_payment_id,
      });
      console.log(response, "responsee");
      setPaymentModal(false);
      navigation.navigate("home_stack", {
        screen: "payment_successful",
      });
    } catch (e) {
      console.log(e);
    }
  }, [selected_payment_id, oneLaundryRequest]);

  return (
    <YStack
      backgroundColor="$secondary8"
      marginTop={20}
      height="auto"
      padding={15}
      paddingTop={25}
      paddingBottom={0}
      borderRadius={15}
    >
      <Text>Ongoing Requests</Text>
      <View>
        <FlatList
          ListEmptyComponent={<EmptyRequest />}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ width: DEVICE_WIDTH, paddingBottom: 30 }}
          contentContainerStyle={{ gap: 15 }}
          data={data?.data?.filter(
            (elem: any) => elem?.transaction?.status === "success"
          )}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View width={itemWidth}>
              <RequestCard
                onPress={() => {
                  setOpenTracking(true);
                  setOneLaundryRequest({
                    ...item,
                    laundryRequestTypeId: item.laundryRequestType.id,
                  });
                  setLaundryServiceName(item.laundryRequestService.name);
                  setTrackdetails(item.requestTrackingLogs);
                }}
                text={"Your laundry request is currently being processed"}
                status={item?.status as any}
                date={moment(item?.created_at).format("Do MMM YYYY, hh:mm A")}
              />
            </View>
          )}
        />
        <View>
          <FormModal
            visible={openTracking}
            setVisible={setOpenTracking}
            show_button={false}
            close={() => setOpenTracking(false)}
            title="Track Request"
            text="View status updates of your laundry request."
          >
            <TrackForm trackDetails={trackDetails} />
            <View
              width={"100%"}
              height="auto"
              padding={20}
              marginTop={27}
              borderWidth={1}
              borderRadius={12}
              borderColor={theme?.black4?.val}
            >
              <Text color={theme?.primary2?.val} fontSize={15}>
                Request Tracking
              </Text>
            </View>
          </FormModal>
          <FormModal
            visible={paymentModal}
            setVisible={setPaymentModal}
            goBack={false}
            title="Payment"
            text="To confirm please select your preferred payment method"
            close={() => {
              setPaymentModal(false);
            }}
            button={
              <Button
                color="#00D158"
                title={`Pay $${
                  Number(oneLaundryRequest?.tax ?? 0) +
                  Number(oneLaundryRequest?.total_amount ?? 0)
                }`}
                loading={loading}
                disabled={!Boolean(selected_payment_id)}
                onPress={() => {
                  handleMayPayment();
                }}
              />
            }
          >
            <PaymentForm
              setSelectedPaymentId={setSelectedPaymentId}
              selected_payment_id={selected_payment_id}
            />
          </FormModal>
        </View>
      </View>
    </YStack>
  );
};
