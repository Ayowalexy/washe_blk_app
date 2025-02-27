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
      backgroundColor="$primary1"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Swiper
          autoplay
          height={500}
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
            fontSize={32}
            paddingLeft={30}
            paddingRight={30}
            textAlign="center"
            color="$textBlack"
            lineHeight={38}
            paddingTop={0}
          >
            Clean Clothes Always at your Fingertips
          </Text>
          
        </View>
        <View
          paddingBottom={150}
          paddingTop={50}
          width="95%"
          marginLeft="2.5%"
          marginRight="2.5%"
          rowGap={20}
          flexDirection="row-reverse"
        >
          <View width="50%" margin="auto">
            <Button
              style={{ height: 50 }}
              variant="filled"
              title="Create account"
              textSize={15}
              onPress={() => navigation.navigate("create_account")}
            />
          </View>

          <View width="45%">
            <Button
              style={{ height: 50 }}
              textColor="$black1"
              variant='secondary'
              color="$primary4"
              onPress={() => navigation.navigate("login")}
              title="Log in"
              textSize={15}
              
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
    paddingTop: 100,
  },
});
