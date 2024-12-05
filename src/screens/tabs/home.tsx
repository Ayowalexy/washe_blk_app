import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { TabLayout } from "../../../components/tab-layout";
import { CardImg, Sand } from "../../../utils/assets-png";
import { XStack, YStack, useTheme } from "tamagui";
import {
  ApplePay,
  Arrow,
  GooglePay,
  Paypal,
  Stripe,
  CloseIcon,
  Washing,
  Close,
} from "../../../utils/assets";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LaundryRequests as laundry } from "../../../components/laundry-request";
import { EmptyRequest } from "../../../components/empty-request";
import { useCallback, useEffect, useState } from "react";
import { FormModal } from "../../../components/form-modal";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import {
  PaymentForm,
  SaveForm,
  PaymentMethod,
  CreditCard,
  OngoingRequests,
  Request,
  NewLaundryRequest,
  RequestForm,
  TrackForm,
} from "../../../components/forms";
import { SuccessModal } from "../../../components/modal";
import {
  useMakeLaundryRequest,
  useMakePayment,
  useReMakeLaundryRequest,
} from "../../../api/mutations";
import { useAtom } from "jotai";
import { LaundryRequests, laundryRequestServiceNameAtom, openVerificationStateAtom } from "../../atoms";
import { HomeCard } from "../../../components/home-card";
import Toast from "react-native-toast-message";
import {
  useGetLaundryServices,
  useGetRequests,
  useGetSavedRequests,
} from "../../../api/queries";
import { OneSavedRequest } from "../../../components/forms/one-saved-request";
import ToggleSwitch from "toggle-switch-react-native";
import { VerificationCard } from "../../../components/verification-card";
import moment from "moment";

type HomeScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "home_stack"
>;
export const Home = ({ navigation }: HomeScreenProps) => {
  const [showModal, setShowModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [addPayment, setAddPayment] = useState(false);
  const [openCreditCard, setOpenCreditCard] = useState(false);
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openVerification, setOpenVerification] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openTracking, setOpenTracking] = useState(false);
  const [selected_payment_id, setSelectedPaymentId] = useState("");
  const [openRequest, setOpenRequest] = useState(false);
  const [LaundryServiceName, setLaundryServiceName] = useAtom(
    laundryRequestServiceNameAtom
  );
  const [openVerificationState, setOpenVerificationState] = useAtom(openVerificationStateAtom);

  const [savedRequestId, setSavedRequestId] = useState("");
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);
  const { mutateAsync, isPending: loading } = useMakePayment();
  const { mutate: Remake, isPending: isLoading } = useReMakeLaundryRequest();
  const { mutate, isPending } = useMakeLaundryRequest();
  const { refetch } = useGetRequests();
  const { refetch: saved, data: allSavedRequests } = useGetSavedRequests();
  const theme = useTheme();
  const { data } = useGetLaundryServices();
  console.log(allSavedRequests?.data, "allSavedRequestsallSavedRequests");
  const handleMayPayment = useCallback(async () => {
    try {
      const response = await mutateAsync({
        laundryRequestId: oneLaundryRequest.laundryRequestId as string,

        paymentMethodId: selected_payment_id,
      });
      console.log(response, "responsee");
      setPaymentModal(false);
      setOneLaundryRequest({} as any)
      navigation.navigate("home_stack", {
        screen: "payment_successful",
      });
    } catch (e) {
      console.log(e);
    }
  }, [selected_payment_id, oneLaundryRequest]);

  const handleOpenRequest = () => {
    setOpenModal(false);
    setOpenRequest(true);
  };
  const handleCloseRequest = () => {
    setOpenRequest(false);
  };

  const handleOpenConfirmation = () => {
    setOpenRequest(false);
    setOpenConfirmation(true);
  };
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
      saveRequest: saveRequest,
    };
    mutate(request, {
      onSuccess: async (data) => {
        // Toast.show({
        //   type: "customSuccess",
        //   text1: "Request created successfully",
        // });
        setOpenConfirmation(false);
        setTimeout(() => {
          setPaymentModal(true);
        }, 200);
        setOneLaundryRequest({
          ...oneLaundryRequest,
          tax: 0,
          total_amount: data?.data?.data?.amount ?? 0,
          laundryRequestId: data?.data?.data?.id,
        });
        const { data: allRequests } = await refetch();
        const { data: allSavedRequests } = await saved();
        console.log(allSavedRequests, "allsaved");
      },
      onError: (error: any) => {
        Toast.show({
          type: "customError",
          text1:
            JSON.stringify(error?.response?.data.errors[0].message) ||
            "An error occured, try again",
        });
        console.log(error?.response?.data.errors[0].message, "rrr");
      },
    });
  };


  const handleRemakeRequest = () => {
    const requestId = {
      laundryRequestId: savedRequestId,
    };
    console.log(requestId, 'requestId--')
    Remake(requestId, {
      onSuccess: async (data) => {
        Toast.show({
          type: "customSuccess",
          text1: "Request re-made successfully",
        });
        setOpenConfirmation(false);
        setPaymentModal(true);
        setOneLaundryRequest({
          ...oneLaundryRequest,
          tax: 0,
          total_amount: data?.data.amount ?? 0,
          laundryRequestId: data?.data?.id,
        });
        const { data: allRequests } = await refetch();
        const { data: allSavedRequests } = await saved();
      },
      onError: (error: any) => {
        console.log(error.response.data, "rrr");
        Toast.show({
          type: "customError",
          text1:
            JSON.stringify(error?.response?.data) ||
            "An error occured, try again",
        });
      },
    });
  };

  return (
    <TabLayout>
      <View paddingBottom={100}>
        <HomeCard onPress={() => setOpenModal(true)} />

        {
          openVerificationState
          && <VerificationCard
            close={() => setOpenVerificationState(false)}
            setOpenVerification={setOpenVerification} />
        }

        <TouchableOpacity onPress={() => setAddPayment(true)}>
          <View
            marginTop={23}
            padding={20}
            width="100%"
            height="auto"
            backgroundColor="$secondary6"
            borderRadius={10}
          >
            <XStack justifyContent="space-between">
              <Text
                fontSize={15}
                fontFamily="$body"
                fontWeight="600"
                color="$secondary5"
              >
                Add Payment Information
              </Text>
              <XStack gap={10}>
                <Stripe />
                <Paypal />
              </XStack>
            </XStack>
            <XStack justifyContent="space-between" marginTop={6}>
              <Text fontSize={12} width="65%" lineHeight={"$10"}>
                Credit card, PayPal, Google Pay, Apple Pay or Stripe
              </Text>
              <XStack gap={10} marginLeft={13}>
                <ApplePay />
                <GooglePay />
              </XStack>
            </XStack>
          </View>
        </TouchableOpacity>
        <OngoingRequests
          openTracking={openTracking}
          setOpenTracking={setOpenTracking}
          setPaymentModal={setPaymentModal}
          paymentModal={paymentModal}
          setOpenConfirmation={setOpenConfirmation}
        />
        <YStack
          backgroundColor="$secondary8"
          marginTop={20}
          height="auto"
          width="100%"
          paddingHorizontal={15}
          paddingVertical={20}
        >
          <Text>Saved Requests</Text>
          <View>
            <FlatList
              ListEmptyComponent={
                <EmptyRequest onPress={() => setOpenModal(true)} />
              }
              data={allSavedRequests?.data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    setOneLaundryRequest({
                      ...item,
                      LaundryServiceName: item?.laundryService.name,
                      laundryRequestTypeId: item.laundryType.id,
                    });
                    setLaundryServiceName(item.laundryService.name);
                    setSavedRequestId(item.id);
                    setShowModal(true);
                  }}
                >
                  <OneSavedRequest
                    date={item?.date}
                    name={item?.laundryService.name}
                  />
                  {index < allSavedRequests.data?.length - 1 && (
                    <View borderBottomWidth={1} borderBottomColor="$black4" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </YStack>
      </View>

      <FormModal
        visible={showModal}
        setVisible={setShowModal}
        title="Saved Request"
        text="Are you sure you want to proceed with this request?"
        close={() => {
          setShowModal(false);
        }}
        button={
          <Button
            loading={isLoading}
            title="Re-request"
            onPress={() => {
              setShowModal(false);
              setOpenRequest(true);
              setOneLaundryRequest({
                ...oneLaundryRequest,
              });
            }}
          />
        }
      >
        <SaveForm time={moment(oneLaundryRequest.pickupTime).format('hh:mm A')} />
      </FormModal>

      <FormModal
        visible={paymentModal}
        setVisible={setPaymentModal}
        goBack={Platform.OS === 'android' ? false : true}
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
          setPaymentModal={setPaymentModal}
          setSelectedPaymentId={setSelectedPaymentId}
          selected_payment_id={selected_payment_id}
        />
      </FormModal>

      <FormModal
        visible={addPayment}
        setVisible={setAddPayment}
        title="Add Payment Method"
        text="Select an option below to add a new payment method"
        close={() => {
          setAddPayment(false);
        }}
      >
        <PaymentMethod
          onPress={() => {
            setAddPayment(false);
            setOpenCreditCard(true);
          }}
        />
      </FormModal>

      <FormModal
        visible={openCreditCard}
        setVisible={setOpenCreditCard}
        show_button={false}
        title="Credit/Debit Card"
        text="Please enter payment details."
        close={() => {
          setOpenCreditCard(false);
        }}
      >
        <CreditCard
          onPress={() => {
            setOpenCreditCard(false);
            setShow(true);
          }}
        />
      </FormModal>
      <SuccessModal
        visible={show}
        setVisible={setShow}
        onPress={() => setShow(false)}
        title="Your credit card was added successfully "
        text="You can now start making laundry request with washe"
      />
      <FormModal
        visible={openVerification}
        setVisible={setOpenVerification}
        close={() => setOpenVerification(false)}
        title="Verification Unsuccessful"
        text="25th Jun 2023, 04:45 PM"
        button={<Button title="Update Information" onPress={() => null} />}
        show_button={true}
      >
        <YStack
          width="82%"
          marginTop={20}
          marginHorizontal="auto"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Text color="$red2" fontSize={13} textAlign="justify">
            Reason for Rejection
          </Text>
          <Text fontSize={14} color="$black3">
            Lorem ipsum dolor sit amet consectetur. Mauris tincidunt dui sed
            facilisi. Fermentum nibh dui purus morbi leo sodales in. Iaculis in
            non aliquet faucibus cras.{" "}
          </Text>
        </YStack>
      </FormModal>
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
        <RequestForm closeRequest={() => {
          setOpenRequest(false)
          setOpenConfirmation(true)
        }} />
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
        <SaveForm time={moment(oneLaundryRequest.pickupTime, 'hh:mm').format('hh:mm A')} />
      </FormModal>
    </TabLayout>
  );
};
