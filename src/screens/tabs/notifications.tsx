import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "../../../components/libs/view";
import { Text } from "../../../components/libs/text";
import { ArrowBack } from "../../../utils/assets";
import { RequestFilter } from "../../../components/request-filter";
import { XStack, YStack, useTheme } from "tamagui";
import { PaymentForm, Request, SaveForm } from "../../../components/forms";
import { groupedLaundryRequests } from "../../../components/laundry-request";
import { DEVICE_HEIGHT } from "../../constants";
import { FormModal } from "../../../components/form-modal";
import { useCallback, useState } from "react";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { BottomTabParamList } from "../../../navigation/tabs.navigation";
import { useGetNotifications } from "../../../api/queries";
import moment from "moment";
import {
  useMakePayment,
  useRejectPrice,
  useReMakeLaundryRequest,
} from "../../../api/mutations";
import Toast from "react-native-toast-message";
import { useAtom } from "jotai";
import { LaundryRequests } from "../../atoms";
import {
  BankIcon,
  InfoIcon,
  NoteIcon,
  OngoingIcon,
} from "../../../assets/images/svg/icons";
import { Info } from "../../../assets/images/svg/icons/info";

type NotificationScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "home_stack"
>;
export const NotificationsPage = ({ navigation }: NotificationScreenProps) => {
  const theme = useTheme();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [selected_payment_id, setSelectedPaymentId] = useState("");
  const { mutateAsync, isPending: loading } = useMakePayment();
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);

  const { data, refetch } = useGetNotifications();
  console.log(data, "notificationsuE");

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
  const { mutate: rejectPrice, isPending: isRejected } = useRejectPrice();

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
  const handleMayPayment = useCallback(async () => {
    console.log("handleMayPayment triggered");
    try {
      const payload = {
        laundryRequestId: oneLaundryRequest.laundryRequestId as string,
        paymentMethodId: selected_payment_id,
        type: "laundry_fee",
      };

      console.log(payload, "Payload being sent");

      const response = await mutateAsync(payload);
      console.log(response, "responsee");

      setPaymentModal(false);
      navigation.navigate("home_stack", {
        screen: "payment_successful",
      });
    } catch (error: any) {
      console.log(error.response?.data || error.message, "error response");
    }
  }, [selected_payment_id, oneLaundryRequest]);

  const handleRejectPrice = (id: string) => {
    const requestId = {
      laundryRequestId: id,
    };

    rejectPrice(requestId, {
      onSuccess: async (data) => {
        Toast.show({
          type: "customSuccess",
          text1: "price rejected successfully",
        });
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
      backgroundColor={"$white1"}
      width="100%"
      paddingHorizontal={5}
      paddingVertical={80}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text paddingTop={30} fontSize={18}>
          Notifications
        </Text>
        <YStack marginTop={20}>
          {data?.data?.map((request: any, index: any) => (
            <View
              key={request.id}
              backgroundColor={theme?.lightGrey?.val}
              paddingHorizontal={20}
            >
              <TouchableOpacity
                onPress={() => {
                  // setSavedRequestId(request.id);
                  // setOpenConfirmation(true)
                }}
              >
                <XStack paddingVertical={15} alignItems="flex-start" gap={15}>
                  {request.title === "ongoing laundry request" ? (
                    <View style={styles.image}>
                      <OngoingIcon />
                    </View>
                  ) : request.title === "Payment Approval" ? (
                    <View style={styles.image}>
                      <BankIcon />
                    </View>
                  ) : (
                    <View style={styles.image}>
                      <NoteIcon />
                    </View>
                  )}
                  <YStack marginTop={5}>
                    <Text fontFamily="$body" fontSize={16}>
                      {request.title !== "ongoing laundry request" &&
                      request.title !== "Payment Approval"
                        ? "Pending Laundry Request"
                        : request.title}
                    </Text>
                    <Text
                      fontFamily="$body"
                      fontSize={14}
                      width={"65%"}
                      marginTop={12}
                      color="$black3"
                    >
                      {request.description}
                    </Text>
                    {request.description.includes("New Amount") && (
                      <YStack width={"72%"} marginTop={15}>
                        <XStack
                          gap={5}
                          backgroundColor={theme.secondary3?.val}
                          paddingHorizontal={10}
                          paddingVertical={10}
                        >
                          <InfoIcon />
                          <Text
                            textAlign="justify"
                            width={"80%"}
                            fontFamily="$body"
                            fontSize={14}
                            color="$secondary10"
                          >
                            {`You will be charged only $${request.fee} for this order once you accept`}
                          </Text>
                        </XStack>
                        <XStack
                          width={"100%"}
                          marginHorizontal={"auto"}
                          gap={8}
                          marginTop={15}
                        >
                          <Button
                            height={45}
                            color="$primary3"
                            title="Accept"
                            loading={loading}
                            onPress={() => {
                              setPaymentModal(true);
                              setOneLaundryRequest({
                                ...oneLaundryRequest,
                                tax: 0,
                                total_amount: request?.fee,
                                laundryRequestId: request?.laundryRequestId,
                              });
                            }}
                            style={{ width: "50%", height: 20 }}
                          />
                          <Button
                            height={45}
                            color="#transparent"
                            textColor="$black3"
                            title="Reject"
                            onPress={() =>
                              handleRejectPrice(request?.laundryRequestId)
                            }
                            style={{
                              width: "50%",
                              borderWidth: 0.5,
                              borderColor: "#6C8693",
                              borderRadius: 30,
                            }}
                          />
                        </XStack>
                      </YStack>
                    )}
                  </YStack>
                </XStack>
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
        onGoBack={() => {
          setPaymentModal(false);
          setOpenConfirmation(true);
        }}
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
          setPaymentModal={setPaymentModal}
          setSelectedPaymentId={setSelectedPaymentId}
          selected_payment_id={selected_payment_id}
        />
      </FormModal>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: "#DCEAFE",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  text: {
    display: "flex",
  },
  text2: {
    display: "none",
    height: 0,
  },
});
