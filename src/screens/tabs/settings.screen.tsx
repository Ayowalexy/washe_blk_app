import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { XStack, YStack, useTheme } from "tamagui";

import { DEVICE_HEIGHT } from "../../constants";

import { useState } from "react";

import Toast from "react-native-toast-message";
import {
  ContactIcon,
  EditIcon,
  IdentityIcon,
  LocationIcon,
  LockIcon,
  LogoutIcon,
  PaymentIcon,
  PdfFile,
  PenIcon,
  UsaIcon,
} from "../../utils/assets";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamList } from "../../navigation/app.root.types";
import { useAtom } from "jotai";
import { persistentUserAtom } from "../../atoms";
import { useGetAvatars, useGetCurrentUser } from "../../../api/queries";
import { deleteToken } from "../../../resources/storage";
import { View } from "../../libs/View";
import { Text } from "../../libs/Text";
import { Avatar12, CardImg } from "../../utils/assets-png";
import { FormModal } from "../../components/modals/form-modal";
import {
  AddressForm,
  ContactForm,
  EditForm,
  PaymentInfo,
} from "../../components/forms";
import { PaymentMethod } from "../../components/forms/payment-method";
import { CreditCard } from "../../components/credit-card.component";
import { Button } from "../../libs/button";
import { SuccessModal } from "../../components/layouts/success-layout";
import { SubmitId } from "../../components/id-verification.component";
import { useSubmitDocument } from "../../../api/mutation";
import * as DocumentPicker from "expo-document-picker";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyIcon } from "../../../assets/images/svg/icons";
import { Security } from "../../components/security.component";
import { ChangePassword } from "../../components/change-password";
import { AvailabilityCard } from "../../components/avaialbility.component";

const List = [
  {
    image: PenIcon,
    title: "Edit Profile",
    subText: "Edit user profile information",
  },
  {
    image: LocationIcon,
    title: "Location",
    subText: "Update your address and availability",
  },
  {
    image: PaymentIcon,
    title: "Payment Information",
    subText: "Update payment information",
  },
  {
    image: IdentityIcon,
    title: "Identity",
    subText: "Manage your state-issued ID",
  },
  {
    image: LockIcon,
    title: "Security",
    subText: "Reach out to us for support!",
  },
  {
    image: ContactIcon,
    title: "Contact",
    subText: "Reach out to us for support!",
  },
];

type SettingScreenProps = NativeStackScreenProps<
  AppRootStackParamList,
  "onboarding"
