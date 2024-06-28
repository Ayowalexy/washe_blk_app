import { useNavigation } from "@react-navigation/native";
import { View } from "../../../components/libs/view";
import { SuccessLayout } from "../../../components/success-layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { useAtom } from "jotai";
import { LaundryRequests } from "../../atoms";

type PaymentSuccessfulScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "home_stack"
>;
export const PaymentSuccessful = ({
  navigation,
}: PaymentSuccessfulScreenProps) => {
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);

  return (
    <SuccessLayout
      buttonTitle="Done"
      nameTitle="Sub-total"
      name={`$${Number(oneLaundryRequest?.tax ?? 0) + Number(oneLaundryRequest?.total_amount ?? 0)}`}
      secondText={`$${Number(oneLaundryRequest?.tax ?? 0)}`}
      secondTitle="Tax"
      thirdTitle="Total Amount"
      thirdText={`$${Number(oneLaundryRequest?.tax ?? 0) + Number(oneLaundryRequest?.total_amount ?? 0)}`}
      successText="Welldone, Karen James!"
      title="Payment successful"
      text={`Your payment of $${Number(oneLaundryRequest?.tax ?? 0) + Number(oneLaundryRequest?.total_amount ?? 0)} for your laundry was successfully made`}
      onPress={() => navigation.navigate("tabs", { screen: "Home" })}
    />
  );
};
