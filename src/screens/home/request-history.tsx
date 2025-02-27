import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { View } from "../../../components/libs/view";
import { Text } from "../../../components/libs/text";
import { ArrowBack } from "../../../utils/assets";
import { RequestFilter } from "../../../components/request-filter";
import { YStack, useTheme } from "tamagui";
import { PaymentForm, Request, SaveForm } from "../../../components/forms";
import { DEVICE_HEIGHT } from "../../constants";
import { FormModal } from "../../../components/form-modal";
import { useState } from "react";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { useGetRequests } from "../../../api/queries";
import moment from "moment";
import { useAtom } from "jotai";
import { LaundryRequests, laundryRequestServiceNameAtom } from "../../atoms";
import Toast from "react-native-toast-message";
import { useReMakeLaundryRequest } from "../../../api/mutations";

type RequestHistoryScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "home_stack"
>;
export const RequestHistory = ({ navigation }: RequestHistoryScreenProps) => {
  const theme = useTheme();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const { data: datas, refetch } = useGetRequests();
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);
  const [LaundryServiceName, setLaundryServiceName] = useAtom(
    laundryRequestServiceNameAtom
  );
  const [selected_payment_id, setSelectedPaymentId] = useState("");
  const [showModal, setShowModal] = useState(false);
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
        const { data: allRequests } = await refetch();
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
  const groupedRequests = datas.data?.reduce((acc: any, request: any) => {
    const date = moment(request.created_at).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(request);
    return acc;
  }, {});
  return (
    <View
      height={DEVICE_HEIGHT}
      backgroundColor={'$white1'}
      width="100%"
      paddingHorizontal={20}
      paddingVertical={80}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowBack width={24} height={24} />
        </TouchableOpacity>
        <Text paddingTop={30} fontSize={17}>Request History</Text>
        <RequestFilter />
        <YStack>
          <View>
            {groupedRequests &&
              Object.keys(groupedRequests).map((date) => (
                <View key={date}>
                  <Text
                    fontFamily="$body"
                    fontWeight="500"
                    style={{
                      fontSize: 15,
                      color: "$black3",
                      textTransform: "uppercase",

                      marginTop: 30,
                      marginBottom: 10,
                    }}
                  >
                    {moment(date).format("MMMM Do, YYYY")}
                  </Text>
                  {groupedRequests[date].map((request: any, index: any) => (
                    <View
                      key={request.id}
                      backgroundColor={theme?.lightGrey?.val}
                      paddingHorizontal={20}
                    >
                      {request?.transaction?.status === "success" ? (
                        <TouchableOpacity
                          onPress={() => {
                            setOpenConfirmation(true);
                            setOneLaundryRequest({
                              ...request,
                              LaundryServiceName:
                                request?.laundryRequestService?.name,
                              laundryRequestTypeId:
                                request.laundryRequestType?.id,
                              pickupDate: request.pickup_date,
                              pickupTime: request.pickup_date_time,
                              dyeColor: request.dye_color,
                              detergentType: request.detergent_type,
                              waterTemperature: request.water_temperature,
                            });
                            setLaundryServiceName(
                              request.laundryRequestService?.name
                            );
                            setSavedRequestId(request.id);
                          }}
                        >
                          <>
                            <Request
                              status={request.transaction?.status}
                              time={moment(request.created_at).format(
                                "hh:mm A"
                              )}
                              name={request.laundryRequestService.name}
                              show={false}
                            />
                            {index !== groupedRequests[date].length - 1 && (
                              <View
                                borderBottomWidth={1}
                                borderBottomColor="$black4"
                              />
                            )}
                          </>
                        </TouchableOpacity>
                      ) : request.status === "pending" ? (
                        <>
                          <Request
                            status={request?.status as any}
                            show={false}
                            name={request.laundryRequestService.name}
                            time={moment(request?.created_at).format("hh:mm A")}
                          />
                          {index !== groupedRequests[date].length - 1 && (
                            <View
                              borderBottomWidth={1}
                              borderBottomColor="$black4"
                            />
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </View>
                  ))}
                </View>
              ))}
          </View>
        </YStack>
      </ScrollView>
      <FormModal
        visible={openConfirmation}
        setVisible={setOpenConfirmation}
        button={
          <Button
            title="Re-request"
            onPress={() => {
              handleRemakeRequest();
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
            title={`Pay ${oneLaundryRequest?.total_amount}.00`}
            onPress={() => {
              setPaymentModal(false);
              navigation.navigate("home_stack", {
                screen: "payment_successful",
              });
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
  );
};
