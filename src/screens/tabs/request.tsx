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
import { useState } from "react";
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

  const { data } = useGetLaundryServices();
  console.log(data?.data, "dataaa");
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
    };
    mutate(request, {
      onSuccess: async (data) => {
        console.log(data, "data");
        Toast.show({
          type: "customSuccess",
          text1: "Request created successfully",
        });
        setOpenConfirmation(false);
        setPaymentModal(true);
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
        console.log(error, "rrr");
      },
    });
  };
  return (
    <>
      <TabLayout>
        <View paddingBottom={70}>
          <OngoingRequests />
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
            {laundry?.length > 1 && (
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
              data={laundry.filter((elem) => elem.status === "completed")}
              ListEmptyComponent={
                <EmptyRequest
                  backgroundColor={theme?.primary3?.val}
                  color={theme?.white1?.val}
                  borderColor={theme?.primary3?.val}
                />
              }
              renderItem={({ item }) => (
                <View>
                  <Request
                    status={item.status as any}
                    show={false}
                    name={item.name}
                    time={item.date}
                  />
                  {item.id !== laundry[laundry.length - 1].id && (
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
          <View paddingTop={25}>
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
        <SaveForm
          setOpenConfirmation={setOpenConfirmation}
          setPaymentModal={setPaymentModal}
        />
      </FormModal>

      <FormModal
        visible={paymentModal}
        setVisible={setPaymentModal}
        goBack={true}
        onGoBack={() => {
          setPaymentModal(false)
          setOpenConfirmation(true)
        }}
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
