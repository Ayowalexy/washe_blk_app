import { useState } from "react";
import { HomeCard } from "../../components/cards/home-card";
import { VerificationCard } from "../../components/cards/verification-card";
import { TabLayout } from "../../components/tab-layout";
import { Text } from "../../libs/Text";
import { View } from "../../libs/View";
import { useAtom } from "jotai";
import { availabilityState, openVerificationStateAtom } from "../../atoms";
import { TouchableOpacity } from "react-native";
import { LaundryRequests } from "../../components/laundry-requests";
import { DEVICE_WIDTH } from "../../constants";
import { OngoingRequests } from "../../components/ongoing-requests";
import { useTheme, XStack, YStack } from "tamagui";
import { ApplePay, GooglePay, Paypal, Stripe } from "../../utils/assets";
import { InputBox } from "../../components/input";
import {
  BroadcastIcon,
  LocationOutlined,
} from "../../../assets/images/svg/icons";
import ToggleSwitch from "toggle-switch-react-native";
import { useToggleAvailability } from "../../../api/queries";
import { FormModal } from "../../components/modals/form-modal";
import { Button } from "../../libs/button";
import { PaymentInfo } from "../../components/forms";
import { PaymentMethod } from "../../components/forms/payment-method";
import { CreditCard } from "../../components/credit-card.component";
import { SuccessModal } from "../../components/layouts/success-layout";

export const Home = () => {
  const theme = useTheme();

  const { refetch, data, isLoading } = useToggleAvailability();

  const [isAvailable, setIsAvailable] = useAtom(availabilityState);
  const [verification, setOpenVerification] = useState(false);
  const [openVerificationState, setOpenVerificationState] = useAtom(
    openVerificationStateAtom
  );
  const [openPayment, setOpenPayment] = useState(false);
  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const itemWidth =
    LaundryRequests.length === 1 ? DEVICE_WIDTH - 80 : DEVICE_WIDTH * 0.7;

  const handleToggleAvailability = async () => {
    try {
      const response = await refetch();
      if (response.data.status) {
        setIsAvailable(response.data.message.includes("turned on"));
      } else {
        console.error("Failed to toggle availability");
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  return (
    <TabLayout>
      <YStack>
        <InputBox
          label="Your location"
          placeholder="Hot Springs, Arkansas"
          leftElement={<LocationOutlined />}
          fontFamily={"$body"}
        />
        <XStack alignItems="center" gap={12} marginBottom={20} marginTop={8}>
          <BroadcastIcon />
          <Text fontSize={16} fontFamily="$body" color={theme?.black1?.val}>
            {isAvailable
              ? "You are currently online"
              : "You are currently offline"}
          </Text>
          <ToggleSwitch
            isOn={isAvailable}
            onColor="#00D158"
            offColor="#D9D9D9"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="medium"
            onToggle={handleToggleAvailability}
            disabled={isLoading}
          />
        </XStack>
      </YStack>
      <HomeCard onPress={() => null} />
      <VerificationCard
        setOpenVerification={setOpenVerification}
        close={() => setOpenVerificationState(false)}
      />
      <TouchableOpacity onPress={() => setOpenPayment(true)}>
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
            <Text fontSize={12} fontFamily="$body" width="65%" lineHeight={20}>
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
      <FormModal
        visible={openPayment}
        setVisible={setOpenPayment}
        close={() => setOpenPayment(false)}
        title="Payment Information"
        text="Update payment information"
        show_button={true}
        button={
          <Button
            textSize={14}
            style={{ height: 56 }}
            title="Add new payment method"
            onPress={() => {
              setOpenPayment(false);
              setOpenPaymentMethod(true);
            }}
          />
        }
      >
        <PaymentInfo />
      </FormModal>
      <FormModal
        visible={openPaymentMethod}
        setVisible={setOpenPaymentMethod}
        close={() => setOpenPaymentMethod(false)}
        title="Select Payment Method"
        text="Select a option below to add a new payment method"
        show_button={false}
      >
        <PaymentMethod
          onPress={() => {
            setOpenPaymentMethod(false);
            setOpenCard(true);
          }}
        />
      </FormModal>
      <FormModal
        visible={openCard}
        setVisible={setOpenCard}
        close={() => setOpenCard(false)}
        title="Credit/Debit Card"
        text="Please enter payment details."
        show_button={false}
      >
        <CreditCard
          onPress={() => {
            setOpenCard(false);
            setOpenSuccess(true);
          }}
        />
        <SuccessModal
          visible={openSuccess}
          onPress={() => {
            setOpenSuccess(false);
          }}
          setVisible={setOpenSuccess}
          onReject={() => null}
          title="Your credit card was added successfully "
          buttonTitle="Done"
          iconPosition="center"
          text="You can now start making laundry request with washe"
        />
      </FormModal>
    </TabLayout>
  );
};
