import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "../libs/view";
import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { CardImg } from "../../utils/assets-png";
import { AtmCard, Star, Stripe } from "../../utils/assets";
import { PaymentDetails } from "../payment-details";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Radio } from "./radio";
import { useGetPaymentMethods } from "../../api/queries";
import { useAtom } from "jotai";
import { LaundryRequests, persistentUserAtom } from "../../src/atoms";
import { FormModal } from "../form-modal";
import { PaymentMethod } from "./payment-method";
import { CreditCard } from "./credit-card.form";
import { ContactForm } from "./contact-form";
import { SuccessModal } from "../modal";

type Prop = {
  selected_payment_id: string;
  setSelectedPaymentId: Dispatch<SetStateAction<string>>;
  setPaymentModal: Dispatch<SetStateAction<boolean>>
};

export const PaymentForm: FC<Prop> = ({
  selected_payment_id,
  setSelectedPaymentId,
  setPaymentModal
}) => {
  const theme = useTheme();
  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const { data } = useGetPaymentMethods();
  const [oneLaundryRequest] = useAtom(LaundryRequests);
  const [user] = useAtom(persistentUserAtom);
  const handleActive = (id: string) => {
    console.log("Selected Payment ID:", id);
    setSelectedPaymentId(id);
    
  };
  // console.log()
  useEffect(() => {
    console.log("Updated Selected Payment ID:", selected_payment_id);
  }, [selected_payment_id]);
  return (
    <View width='100%'>
      <View width="100%" paddingHorizontal={28} paddingBottom={30}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View width="100%" style={styles.container}>
            <ImageBackground
              imageStyle={styles.cardImage}
              source={CardImg}
              style={styles.card}
            >
              <View padding={22}>
                <YStack>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text
                      color={"$blue1"}
                      fontSize={12}
                      fontFamily="$body"
                      fontWeight="500"
                    >
                      Sub-total
                    </Text>
                    <Text
                      color={"$white1"}
                      fontSize={14}
                      fontFamily="$body"
                      fontWeight="500"
                      marginTop={5}
                    >
                      ${" "}
                      {Number(oneLaundryRequest?.tax ?? 0) +
                        Number(oneLaundryRequest.total_amount ?? 0)}
                    </Text>
                  </XStack>
                  <View
                    borderBottomWidth={1}
                    borderBottomColor={"$blue2"}
                    paddingVertical={9}
                  />
                </YStack>
                <YStack paddingTop={12}>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text
                      color={"$blue1"}
                      fontSize={12}
                      fontFamily="$body"
                      fontWeight="500"
                    >
                      Tax
                    </Text>
                    <Text
                      color={"$white1"}
                      fontSize={14}
                      fontFamily="$body"
                      fontWeight="500"
                      marginTop={5}
                    >
                      $ {oneLaundryRequest?.tax}
                    </Text>
                  </XStack>
                  <View
                    borderBottomWidth={1}
                    borderBottomColor={"$blue2"}
                    paddingVertical={9}
                  />
                </YStack>
                <YStack paddingTop={12}>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text
                      color={"$blue1"}
                      fontSize={12}
                      fontFamily="$body"
                      fontWeight="500"
                    >
                      Total Amount
                    </Text>
                    <Text
                      color={"$white1"}
                      fontSize={14}
                      fontFamily="$body"
                      fontWeight="500"
                      marginTop={5}
                    >
                      $ {oneLaundryRequest?.total_amount}
                    </Text>
                  </XStack>
                </YStack>
              </View>
            </ImageBackground>
          </View>
          <View
            width={"100%"}
            height="auto"
            padding={20}
            marginTop={27}
            borderWidth={1}
            borderRadius={12}
            borderColor={"$black4"}
          >
            <Text color={"$black3"} fontSize={13}>
              Select Payment Information
            </Text>
            {
              data?.data?.data.length ?
                <FlatList
                  data={Array.isArray(data?.data?.data) ? data?.data?.data : []}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={(item) => (
                    <YStack marginTop={20}>
                      <XStack justifyContent="space-between">
                        <XStack>
                          <View
                            width={36}
                            height={24}
                            backgroundColor={"$white1"}
                            style={styles.atm}
                            justifyContent="center"
                            alignItems="center"
                            paddingVertical={15}
                            paddingHorizontal={20}
                          >
                            <AtmCard />
                          </View>
                          <YStack marginLeft={14}>
                            <Text color={"$black1"} fontSize={15}>
                              {item?.item?.billing_details?.name ??
                                `${user?.firstName} ${user?.lastName}`}
                            </Text>
                            {
                              <XStack alignItems="center">
                                <XStack alignItems="center">
                                  {Array(4)
                                    .fill("_")
                                    .map((elem, index) => (
                                      <Star key={index} />
                                    ))}
                                </XStack>
                                <Text
                                  marginLeft={4}
                                  color={"$black3"}
                                  fontSize={12}
                                >
                                  {item.item?.exp_month}
                                </Text>
                                <View
                                  borderLeftColor={"$black3"}
                                  borderLeftWidth={1}
                                  height={10}
                                  marginHorizontal={6}
                                />
                                <Text color={"$black3"} fontSize={12}>
                                  {item.item?.card?.exp_month}
                                </Text>
                                <View
                                  borderLeftColor={"$black3"}
                                  borderLeftWidth={1}
                                  height={10}
                                  marginHorizontal={6}
                                />
                                <Text color={"$black3"} fontSize={12}>
                                  {item.item?.card?.last4}
                                </Text>
                              </XStack>
                            }
                          </YStack>
                        </XStack>
                        <Radio
                          active={selected_payment_id === item.item.id}
                          id={item.item.id}
                          handleActive={() => handleActive(item.item.id)}
                        />
                      </XStack>
                    </YStack>
                  )}
                /> :
                <View>
                  <PaymentMethod
                    onPress={() => {
                      setOpenPaymentMethod(false);
                      setOpenCard(true);
                    }}
                  />
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
                  </FormModal>
                  <SuccessModal
                    onPress={() => setOpenSuccess(false)}
                    text="You can now start making laundry request with washe"
                    title="Your credit card was added successfully "
                    visible={openSuccess}
                    setVisible={setOpenSuccess}
                  /></View>
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 179,
    width: "100%",
    marginTop: 20,
  },
  card: {
    width: "100%",
    height: "100%",
  },
  cardImage: {
    borderRadius: 20,
  },
  atm: {
    shadowColor: "rgba(103, 114, 229, 0.08)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 1,
  },
  selected_payment_id: {
    width: 16,
    height: 16,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#00D158",
  },
  inactive: {
    width: 16,
    height: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#DFE2E2",
  },
});




