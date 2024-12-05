import Swiper from "react-native-swiper";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { Data } from "./data";
import { Image, Platform, StyleSheet } from "react-native";
import { Button } from "../../../components/button";
import { useTheme } from "tamagui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";
import { Slide1 } from "../../../utils/assets";
import { Ebike, UserLine } from "../../../assets/images/svg/icons";

type WelcomeScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "welcome"
>;
export const Welcome = ({ navigation }: WelcomeScreenProps) => {
  const theme = useTheme();

  return (
    <View
      height={Platform.OS === 'android' ? DEVICE_HEIGHT + 100 : DEVICE_HEIGHT}
      width={DEVICE_WIDTH}
      backgroundColor="$white1"
    >
      <Swiper
        autoplay
        activeDotStyle={{
          backgroundColor: "#000000",
          width: 40,
        }}
        dotColor="#C4CFD4"
        index={1}
      >
        {Data.map((elem, id) => (
          <View key={id} style={styles.view}>
           <elem.image />
          </View>
        ))}
      </Swiper>
      <View>
        <Text
          fontFamily="$body"
          fontWeight="500"
          fontSize={28}
          paddingLeft={50}
          paddingRight={50}
          textAlign="center"
          color="$textBlack"
          lineHeight={38}
          paddingTop={0}
        >
          Clean clothes always at your fingertips.
        </Text>
        <Text
          fontFamily="$body"
          fontWeight="400"
          textAlign="center"
          fontSize={16}
          paddingLeft={20}
          paddingRight={20}
          marginTop={14}
          lineHeight={24} color='$textSecondary'>ur online reseller and Merchant of Record, oversees this order process and </Text>
      </View>
      <View
        paddingBottom={150}
        paddingTop={50}
      
        width="88%"
        marginLeft="6%"
        marginRight="6%"
        rowGap={20}
      >
        <View width="100%" margin="auto">
          <Button
            onPress={() => navigation.navigate("login")}
            title="Continue as a Costumer"
            icon={<UserLine />}
            showIcon
          />
        </View>
        <View width="100%" margin="auto">
          <Button
            color="$primary4"
            textColor="$black1"
            width="48%"
            onPress={() =>
              navigation.navigate("create_account", {
                isUpdate: false
              })
            }
            icon={<Ebike />}
            showIcon
            title="Continue as a Rider"
          />
        </View>
        <View>
          
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
  },
  view: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
});
