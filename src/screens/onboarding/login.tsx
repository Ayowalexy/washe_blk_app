//   GoogleSignin,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";
import * as Location from "expo-location";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamList } from "../../navigation/app.root.types";
import { useTheme, XStack } from "tamagui";
import { useGetCurrentUser } from "../../../api/queries";
import { useAtom } from "jotai";
import { CurrentUserLocation, persistentUserAtom } from "../../atoms";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../../schema/validation";
import { View } from "../../libs/View";
import { Platform, TouchableOpacity } from "react-native";
import { DEVICE_HEIGHT } from "../../constants";
import { Text } from "../../libs/Text";
import { Arrow } from "../../utils/assets";
import { CloseButton } from "../../components/buttons/close-button";
import { AuthLayout } from "../../components/layouts/auth-layout";
import { InputBox } from "../../components/input";
import { useLogin } from "../../../api/mutation";
import { saveToken } from "../../../resources/storage";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";

type LoginScreenProps = NativeStackScreenProps<
  AppRootStackParamList,
  "onboarding"
>;

export const Login = ({ navigation }: LoginScreenProps) => {
  const theme = useTheme();
  const { mutate, isPending } = useLogin();
  const { refetch } = useGetCurrentUser();
  const [user, setUser] = useAtom(persistentUserAtom);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useAtom(CurrentUserLocation);
  //   const { mutateAsync, isPending: loading } = useGoogleAuth();
  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: (values) => {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);

        formData.append("longitude", userLocation.longitude as any);
        formData.append("latitude", userLocation.latitude as any);

        mutate(formData as any, {
          onSuccess: async (response) => {
            await saveToken("accessToken", response?.data?.token);
            const { data } = await refetch();
            setUser(data?.data);
            Toast.show({
              type: "customSuccess",
              text1: "Logged in successfully",
            });
            navigation.navigate("tab", {
              screen: "Home",
            });
          },
          onError: (error) => {
            Toast.show({
              type: "customError",
              text1: error?.message || "An error occurred, try again",
            });
          },
        });
      },
    });
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserLocation(currentLocation);
    })();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user, "Updated user after refetch");
    }
  }, [user]);

  const signIn = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   // console.log(userInfo, 'userInfo')
    //   if (userInfo?.idToken) {
    //     const response = await mutateAsync({
    //       idToken: userInfo?.idToken,
    //     });
    //     console.log(response, 'reponse')
    //   }
    // } catch (error) {
    //   Toast.show({
    //     type: "customError",
    //     text1:
    //       error?.response?.data?.message ||
    //       "An error occurred, try again",
    //   });
    // }
  };

  return (
    <AuthLayout
      onPress={() => navigation.goBack()}
      submit={() => handleSubmit()}
      buttonTitle="Log in"
      title="Log in to your account"
      text="Access your washe account"
      subtitle="Welcome back"
      //   googleAuth={signIn}
      isLoading={isPending}
    >
      <View>
        <InputBox
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          hasError={!!errors.email && touched.email}
          error={errors.email}
          label="Email address"
          placeholder="First name"
        />
        <InputBox
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          hasError={!!errors.password && touched.password}
          error={errors.password}
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("onboarding", {
            screen: "forgot_password",
          })
        }
      >
        <XStack
          width="100%"
          gap={4}
          marginTop={-6}
          marginHorizontal="auto"
          alignItems="center"
        >
          <Text fontSize={15} color={theme?.primary4?.val}>
            Forgot password
          </Text>
          <Arrow color={theme?.primary4?.val} />
        </XStack>
      </TouchableOpacity>
    </AuthLayout>
  );
};