>;
export const Settings = ({ navigation }: SettingScreenProps) => {
  const theme = useTheme();
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openAddressInput, setOpenAddressInput] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [openIdentity, setOpenIdentity] = useState(false);
  const [editIdentity, setEditIdentity] = useState(false);
  const [openSecurity, setOpenSecurity] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [selected, setSelected] = useState(1);
  const [user, setUser] = useAtom(persistentUserAtom);
  const [selectedImage, setSelectedImage] = useState("");
  // const { mutate, isPending } = useUpdateProfile();
  const { refetch } = useGetCurrentUser();
  const { mutate, isPending } = useSubmitDocument();
  const [fileSizeKB, setFileSizeKB] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleSelect = (id: number) => {
    setSelected(id);
  };

  const openModal = (title: string) => {
    switch (title) {
      case "Edit Profile":
        setOpenEdit(true);
        break;
      case "Location":
        setOpenAddress(true);
        break;
      case "Payment Information":
        setOpenPayment(true);
        break;
      case "Identity":
        setOpenIdentity(true);
        break;
      case "Contact":
        setOpenContact(true);
        break;
      case "Security":
        setOpenSecurity(true);
        break;
      default:
        break;
    }
  };

  const { data } = useGetAvatars();

  const handleLogout = async () => {
    try {
      await deleteToken("accessToken");
      navigation.navigate("onboarding", {
        screen: "login",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const { handleSubmit, values, setFieldValue } = useFormik({
    initialValues: {
      fileName: "",
      fileUrl: "",
    },

    onSubmit: (values: any) => {
      console.log(values.fileName, "filename");

      // const newUser = {
      //   fileName: values.fileName,
      //   fileUrl: "file",
      // };
      // mutate(newUser, {
      //   onSuccess: async (data) => {
      //     console.log(data, "datas");
      //     Toast.show({
      //       type: "customSuccess",
      //       text1: "Verification successfully",
      //     });
      //     const { data: datas } = await refetch();
      //     console.log(datas?.data, "user saved");
      //     setUser(datas?.data);
      //     setVisible(true);
      //   },
      //   onError: (error: any) => {
      //     Toast.show({
      //       type: "customError",
      //       text1:
      //         error?.response?.data.message || "An error occurred, try again",
      //     });
      //     console.log(error?.response?.data, "rrr");
      //   },
      // });
    },
  });

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.assets) {
      const asset = result.assets[0];
      console.log(asset);
      if (asset.size) {
        const fileSizeBytes = asset.size;
        const fileSizeInKB = fileSizeBytes / 1024;
        setFileSizeKB(fileSizeInKB);
      }
      setFieldValue("fileName", asset.name);
      setFieldValue("fileUrl", "file");
      setFieldValue("size", fileSizeKB.toString());
    }
  };
  return (
    <View
      height={DEVICE_HEIGHT}
      backgroundColor={theme?.white1?.val}
      width="100%"
      paddingHorizontal={20}
      paddingVertical={80}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          fontFamily="$body"
          fontSize={18}
          color={"$black1"}
          fontWeight={500}
          paddingTop={30}
        >
          Settings
        </Text>

        <View style={styles.cardContainer}>
          <ImageBackground
            source={CardImg}
            style={styles.cardImg}
            imageStyle={styles.cardImage}
          >
            <View
              justifyContent="center"
              alignItems="center"
              paddingVertical={27}
            >
              <TouchableOpacity
                style={{ position: "relative" }}
                onPress={() => setOpenList(true)}
              >
                <View width={74} height={74}>
                  <Image
                    source={user?.avatar ? { uri: user?.avatar } : Avatar12}
                    style={styles.user}
                  />
                </View>
                <View position="absolute" top={40} right={-4}>
                  <EditIcon />
                </View>
              </TouchableOpacity>
              <Text
                fontSize={16}
                fontFamily="$body"
                fontWeight="600"
                color={theme?.white1?.val}
              >
                {user?.firstName} {user?.lastName}
              </Text>
              <Text fontSize={14} fontWeight="500" color={theme?.white1?.val}>
                {user?.email}
              </Text>
              <XStack
                justifyContent="center"
                alignItems="center"
                marginTop={3}
                gap={2}
              >
                <UsaIcon />
                <Text
                  fontSize={14}
                  marginLeft={3}
                  fontWeight="500"
                  color={theme?.white1?.val}
                >
                  {user?.phoneNumber}
                </Text>
              </XStack>
            </View>
          </ImageBackground>
        </View>
        <FlatList
          data={List}
          contentContainerStyle={styles.content}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <YStack>
              <TouchableOpacity onPress={() => openModal(item?.title)}>
                <XStack>
                  <View>
                    <item.image />
                  </View>
                  <YStack marginLeft={13}>
                    <Text
                      fontFamily="$body"
                      color={theme?.black1?.val}
                      fontSize={15}
                      fontWeight={500}
                    >
                      {item?.title}
                    </Text>
                    <Text
                      fontFamily="$body"
                      color={theme?.black3?.val}
                      fontSize={12}
                      fontWeight={500}
                    >
                      {item.subText}
                    </Text>
                  </YStack>
                </XStack>
              </TouchableOpacity>
              {index !== 5 && (
                <View
                  borderBottomColor="#E2E7E9"
                  borderBottomWidth={1}
                  paddingVertical={10}
                />
              )}
            </YStack>
          )}
        />
        <TouchableOpacity onPress={() => handleLogout()}>
          <XStack
            alignItems="center"
            marginTop={22}
            borderColor={theme?.black4?.val}
            borderWidth={1}
            padding={20}
            borderRadius={12}
          >
            <LogoutIcon />
            <Text
              fontFamily="$body"
              color={theme?.black1?.val}
              fontSize={15}
              marginLeft={13}
            >
              Log Out
            </Text>
          </XStack>
        </TouchableOpacity>
      </ScrollView>
      <FormModal
        visible={openEdit}
        setVisible={setOpenEdit}
        close={() => setOpenEdit(false)}
        title="Edit Profile"
        text="Edit user profile information"
        show_button={false}
      >
        <EditForm />
      </FormModal>
      <FormModal
        visible={openList}
        setVisible={setOpenList}
        text="Select a user icon."
        title="Change your avatar"
        close={() => setOpenList(false)}
      >
        <View width="70%" marginLeft={"5%"}>
          <FlatList
            contentContainerStyle={styles.contentContainer}
            data={data?.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleSelect(item.id);
                  // handleEditProfilePic(item.url);
                }}
              >
                <View width={74} height={74} borderRadius={50}>
                  <Image
                    source={{
                      uri: "https://firebasestorage.googleapis.com/v0/b/mudo-app-function.appspot.com/o/avatar%2Favatar-5.png?alt=media&",
                    }}
                    width={70}
                    height={70}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </FormModal>
      <FormModal
        visible={openAddress}
        setVisible={setOpenAddress}
        close={() => setOpenAddress(false)}
        title="Location Information"
        text="Update address and availability"
        show_button={false}
      >
        <AvailabilityCard />
        <YStack
          width="80%"
          marginTop={30}
          marginHorizontal="auto"
          backgroundColor={theme.secondary3}
          padding={18}
        >
          <Text color={theme?.black3?.val} fontFamily="$body" fontSize={12}>
            Home address
          </Text>
          <Text
            color={theme.red2?.val}
            fontFamily="$body"
            fontSize={14}
            marginTop={10}
          >
            {user?.verificationDocument?.address}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setOpenAddress(false);
              setOpenAddressInput(true);
            }}
          >
            <Text
              color={theme.black5?.val}
              fontFamily="$body"
              fontSize={14}
              marginTop={20}
            >
              Change address
            </Text>
            <View borderWidth={0.6} width="42.5%" />
          </TouchableOpacity>
        </YStack>
      </FormModal>
      <FormModal
        visible={openAddressInput}
        setVisible={setOpenAddressInput}
        close={() => setOpenAddressInput(false)}
        goBack={true}
        title="Address Information"
        text="Please enter your pickup and delivery location."
        show_button={false}
      >
        <AddressForm />
      </FormModal>
      <FormModal
        visible={openContact}
        setVisible={setOpenContact}
        close={() => setOpenContact(false)}
        title="Contact"
        text="Reach out to us for support!"
        show_button={false}
      >
        <ContactForm />
      </FormModal>
      <FormModal
        visible={openPayment}
        setVisible={setOpenPayment}
        close={() => setOpenPayment(false)}
        title="Payment Information"
        text="Update payment information"
        show_button={true}
        button={
          <Button
            textSize={14}
            style={{ height: 56 }}
            title="Add new payment method"
            onPress={() => {
              setOpenPayment(false);
              setOpenPaymentMethod(true);
            }}
          />
        }
      >
        <PaymentInfo />
      </FormModal>
      <FormModal
        visible={openPaymentMethod}
        setVisible={setOpenPaymentMethod}
        close={() => setOpenPaymentMethod(false)}
        title="Select Payment Method"
        text="Select a option below to add a new payment method"
        show_button={false}
      >
        <PaymentMethod
          onPress={() => {
            setOpenPaymentMethod(false);
            setOpenCard(true);
          }}
        />
      </FormModal>
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
      <FormModal
        height="45%"
        visible={openIdentity}
        setVisible={setOpenIdentity}
        close={() => setOpenIdentity(false)}
        title="State-issued ID"
        text="Manage your identity document"
        show_button={false}
      >
        <XStack
          width="90%"
          marginTop={30}
          marginHorizontal="auto"
          backgroundColor={theme.secondary3}
          padding={18}
          gap={8}
        >
          <PdfFile />
          <YStack>
            <Text fontFamily="$body" color={theme?.black1?.val} fontSize={13}>
              {user?.verificationDocument?.fileName}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setOpenIdentity(false);
                setEditIdentity(true);
              }}
            >
              <Text
                fontSize={12}
                fontFamily="$body"
                color={theme?.black1?.val}
                style={{
                  textDecoration: 1,
                  textDecorationStyle: "solid",
                  textDecorationLine: "underline",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </YStack>
        </XStack>
      </FormModal>
      <FormModal
        title="Change ID"
        text="Manage your identity document"
        close={() => {
          setEditIdentity(false);
        }}
        visible={editIdentity}
        setVisible={setEditIdentity}
      >
        <SubmitId
          buttonVisible={true}
          values={values}
          fileSizeKB={fileSizeKB}
          onPress={() => pickDocument()}
        />
      </FormModal>
      <FormModal
        title="Security"
        text="Edit user profile information"
        close={() => {
          setOpenSecurity(false);
        }}
        visible={openSecurity}
        setVisible={setOpenSecurity}
      >
        <Security
          onPress={() => {
            setOpenSecurity(false);
            setOpenChangePassword(true);
          }}
        />
      </FormModal>
      <FormModal
        title="Security"
        text="Edit user profile information"
        close={() => {
          setOpenChangePassword(false);
        }}
        visible={openChangePassword}
        setVisible={setOpenChangePassword}
      >
        <ChangePassword />
      </FormModal>
      <SuccessModal
        visible={openSuccess}
        onPress={() => {
          setOpenSuccess(false);
          setEditIdentity(true);
        }}
        setVisible={setOpenSuccess}
        onReject={() => null}
        title="Your credit card was added successfully "
        buttonTitle="Done"
        iconPosition="center"
        text="You can now start making laundry request with washe"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignSelf: "center",
    height: 194,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 26,
  },
  contentContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 35,
    marginHorizontal: "auto",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  cardImage: {
    borderRadius: 20,
  },
  user: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  content: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E2E7E9",
    marginTop: 30,
    padding: 20,
    gap: 20,
    borderRadius: 12,
  },
});
