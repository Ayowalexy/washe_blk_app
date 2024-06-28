import { useTheme } from "tamagui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";
import { SuccessLayout } from "../../../components/success-layout";
import { useAtom } from "jotai";
import { UserData } from "../../atoms";

type userDetailsScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "user_details"
>;
export const UserDetails = ({ navigation }: userDetailsScreenProps) => {
  const theme = useTheme();
  const [userdata] = useAtom(UserData);
  return (
    <SuccessLayout
      buttonTitle="Complete Onboarding"
      nameTitle="Name"
      name={`${userdata.firstName} ${userdata.lastName}`}
      secondText={userdata?.email}
      secondTitle="Email"
      thirdTitle="Phone Number"
      thirdText={userdata.phoneNumber}
      successText={`Welldone, ${userdata.firstName} ${userdata.lastName}`}
      title="You’re almost there"
      text=" Your washe account has been successfully created"
      onPress={() => navigation.navigate("address_info")}
    />
  );
};
