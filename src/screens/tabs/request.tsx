import { XStack, useTheme } from "tamagui";
import {
  NewLaundryRequest,
  OngoingRequests,
  PaymentForm,
  Request,
  RequestForm,
  SaveForm,
} from "../../../components/forms";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { TabLayout } from "../../../components/tab-layout";
import { Arrow, PlusIcon } from "../../../utils/assets";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { LaundryRequests as laundry } from "../../../components/laundry-request";
import { EmptyRequest } from "../../../components/empty-request";
import { AntDesign } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { FormModal } from "../../../components/form-modal";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { RequestFilter } from "../../../components/request-filter";
import { useGetLaundryServices, useGetRequests } from "../../../api/queries";
import { useAtom } from "jotai";
import { LaundryRequests } from "../../atoms";
import { useMakeLaundryRequest } from "../../../api/mutations";
import Toast from "react-native-toast-message";
import { useMakePayment } from "../../../api/mutations";
import moment from "moment";
import ToggleSwitch from "toggle-switch-react-native";

type RequestScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "home_stack"
>;

export const Requests = ({ navigation }: RequestScreenProps) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);
  const { mutate, isPending } = useMakeLaundryRequest();
  const { refetch } = useGetRequests();
  const [selected_payment_id, setSelectedPaymentId] = useState("");
  const { mutateAsync, isPending: loading } = useMakePayment();
  const { data } = useGetLaundryServices();
  const { data: datas } = useGetRequests();
  const [openTracking, setOpenTracking] = useState(false);

  const handleOpenRequest = () => {
    setOpenModal(false);
    setOpenRequest(true);
  };

  const handleOpenConfirmation = () => {
    setOpenRequest(false);
    setOpenConfirmation(true);
  };

  const handleProceedPayment = () => {
    setOpenConfirmation(false);
    setPaymentModal(true);
  };

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

  const [saveRequest, setSaveRequest] = useState(false);
  const toggleSwitch = () => setSaveRequest((previousState) => !previousState);

  const handleSubmit = () => {
    const request = {
      laundryRequestServiceId: oneLaundryRequest.laundryRequestServiceId,
      laundryRequestTypeId: oneLaundryRequest.laundryRequestTypeId,
      pickupDate: oneLaundryRequest.pickupDate,
      pickupTime: oneLaundryRequest.pickupTime,
      detergentType: oneLaundryRequest.detergentType,
      waterTemperature: oneLaundryRequest.waterTemperature,
      timeframe: oneLaundryRequest.timeframe,
      softener: oneLaundryRequest.softener,
      bleach: oneLaundryRequest.bleach,
      dye: oneLaundryRequest.dye,
      dyeColor: oneLaundryRequest.dyeColor,
      saveRequest
    };
    mutate(request, {
      onSuccess: async (data) => {
        Toast.show({
          type: "customSuccess",
          text1: "Request created successfully",
        });
        console.log(data?.data?.data?.id, "data?.data?.data?.id");
        setOpenConfirmation(false);
        setPaymentModal(true);
        setOneLaundryRequest({
          ...oneLaundryRequest,
          tax: 0,
          total_amount: data?.data?.data?.amount ?? 0,
          laundryRequestId: data?.data?.data?.id,
        });
        const { data: allRequests } = await refetch();
        console.log("All Requests:", allRequests);
      },
      onError: (error: any) => {
        Toast.show({
          type: "customError",
          text1:
            JSON.stringify(error?.response?.data) ||
            "An error occured, try again",
        });
        console.log(error?.response?.data, "rrr");
      },
    });
  };
  return (
    <>
      <TabLayout>
        <View paddingBottom={70}>
          <OngoingRequests
            openTracking={openTracking}
            setOpenTracking={setOpenTracking}
            setPaymentModal={setPaymentModal}
            paymentModal={paymentModal}
            setOpenConfirmation={setOpenConfirmation}
          />
          <View
            position="relative"
            backgroundColor={theme?.secondary8?.val}
            marginTop={30}
            paddingHorizontal={15}
            paddingVertical={20}
          >
            <XStack justifyContent="space-between">
              <Text
                fontSize={14}
                fontWeight={"600"}
                fontFamily="$body"
                color={theme?.primary2?.val}
              >
                Request History
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("home_stack", {
                    screen: "request_history",
                  })
                }
              >
                <XStack alignItems="center" gap={3}>
                  <Text
                    color={theme?.primary3?.val}
                    fontWeight={400}
                    fontSize={12}
                  >
                    View all
                  </Text>
                  <Arrow color={theme?.primary3?.val} />
                </XStack>
              </TouchableOpacity>
            </XStack>
            {datas?.data?.length > 1 && (
              <>
                <RequestFilter />
                <Text
                  textTransform="uppercase"
                  fontSize={12}
                  marginTop={18}
                  color={theme?.black3?.val}
                >
                  25th Jun 2023
                </Text>
              </>
            )}
            <FlatList
              data={datas?.data
                ?.filter((elem: any) => elem.status === "pending")
                .slice(0, 3)}
              ListEmptyComponent={
                <EmptyRequest
                  onPress={() => setOpenModal(true)}
                  backgroundColor={theme?.primary3?.val}
                  color={theme?.white1?.val}
                  borderColor={theme?.primary3?.val}
                />
              }
              renderItem={({ item }) => (
                <View>
                  <Request
                    status={item?.status as any}
                    show={false}
                    name={item.laundryRequestService.name}
                    time={moment(item?.created_at).format(
                      "Do MMM YYYY, hh:mm A"
                    )}
                  />
                  {item.id !== datas.data[datas.data.length - 1].id && (
                    <View borderBottomWidth={1} borderBottomColor="$black4" />
                  )}
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </TabLayout>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpenModal(true)}
      >
        <View
          backgroundColor={theme?.primary3?.val}
          height={56}
          width={56}
          justifyContent="center"
          alignItems="center"
          borderRadius={100}
        >
          <PlusIcon />
        </View>
      </TouchableOpacity>

      <FormModal
        visible={openModal}
        setVisible={setOpenModal}
        button={
          <XStack width="98%" marginHorizontal="auto" gap={16}>
            <View width="47%">
              <Button
                title="Cancel"
                color={theme?.white1?.val}
                textColor={theme?.black3?.val}
                style={{
                  borderWidth: 1,
                  borderColor: theme?.accent4?.val,
                  borderRadius: 100,
                }}
                onPress={() => setOpenModal(false)}
              />
            </View>
            <View width="47%">
              <Button title="Next" onPress={handleOpenRequest} />
            </View>
          </XStack>
        }
        close={() => setOpenModal(false)}
        title="New Laundry Request"
        text="Start a new request by letting us know what services you need"
      >
        <NewLaundryRequest data={data?.data} />
      </FormModal>

      <FormModal
        visible={openRequest}
        setVisible={setOpenRequest}
        show_button={false}
        close={() => setOpenRequest(false)}
        title="New Laundry Request"
        text="Start a new request by letting us know what services you need"
      >
        <RequestForm setOpenConfirmation={handleOpenConfirmation} />
      </FormModal>

      <FormModal
        visible={openConfirmation}
        setVisible={setOpenConfirmation}
        show_button={true}
        button={
          <View paddingTop={0}>
          <XStack gap={8} marginBottom={20}>
            <ToggleSwitch
              isOn={saveRequest}
              onColor="#00D158"
              offColor="#F9FAFB"
              labelStyle={{ color: "black", fontWeight: "900" }}
              size="small"
              onToggle={toggleSwitch}
            />
            <TouchableOpacity onPress={() => toggleSwitch()}>
              <Text color={theme?.black1?.val} fontSize={14}>
                Save request to be used in the future
              </Text>
            </TouchableOpacity>
          </XStack>
          <Button
            loading={isPending}
            title="Proceed"
            onPress={() => handleSubmit()}
          />
        </View>
        }
        
        close={() => setOpenConfirmation(false)}
        title="Confirmation"
        text="Please make sure services selected are correct before confirming."
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
            title={`Pay $${Number(oneLaundryRequest?.tax ?? 0) +
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
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: "89%",
    right: "8%",
    zIndex: 1000,
  },
});
