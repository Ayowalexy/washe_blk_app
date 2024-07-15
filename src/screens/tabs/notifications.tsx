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
import { BottomTabParamList } from "../../../navigation/tabs.navigation";

type NotificationScreenProps = NativeStackScreenProps<
  BottomTabParamList,
  "notifications"
>;
export const NotificationsPage = ({ navigation }: NotificationScreenProps) => {
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
        <Text paddingTop={30}>Notifications</Text>
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
              {Array.isArray(requests) &&
                requests.map((request: any) => (
                  <View
                    key={request.id}
                    backgroundColor={theme?.lightGrey?.val}
                    paddingHorizontal={20}
                  >
                    <TouchableOpacity onPress={() => setOpenConfirmation(true)}>
                      <Request
                        top_img={false}
                        showImg={true}
                        width="100%"
                        status={request.status}
                        show={false}
                        time={request.date}
                        name={request.name}
                      />
                    </TouchableOpacity>
                    {request.id === Array.isArray(requests) &&
                    request.length ? null : (
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
        <SaveForm
          setOpenConfirmation={setOpenConfirmation}
          setPaymentModal={setPaymentModal}
        />
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
          <Button color="#00D158" title="Pay $40.00" onPress={() => null} />
        }
      >
        <PaymentForm />
      </FormModal>
    </View>
  );
};
