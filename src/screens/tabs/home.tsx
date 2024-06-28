import {
  FlatList,
  Image,
  ImageBackground,
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
  Close,
  GooglePay,
  Paypal,
  Stripe,
  Washing,
} from "../../../utils/assets";
import { EmptyRequest } from "../../../components/empty-request";
import { useEffect, useState } from "react";
import { FormModal } from "../../../components/form-modal";
import { Button } from "../../../components/button";
import { AppStackScreenProps } from "../../../navigation/app.roots.types";
import {
  PaymentForm,
  SaveForm,
  PaymentMethod,
  CreditCard,
  OngoingRequests,
  Request,
  NewLaundryRequest,
  RequestForm,
} from "../../../components/forms";
import { SuccessModal } from "../../../components/modal";
import { useAtom } from "jotai";
import {
  LaundryRequests,
  OnelaundryRequestAtom,
  laundryRequestServiceNameAtom,
  persistentUserAtom,
} from "../../atoms";
import { useGetLaundryServices, useGetRequests } from "../../../api/queries";
import moment from "moment";
import {
  useMakeLaundryRequest,
  useReMakeLaundryRequest,
} from "../../../api/mutations";
import Toast from "react-native-toast-message";
import { HomeCard } from "../../../components/home-card";
import { VerificationCard } from "../../../components/verification-card";

// type HomeScreenProps = NativeStackScreenProps<
//   AppRootStackParamsList,
//   "home_stack"
// >;
export const Home = ({ navigation }: AppStackScreenProps<"tabs">) => {
  const [showModal, setShowModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [addPayment, setAddPayment] = useState(false);
  const [openCreditCard, setOpenCreditCard] = useState(false);
  const [show, setShow] = useState(false);
  const [user] = useAtom(persistentUserAtom);
  const { refetch, data } = useGetRequests();
  const { data: datas } = useGetLaundryServices();
  const { mutate, isPending } = useReMakeLaundryRequest();
  const { mutate: mutation, isPending: isLoading } = useMakeLaundryRequest();
  const [oneRequestId, setOneRequestId] = useAtom(OnelaundryRequestAtom);
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);
  const [LaundryServiceName, setLaundryServiceName] = useAtom(
    laundryRequestServiceNameAtom
  );
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openVerification, setOpenVerification] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const [openRequest, setOpenRequest] = useState(false);

  const handleRequestPress = (item: any) => {
    const requestData = {
      laundryRequestServiceId: item.laundry_request_service_id,
      laundryRequestServiceName: item.laundryRequestService.name,
      laundryRequestTypeId: item.laundry_request_type_id,
      laundryRequestTypeName: item.laundryRequestType.name,
      pickupDate: item.pickup_date,
      pickupTime: moment(item.pickup_date_time).format("hh:mm A"),
      timeframe: item.timeframe,
      detergentType: item.detergent_type,
      waterTemperature: item.water_temperature,
      softener: item.softener,
      bleach: item.bleach,
      dye: item.dye,
      dyeColor: item.dye_color,
    };
    console.log("Setting laundry NAME:", requestData.laundryRequestServiceName);
    setOneLaundryRequest(requestData as any);
    setLaundryServiceName(item.laundryRequestService.name);
    setShowModal(true);
  };

  const handleReMakeRequest = () => {
    const reRequest = {
      laundryRequestId: oneRequestId,
    };
    mutate(reRequest, {
      onSuccess: async (data) => {
        console.log(data, "data");
        Toast.show({
          type: "customSuccess",
          text1: "Re-request made successfully",
        });
        setShowModal(false);
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
    mutation(request, {
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
  const handleOpenRequest = () => {
    setOpenModal(false);
    setOpenRequest(true);
  };

  const handleOpenConfirmation = () => {
    setOpenRequest(false);
    setOpenConfirmation(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await refetch();
      console.log("Fetched data: ", data);
    };

    fetchData();
  }, [refetch]);
  console.log(data?.data, "dataaee");

  return (
    <TabLayout>
      <View paddingBottom={100}>
        <HomeCard onPress={() => setOpenModal(true)} />
        <VerificationCard setOpenVerification={setOpenVerification} />
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
          paymentModal={paymentModal}
          setPaymentModal={setPaymentModal}
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
                <EmptyRequest
                  onPress={() => {
                    setOpenModal(true);
                  }}
                />
              }
              data={data?.data?.filter((elem: any) => elem.status === "saved")}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    handleRequestPress(item);
                    setOneRequestId(item.id);
                  }}
                >
                  <Request
                    status={item?.status as any}
                    show={true}
                    date={moment(item?.created_at).format(
                      "Do MMM YYYY, hh:mm A"
                    )}
                    name={item?.laundryRequestService.name}
                  />
                  {item?.id === data?.data?.length ? null : (
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
        show_button={true}
        button={
          <Button
            loading={isPending}
            title="Re-request"
            onPress={() => {
              handleReMakeRequest();
            }}
          />
        }
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
          setPaymentModal(false);
          setShowModal(true);
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
        button={
          <Button
            title="Update Information"
            onPress={() =>
              navigation.navigate("onboarding", {
                screen: "create_account",
                params: { isUpdate: true },
              })
            }
          />
        }
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
        <NewLaundryRequest data={datas?.data} />
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
    </TabLayout>
  );
};
