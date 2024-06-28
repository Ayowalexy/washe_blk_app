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
import { XStack, YStack } from "tamagui";
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
} from "../../../components/forms";
import { SuccessModal } from "../../../components/modal";
import { useAtom } from "jotai";
import {
  LaundryRequests,
  OnelaundryRequestAtom,
  laundryRequestServiceNameAtom,
  persistentUserAtom,
} from "../../atoms";
import { useGetRequests } from "../../../api/queries";
import moment from "moment";
import { useReMakeLaundryRequest } from "../../../api/mutations";
import Toast from "react-native-toast-message";

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
  const { mutate, isPending } = useReMakeLaundryRequest();
  const [oneRequestId, setOneRequestId] = useAtom(OnelaundryRequestAtom);
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);
  const [LaundryServiceName, setLaundryServiceName] = useAtom(
    laundryRequestServiceNameAtom
  );
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openVerification, setOpenVerification] = useState(false);

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
        <View width="100%" style={styles.container}>
          <ImageBackground
            imageStyle={styles.cardImage}
            source={CardImg}
            style={styles.card}
          >
            <XStack
              paddingLeft={20}
              paddingTop={20}
              justifyContent="space-between"
            >
              <YStack>
                <Text
                  color="$white1"
                  fontFamily="$body"
                  fontWeight="600"
                  fontSize={16}
                >
                  Get your laundry
                </Text>
                <Text
                  color="$white1"
                  fontFamily="$body"
                  fontWeight="600"
                  fontSize={16}
                  marginTop={5}
                >
                  done today
                </Text>
                <XStack alignItems="center" marginTop={18}>
                  <Text
                    color="$white1"
                    fontSize={12}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    New laundry request
                  </Text>
                  <View marginLeft={3}>
                    <Arrow color="#F0F6FF" />
                  </View>
                </XStack>
              </YStack>
              <View zIndex={1000} position="absolute" right={0}>
                <Washing />
              </View>
            </XStack>
          </ImageBackground>
        </View>
        {user?.verificationDocument?.isApproved ? (
          <View
            marginTop={23}
            padding={20}
            width="100%"
            height="auto"
            backgroundColor="$primary6"
            borderRadius={10}
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Text
                fontSize={15}
                fontFamily="$body"
                fontWeight="600"
                color="$secondary7"
              >
                Verification Successful
              </Text>
              <Close />
            </XStack>
            <Text
              color="$black3"
              width="94%"
              fontFamily="$body"
              fontWeight="500"
              fontSize={13}
              marginTop={10}
              lineHeight={"$1"}
            >
              All information provided have been reviewed by the admin. You can
              now start using Washe
            </Text>
          </View>
        ) : user?.verificationDocument?.rejectionReason === "" ? (
          <View
            marginTop={23}
            padding={20}
            width="100%"
            height={130}
            backgroundColor="$primary8"
            borderRadius={10}
            position="relative"
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Text
                fontSize={15}
                fontFamily="$body"
                fontWeight="600"
                color="$primary7"
              >
                Verification unsuccessful
              </Text>
            </XStack>
            <XStack justifyContent="space-between">
              <YStack width="80%">
                <Text
                  color="$black1"
                  width="94%"
                  fontFamily="$body"
                  fontWeight="500"
                  fontSize={13}
                  marginTop={10}
                  lineHeight={"$1"}
                >
                  Your washe account verification was unsuccessful & rejected by
                  the admin
                </Text>
                <TouchableOpacity onPress={() => setOpenVerification(true)}>
                  <XStack>
                    <Text color="$red1" fontSize={12} marginTop={10}>
                      View rejection reason
                    </Text>
                  </XStack>
                </TouchableOpacity>
              </YStack>
              <View
                width={55}
                height={88}
                position="absolute"
                right={10}
                top={"0%"}
              >
                <Image
                  source={Sand}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </XStack>
          </View>
        ) : (
          user?.verificationDocument?.isPending && (
            <View
              marginTop={23}
              padding={20}
              width="100%"
              height="auto"
              backgroundColor="$primary6"
              borderRadius={10}
            >
              <XStack justifyContent="space-between" alignItems="center">
                <Text
                  fontSize={15}
                  fontFamily="$body"
                  fontWeight="600"
                  color="$secondary7"
                >
                  Verification in progress
                </Text>
                <Close />
              </XStack>
              <Text
                color="$black1"
                width="80%"
                fontFamily="$body"
                fontWeight="500"
                fontSize={13}
                marginTop={10}
                lineHeight={"$1"}
              >
                Information provided is being reviewed by the admin.
                Verification takes 2-5 business days.
              </Text>
            </View>
          )
        )}

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
        <OngoingRequests />
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
              ListEmptyComponent={<EmptyRequest />}
              data={data?.data?.filter(
                (elem: any) => elem.status === "pending"
              )}
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
          setPaymentModal(false)
          setShowModal(true)
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
    </TabLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 144,
    width: "100%",
  },
  card: {
    width: "100%",
    height: "100%",
  },
  cardImage: {
    borderRadius: 20,
  },

  view: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
});
