import { useNavigation } from "@react-navigation/native";
import { View } from "../../../components/libs/view";
import { SuccessLayout } from "../../../components/success-layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";

type PaymentSuccessfulScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "home_stack"
>;
export const PaymentSuccessful = ({
  navigation,
}: PaymentSuccessfulScreenProps) => {
  return (
    <SuccessLayout
      buttonTitle="Done"
      nameTitle="Sub-total"
      name="$40.00"
      secondText="$0.00"
      secondTitle="Tax"
      thirdTitle="Total Amount"
      thirdText="$40.00"
      successText="Welldone, Karen James!"
      title="Payment successful"
      text="Your payment of $40.00 for your laundry was successfully made"
      onPress={() => navigation.navigate("tabs", { screen: "Home" })}
    />
  );
};
