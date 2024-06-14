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
import { LaundryRequests } from "../../../components/laundry-request";
import { EmptyRequest } from "../../../components/empty-request";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { FormModal } from "../../../components/form-modal";
import { Button } from "../../../components/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { RequestFilter } from "../../../components/request-filter";

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
            {LaundryRequests?.length > 1 && (
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
              data={LaundryRequests.filter(
                (elem) => elem.status === "completed"
              )}
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
                    img={item.img}
                    show={false}
                    name={item.name}
                    time={item.date}
                  />
                  {item.id !==
                    LaundryRequests[LaundryRequests.length - 1].id && (
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
        <NewLaundryRequest />
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
        button={
          <Button
            title="Proceed"
            onPress={() => {
              setOpenConfirmation(false);
              setPaymentModal(true);
            }}
          />
        }
        show_button={true}
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
