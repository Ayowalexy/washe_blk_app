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
import { CardImg } from "../../../utils/assets-png";
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
import { RequestCard } from "../../../components/request-card";
import { LaundryRequests } from "../../../components/laundry-request";
import { DEVICE_WIDTH } from "../../constants";
import { EmptyRequest } from "../../../components/empty-request";
import { useState } from "react";
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
} from "../../../components/forms";
import { SuccessModal } from "../../../components/modal";

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
              data={LaundryRequests}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(item) => (
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <Request
                    show={true}
                    img={item.item.img}
                    date={item.item.date}
                    name={item.item.name}
                  />
                  {item.item.id === LaundryRequests.length ? null : (
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
            title="Re-request"
            onPress={() => {
              setShowModal(false);
              setPaymentModal(true);
            }}
          />
        }
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

      <FormModal
        visible={addPayment}
        setVisible={setAddPayment}
        title="Add Payment Method"
        text="Select a option below to add a new payment method"
        close={() => {
          setPaymentModal(false);
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

      {show && (
        <SuccessModal
          onPress={() => setShow(false)}
          title="Your credit card was added successfully "
          text="You can now start making laundry request with washe"
        />
      )}
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
