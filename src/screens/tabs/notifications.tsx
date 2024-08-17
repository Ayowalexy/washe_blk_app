import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { View } from "../../../components/libs/view";
import { Text } from "../../../components/libs/text";
import { ArrowBack } from "../../../utils/assets";
import { RequestFilter } from "../../../components/request-filter";
import { YStack, useTheme } from "tamagui";
import { PaymentForm, Request, SaveForm } from "../../../components/forms";
import {
  groupedLaundryRequests,
} from "../../../components/laundry-request";
import { DEVICE_HEIGHT } from "../../constants";
import { FormModal } from "../../../components/form-modal";
import { useState } from "react";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { BottomTabParamList } from "../../../navigation/tabs.navigation";
import { useGetNotifications } from "../../../api/queries";
import moment from "moment";
import { useReMakeLaundryRequest } from "../../../api/mutations";
import Toast from "react-native-toast-message";
import { useAtom } from "jotai";
import { LaundryRequests } from "../../atoms";

type NotificationScreenProps = NativeStackScreenProps<
  BottomTabParamList,
  "notifications"
>;
export const NotificationsPage = ({ navigation }: NotificationScreenProps) => {
  const theme = useTheme();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);

  const { data, refetch } = useGetNotifications();
  console.log(data?.data, "notifications");

  const groupedRequests = data?.data?.reduce((acc: any, request: any) => {
    const date = moment(request.createdAt).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(request);
    return acc;
  }, {});

  const [savedRequestId, setSavedRequestId] = useState("");
  const { mutate: Remake, isPending: isLoading } = useReMakeLaundryRequest();

  const handleRemakeRequest = () => {
    const requestId = {
      laundryRequestId: savedRequestId,
    };
    Remake(requestId, {
      onSuccess: async (data) => {
        Toast.show({
          type: "customSuccess",
          text1: "Request re-made successfully",
        });
        console.log(data.data.data, "dataaa");
        setOpenConfirmation(false);
        setPaymentModal(true);
        setOneLaundryRequest({
          ...oneLaundryRequest,
          tax: 0,
          total_amount: data?.data?.data.amount ?? 0,
          laundryRequestId: data?.data?.data?.id,
        });
        const { data: allNotifications } = await refetch();
      },
      onError: (error: any) => {
        Toast.show({
          type: "customError",
          text1:
            JSON.stringify(error?.response?.data) ||
            "An error occured, try again",
        });
        console.log(error.response.data, "rrr");
      },
    });
  };
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
        <YStack marginTop={20}>
          {/* {groupedRequests &&
            Object.keys(groupedRequests).map((date) => (
              <View key={date}>
                <Text
                  fontSize={13}
                  color={theme?.black3?.val}
                  paddingVertical={20}
                  textTransform="uppercase"
                >
                  {date}
                </Text>
                {groupedRequests[date].map((request: any, index: any) => (
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
                    {index !== groupedRequests[date].length - 1 && (
                      <View borderBottomWidth={1} borderBottomColor="$black4" />
                    )}
                  </View>
                ))}
              </View>
            ))} */}
          {data?.data.map((request: any, index: any) => (
            <View
              key={request.id}
              backgroundColor={theme?.lightGrey?.val}
              paddingHorizontal={20}
            >
              <TouchableOpacity onPress={() => {
                // setSavedRequestId(request.id);
                // setOpenConfirmation(true)
              }}>
                <Request
                  top_img={true}
                  showImg={false}
                  width="100%"
                  status={request.status}
                  show={true}
                  time={moment(request.createdAt).format('Do MMM YY, hh:mm A')}
                  name={request.title}
                />
              </TouchableOpacity>
              {index !== data.data.length - 1 && (
                <View borderBottomWidth={1} borderBottomColor="$black4" />
              )}
            </View>
          ))}
        </YStack>
      </ScrollView>
      <FormModal
        visible={openConfirmation}
        setVisible={setOpenConfirmation}
        button={
          <Button
            title="Re-request"
            onPress={() => {
              handleRemakeRequest()
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
          <Button color="#00D158" title="Pay $40.00" onPress={() => null} />
        }
      >
        <PaymentForm />
      </FormModal>
    </View>
  );
};
