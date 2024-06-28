import { YStack } from "tamagui";
import { Text } from "../libs/text";
import { View } from "../libs/view";
import { FlatList } from "react-native";
import { EmptyRequest } from "../empty-request";
import { DEVICE_WIDTH } from "../../src/constants";
import { LaundryRequests } from "../laundry-request";
import { RequestCard } from "../request-card";
import { useGetRequests } from "../../api/queries";
import moment from "moment";
import { Dispatch } from "react";
import { SetStateAction } from "jotai";
import { FormModal } from "../form-modal";
import { Button } from "../button";
import { PaymentForm } from "./payment-modal";

type props = {
  paymentModal: boolean;
  setPaymentModal: Dispatch<SetStateAction<boolean>>;
};
export const OngoingRequests = ({ paymentModal, setPaymentModal }: props) => {
  const { refetch, data } = useGetRequests();
  const itemWidth =
    data?.data?.length === 1 ? DEVICE_WIDTH - 80 : DEVICE_WIDTH * 0.56;
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
          data={data?.data?.filter((elem: any) => elem.status === "pending")}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View width={itemWidth}>
              <RequestCard
                onPress={() => {
                  setPaymentModal(true);
                }}
                text={"Your laundry request is currently pending"}
                status={item?.status as any}
                date={moment(item?.created_at).format("Do MMM YYYY, hh:mm A")}
              />
            </View>
          )}
        />
        <View>
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
                title="Pay $40.00"
                onPress={() => {
                  // setPaymentModal(false);
                  // navigation.navigate("home_stack", {
                  //   screen: "payment_successful",
                  // });
                }}
              />
            }
          >
            <PaymentForm />
          </FormModal>
        </View>
      </View>
    </YStack>
  );
};
