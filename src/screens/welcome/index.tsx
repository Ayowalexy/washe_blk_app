import Swiper from "react-native-swiper";
import { Text } from "../../libs/Text";
import { View } from "../../libs/View";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { Data } from "../../utils/data";
import { Image, Platform, ScrollView, StyleSheet } from "react-native";
import { Button } from "../../libs/button";
import { useTheme } from "tamagui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamList } from "../../navigation/onboarding.navigation";
import { Ebike, UserLine } from "../../../assets/images/svg/icons";
import { LoginCircle } from "../../../assets/images/svg/icons/login-circle";

type WelcomeScreenProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "welcome"
>;
export const Welcome = ({ navigation }: WelcomeScreenProps) => {
  const theme = useTheme();

  return (
    <View
      height={Platform.OS === "android" ? DEVICE_HEIGHT + 100 : DEVICE_HEIGHT}
      width={DEVICE_WIDTH}
      backgroundColor="$white1"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Swiper
          autoplay
          height={410}
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
        <View marginTop={10}>
          <Text
            fontFamily="$heading"
            fontWeight="500"
            fontSize={28}
            paddingLeft={30}
            paddingRight={30}
            textAlign="center"
            color="$textBlack"
            lineHeight={38}
            paddingTop={0}
          >
            Clean Clothes Always at your Fingertips
          </Text>
          <Text
            fontFamily="$heading"
            fontWeight="400"
            textAlign="center"
            paddingLeft={20}
            paddingRight={20}
            fontSize={16}
            lineHeight={28}
            marginTop={14}
            color="$textSecondary"
          >
            Our online reseller and Merchant of Record, oversees this order
            process and
          </Text>
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
              style={{ height: 60 }}
              title="Continue as a Customer"
              icon={<UserLine />}
              iconPosition="right"
              textSize={14}
              onPress={() => navigation.navigate("create_account")}
            />
          </View>
        
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <View
              borderBottomWidth={1}
              width={"35%"}
              borderBottomColor={theme.secondary1?.val}
            />
            <View
              borderWidth={1}
              width={60}
              height={35}
              borderColor={theme?.secondary1?.val}
              borderRadius={19}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize={15} textAlign="center" color={theme.black1?.val}>
                OR
              </Text>
            </View>
            <View
              width={"35%"}
              borderBottomWidth={1}
              borderBottomColor={theme.secondary1?.val}
            />
          </View>
          <View>
            <Button
              style={{ height: 60 }}
              textColor="$black1"
              variant="outline"
              onPress={() => navigation.navigate("login")}
              title="Log in"
              icon={<LoginCircle />}
              iconPosition="right"
              textSize={14}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {},
  view: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
});
