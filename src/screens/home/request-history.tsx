import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { View } from "../../../components/libs/view";
import { Text } from "../../../components/libs/text";
import { ArrowBack } from "../../../utils/assets";
import { RequestFilter } from "../../../components/request-filter";
import { YStack, useTheme } from "tamagui";
import { PaymentForm, Request, SaveForm } from "../../../components/forms";
import {
  LaundryRequests,
  groupedLaundryRequests,
} from "../../../components/laundry-request";
import { DEVICE_HEIGHT } from "../../constants";
import { FormModal } from "../../../components/form-modal";
import { useState } from "react";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";

type RequestHistoryScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "home_stack"
>;
export const RequestHistory = ({ navigation }: RequestHistoryScreenProps) => {
  const theme = useTheme();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  return (
    <View
      height={DEVICE_HEIGHT}
      backgroundColor={theme?.white1?.val}
      width="100%"
      paddingHorizontal={20}
      paddingVertical={80}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArrowBack width={24} height={24} />
        <Text paddingTop={30}>Request History</Text>
        <RequestFilter />
        <YStack>
          {Object.entries(groupedLaundryRequests).map(([date, requests]) => (
            <View key={date}>
              <Text
                fontSize={13}
                color={theme?.black3?.val}
                paddingVertical={20}
                textTransform="uppercase"
              >
                {date}
              </Text>
              {requests.map((request: any) => (
                <View
                  key={request.id}
                  backgroundColor={theme?.lightGrey?.val}
                  paddingHorizontal={20}
                >
                  <TouchableOpacity onPress={() => setOpenConfirmation(true)}>
                    <Request
                      img={request.img}
                      time={request.date}
                      name={request.name}
                    />
                  </TouchableOpacity>
                  {request.id === requests.length ? null : (
                    <View borderBottomWidth={1} borderBottomColor="$black4" />
                  )}
                </View>
              ))}
            </View>
          ))}
        </YStack>
      </ScrollView>
      <FormModal
        visible={openConfirmation}
        setVisible={setOpenConfirmation}
        button={
          <Button
            title="Proceed"
            onPress={() => {
              setOpenConfirmation(false);
              setPaymentModal(true);
            }}
          />
        }
        show_button={true}
        close={() => setOpenConfirmation(false)}
        title="Request History"
        text="View details of your previous requests."
      >
        <SaveForm />
      </FormModal>

      <FormModal
        visible={paymentModal}
        setVisible={setPaymentModal}
        goBack={true}
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
              setPaymentModal(false);
              navigation.navigate("home_stack", {
                screen: "payment_successful",
              });
            }}
          />
        }
      >
        <PaymentForm />
      </FormModal>
    </View>
  );
};
