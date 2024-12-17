import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "../../../components/libs/view";
import { Text } from "../../../components/libs/text";
import { XStack, YStack, useTheme } from "tamagui";

import { DEVICE_HEIGHT } from "../../constants";
import { CardImg, user as userImg } from "../../../utils/assets-png";
import {
  ContactIcon,
  EditIcon,
  LocationIcon,
  LogoutIcon,
  PaymentIcon,
  PenIcon,
  UsaIcon,
} from "../../../utils/assets";
import { useState } from "react";
import { FormModal } from "../../../components/form-modal";
import { Button } from "../../../components/button";
import { EditForm } from "../../../components/forms/edit-form";
import {
  AddressForm,
  ContactForm,
  CreditCard,
  PaymentInfo,
  PaymentMethod,
} from "../../../components/forms";
import { SuccessModal } from "../../../components/modal";
import { AvatarList } from "../../../components/avatar";
import { UserData, persistentUserAtom } from "../../atoms";
import { useAtom } from "jotai";
import { deleteToken } from "../../../resources/storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRootStackParamsList } from "../../../navigation/app.roots.types";
import { BottomTabParamList } from "../../../navigation/tabs.navigation";
import { useGetAvatars, useGetCurrentUser } from "../../../api/queries";
import { useUpdateProfile } from "../../../api/mutations";
import Toast from "react-native-toast-message";

const List = [
  {
    image: PenIcon,
    title: "Edit Profile",
    subText: "Edit user profile information",
  },
  {
    image: LocationIcon,
    title: "Address Information",
    subText: "Update your addresses",
  },
  {
    image: PaymentIcon,
    title: "Payment Information",
    subText: "Update payment information",
  },
  {
    image: ContactIcon,
    title: "Contact",
    subText: "Reach out to us for support!",
  },
];

type SettingScreenProps = NativeStackScreenProps<
  AppRootStackParamsList,
  "home_stack"
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
  const [selected, setSelected] = useState(1);
  const [user, setUser] = useAtom(persistentUserAtom);
  const [selectedImage, setSelectedImage] = useState("");
  const { mutate, isPending } = useUpdateProfile();
  const { refetch } = useGetCurrentUser();

  const handleSelect = (id: number) => {
    setSelected(id);
  };

  const openModal = (title: string) => {
    switch (title) {
      case "Edit Profile":
        setOpenEdit(true);
        break;
      case "Address Information":
        setOpenAddress(true);
        break;
      case "Payment Information":
        setOpenPayment(true);
        break;
      case "Contact":
        setOpenContact(true);
        break;
      default:
        break;
    }
  };
  console.log(user, "current");

  const { data } = useGetAvatars();
  console.log(user?.avatar, "avatars");

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
  const handleEditProfilePic = (url: string) => {
    const details = {
      avatar: url,
    };
    mutate(details, {
      onSuccess: async (response) => {
        const { data } = await refetch();
        console.log(data.data, "data.data");
        setOpenList(false)
        setUser(data?.data);
        Toast.show({
          type: "customSuccess",
          text1: "User updated successfully",
        });
      },
      onError: (error: any) => {
        Toast.show({
          type: "customError",
          text1:
            JSON.stringify(error?.response?.data?.message) ||
            "An error occured, try again",
        });
        console.log(error?.response?.data?.message);
      },
    });
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
        <Text paddingTop={30}>Settings</Text>

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
                    source={user?.avatar ? { uri: user?.avatar } : userImg}
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
                    <Text color={theme?.black1?.val} fontSize={15}>
                      {item?.title}
                    </Text>
                    <Text color={theme?.black3?.val} fontSize={13}>
                      {item.subText}
                    </Text>
                  </YStack>
                </XStack>
              </TouchableOpacity>
              {index !== 3 && (
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
            <Text color={theme?.black1?.val} fontSize={15} marginLeft={13}>
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
        visible={openAddress}
        setVisible={setOpenAddress}
        close={() => setOpenAddress(false)}
        title="Address Information"
        text="Update user addresses"
        show_button={false}
      >
        <YStack
          width="80%"
          marginTop={30}
          marginHorizontal="auto"
          backgroundColor={theme.secondary3}
          padding={18}
        >
          <Text color={theme?.black3?.val} fontSize={12}>
            Home address
          </Text>
          <Text color={theme.red2?.val} fontSize={14} marginTop={10}>
            4517 Washington Ave. Manchester, Kentucky 39495
          </Text>
          <TouchableOpacity
            onPress={() => {
              setOpenAddress(false);
              setOpenAddressInput(true);
            }}
          >
            <Text color={theme.black5?.val} fontSize={14} marginTop={20}>
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
        visible={openPayment}
        setVisible={setOpenPayment}
        close={() => setOpenPayment(false)}
        title="Payment Information"
        text="Update payment information"
        show_button={true}
        button={
          <Button
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
        text="Select an option below to add a new payment method"
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
        visible={openContact}
        setVisible={setOpenContact}
        close={() => setOpenContact(false)}
        title="Contact"
        text="Reach out to us for support!"
        show_button={false}
      >
        <ContactForm />
      </FormModal>
      <SuccessModal
        onPress={() => setOpenSuccess(false)}
        text="You can now start making laundry request with washe"
        title="Your credit card was added successfully "
        visible={openSuccess}
        setVisible={setOpenSuccess}
      />
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
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                handleSelect(item.id)
                handleEditProfilePic(item.url)
              }}>
                {selected === index ? (
                  <View height={78} width={78} borderRadius={50}>
                    <View width={74} height={74} borderRadius={50}>
                      <Image
                        source={{ uri: item.url }}
                        style={styles.cardImg}
                      />
                    </View>
                  </View>
                ) : (
                  <View width={74} height={74} borderRadius={50}>
                    <Image source={{ uri: item.url }} style={styles.cardImg} />
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </FormModal>
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
