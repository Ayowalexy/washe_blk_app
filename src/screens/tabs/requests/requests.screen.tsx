import { ScrollView, StyleSheet } from "react-native";
import { Text } from "../../../libs/Text";
import { View } from "../../../libs/View";
import { useTheme, XStack } from "tamagui";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants";
import { Tabs } from "../../../components/tab";
import { UserInfo } from "../../../components/user-info";
import { Button } from "../../../libs/button";
import { useEffect, useState } from "react";
import { SuccessModal } from "../../../components/layouts/success-layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RequestStackParamList } from "../../../navigation/requests.navigation";
import { LaundryRequests } from "../../../components/laundry-requests";
import { useAtom } from "jotai";
import { oneAcceptedRequestAtom, requestTypeAtom } from "../../../atoms";
import { useGetRequests } from "../../../../api/queries";

type RequestScreenProps = NativeStackScreenProps<
  RequestStackParamList,
  "request_screen"
>;
export const RequestScreen = ({ navigation }: RequestScreenProps) => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState("Pick-Up");
  const [requestType, setRequestType] = useAtom(requestTypeAtom);
  const [acceptedRequest, setAcceptedRequest] = useAtom(oneAcceptedRequestAtom);

  const { refetch, data } = useGetRequests();

  useEffect(() => {
    refetch();
  }, [refetch]);
  console.log(data?.data, "all riders reqs");

  const toggleUserInfo = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const filteredRequests = data?.data?.filter(
    (elem: any) => elem.type === selectedTab.replace("-", "_").toLowerCase()
  );

  const [visible, setVisible] = useState(false);

  console.log(requestType, "requestType");
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        height={DEVICE_HEIGHT}
        width={DEVICE_WIDTH}
        backgroundColor={theme.white1?.val}
        paddingTop={80}
        paddingHorizontal={25}
      >
        <Text
          fontSize={24}
          color={theme.black1?.val}
          fontWeight={600}
          letterSpacing={0.15}
        >
          Requests
        </Text>
        <Tabs setSelectedTab={setSelectedTab} />
        <View marginTop={20}>
          {filteredRequests?.map((elem: any, index: number) => (
            <View marginTop={25} key={index}>
              <UserInfo
                firstName={elem.firstName}
                lastName={elem.lastName}
                isOpen={selectedIndex === index}
                address={elem.location}
                estimated_time={elem.estimatedTime}
                toggle={() => toggleUserInfo(index)}
                children={
                  <View
                    width={"98%"}
                    marginTop={20}
                    borderRadius={16}
                    marginHorizontal={"auto"}
                    paddingVertical={20}
                    backgroundColor={theme.lightGrey?.val}
                    paddingHorizontal={30}
                  >
                    <XStack gap={14} paddingBottom={10}>
                      <Button
                        textSize={14}
                        variant="outline"
                        onPress={() => null}
                        title="Reject"
                        textColor={theme.black1?.val}
                        style={{ height: 47, width: "49%" }}
                      />
                      <Button
                        textSize={14}
                        onPress={() => {
                          navigation.navigate("map_screen");
                          setRequestType(elem.type);
                          setAcceptedRequest({
                            firstName: elem?.firstName,
                            lastName: elem?.lastName,
                            location: elem?.location,
                            estimatedTime: elem?.estimatedTime,
                            baseFee: elem?.baseFee,
                            amount: elem?.amount,
                            id: elem?.id
                          });
                        }}
                        title="Accept Request"
                        textColor={theme.white1?.val}
                        style={{
                          height: 47,
                          width: "49%",
                          backgroundColor: theme.black1?.val,
                        }}
                      />
                    </XStack>
                  </View>
                }
              />
              <View
                borderBottomColor={theme.borderLine?.val}
                borderBottomWidth={index < Array.length + 1 ? 0.7 : 0}
                marginTop={25}
              />
            </View>
          ))}
        </View>
      </View>
      {/* <SuccessModal
        buttonTitle="Proceed"
        top="78%"
        close
        onReject={() => null}
        closeButton="Reject"
        height="50%"
        title="You’re Almost There"
        text="Your washe driver account have been successfully created"
        onPress={() => {
          setVisible(false);
          navigation.navigate("map_screen");
        }}
        visible={visible}
        setVisible={setVisible}
      /> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#fff",
  },
});
