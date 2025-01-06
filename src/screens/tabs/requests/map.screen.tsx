import { Dimensions, StyleSheet } from "react-native";
import Map from "../../../components/map";
import { View } from "../../../libs/View";
import { useState } from "react";
import {
  CustomerInfoModal,
  PriceAcceptedModal,
  PriceRejectedModal,
  PriceReview,
  ReweighModal,
} from "../../../components/modals";
import { SuccessModal } from "../../../components/layouts/success-layout";
import { ArrowBack } from "../../../utils/assets";
import { ArrowLeft, ArrowRight } from "../../../../assets/images/svg/icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RequestStackParamList } from "../../../navigation/requests.navigation";
import { AppRootStackParamList } from "../../../navigation/app.root.types";

type MaoScreenProps = NativeStackScreenProps<AppRootStackParamList, "tab">;
export const MapScreen = ({ navigation }: MaoScreenProps) => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <View
      width={Dimensions.get("window").width}
      height={Dimensions.get("window").height}
    >
      <Map
        modalHeight={"auto"}
        children={
          <>
            <CustomerInfoModal
              showSuccessModal={showSuccessModal}
              setShowSuccessModal={setShowSuccessModal}
              visible={visible}
              setVisible={setVisible}
              show={show}
              setShow={setShow}
            />
            <PriceReview
              show={show}
              setShow={setShow}
              setShowModal={setShowModal}
            />
            <PriceAcceptedModal
              setVisible={setVisible}
              setShowModal={setShowModal}
              showModal={showModal}
            />
            <ReweighModal />
            <PriceRejectedModal />
            <SuccessModal
              visible={showSuccessModal}
              onPress={() => {
                setShowSuccessModal(false);
                navigation.navigate("tab", {
                  screen: "Home",
                });
              }}
              setVisible={setShowSuccessModal}
              onReject={() => null}
              title="Dropped off"
              buttonTitle="Back to home"
              icon={
                <>
                  <ArrowLeft />
                </>
              }
              iconPosition="center"
              text="Your Tuesday afternoon drop-off was successful"
            />
          </>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  statusBar: {},
});
