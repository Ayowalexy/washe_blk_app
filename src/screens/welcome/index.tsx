import Swiper from "react-native-swiper";
import { Text } from "../../../components/libs/text";
import { View } from "../../../components/libs/view";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants";
import { Data } from "./data";
import { StyleSheet } from "react-native";
import { Button } from "../../../components/button";
import { useTheme } from "tamagui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationStackParamsList } from "../../../navigation/onboarding";

type WelcomeScreenProps = NativeStackScreenProps<
  AuthenticationStackParamsList,
  "welcome"
>;
export const Welcome = ({ navigation }: WelcomeScreenProps) => {
  const theme = useTheme();
  return (
    <View
      height={DEVICE_HEIGHT}
      width={DEVICE_WIDTH}
      backgroundColor="$primary1"
    >
      <Swiper
        style={styles.wrapper}
        activeDotStyle={{
          backgroundColor: "#0468F6",
          width: 40,
        }}
        dotColor="#E1EDFF"
        index={1}
      >
        {Data.map((elem, id) => (
          <View key={id} style={styles.view}>
            <>
              <elem.image />
            </>
          </View>
        ))}
      </Swiper>
      <Text
        fontFamily="$body"
        fontWeight="600"
        fontSize={32}
        paddingLeft={50}
        paddingRight={50}
        textAlign="center"
        color="$primary2"
        lineHeight={38}
        paddingTop={10}
      >
        Clean clothes always at your fingertips.
      </Text>
      <View
        paddingBottom={150}
        paddingTop={50}
        flexDirection="row"
        justifyContent="center"
        width="88%"
        marginLeft="6%"
        marginRight="6%"
        columnGap={30}
      >
        <View width="50%" margin="auto">
          <Button
            onPress={() => navigation.navigate('login')}
            color="$primary4"
            title="Log in"
            textColor="$black1"
          />
        </View>
        <View width="50%" margin="auto">
          <Button
            width="48%"
            onPress={() => navigation.navigate("create_account")}
            title="Create Account"
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {},
  view: {
    width: "100%",
    paddingTop: 60,
  },
});
