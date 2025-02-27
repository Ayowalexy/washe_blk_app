import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import { View } from "../libs/view";
import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { CardImg } from "../../utils/assets-png";
import { useAtom } from "jotai";
import {
  LaundryRequests,
  laundryRequestServiceNameAtom,
} from "../../src/atoms";
import { useGetLaundryType } from "../../api/queries";
import moment from "moment";

type TrackDetail = {
  //   trackDate: string;
  action: string;
  id: string;
};

type Props = {
  trackDetails: TrackDetail[];
};
export const TrackForm = ({ trackDetails }: Props) => {
  const theme = useTheme();
  const [oneLaundryRequest, setOneLaundryRequest] = useAtom(LaundryRequests);
  const [laundryType, setLaundryType] = useState("");

  const { refetch, data } = useGetLaundryType();
  const [LaundryServiceName] = useAtom(laundryRequestServiceNameAtom);

  useEffect(() => {
    if (data?.data) {
      const serviceName = Array.isArray(data?.data)
        ? data.data.find(
            (elem: any) => elem.id === oneLaundryRequest.laundryRequestTypeId
          )?.name
        : null;
      setLaundryType(serviceName);
    }
  }, [data?.data, oneLaundryRequest]);

  return (
    <>
      <View width="100%" paddingHorizontal={28} paddingBottom={150}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
        >
          <View width="100%" style={styles.container}>
            <ImageBackground
              imageStyle={styles.cardImage}
              source={CardImg}
              style={styles.card}
            >
              <View padding={22}>
                <YStack>
                  <Text
                    color={"$blue1"}
                    fontSize={12}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    Service
                  </Text>
                  <Text
                    color={"$white1"}
                    fontSize={14}
                    fontFamily="$body"
                    fontWeight="500"
                    marginTop={5}
                    textTransform="capitalize"
                  >
                    {LaundryServiceName}
                  </Text>
                </YStack>
                <YStack marginTop={20}>
                  <Text
                    color={"$blue1"}
                    fontSize={12}
                    fontFamily="$body"
                    fontWeight="500"
                  >
                    Laundry Type
                  </Text>

                  <Text
                    color={"$white1"}
                    fontSize={14}
                    fontFamily="$body"
                    fontWeight="500"
                    marginTop={5}
                    textTransform="capitalize"
                  >
                    {laundryType}
                  </Text>
                </YStack>
              </View>
            </ImageBackground>
          </View>
          <View
            width={"100%"}
            height="auto"
            padding={20}
            marginTop={27}
            borderWidth={1}
            borderRadius={12}
            borderColor={"$black4"}
          >
            <Text color={theme?.primary2?.val} fontSize={15}>
              Request Tracking
            </Text>
            <View marginTop={20}>
              <FlatList
                data={trackDetails}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <YStack>
                    <XStack alignItems="flex-start" gap={17}>
                      <YStack>
                        <View
                          width={24}
                          height={24}
                          borderRadius={50}
                          backgroundColor={theme?.darkGrey?.val}
                        />
                        {index < trackDetails.length - 1 && (
                          <>
                            {trackDetails[index].action !==
                            trackDetails[index + 1].action ? (
                              <YStack
                                marginTop={5}
                                marginBottom={5}
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Text fontSize={8} color={"$black4"}>
                                  |
                                </Text>
                                <Text fontSize={8} color={"$black4"}>
                                  |
                                </Text>
                                <Text fontSize={8} color={"$black4"}>
                                  |
                                </Text>
                                <Text fontSize={8} color={"$black4"}>
                                  |
                                </Text>
                              </YStack>
                            ) : (
                              <YStack marginTop={5} marginBottom={5} />
                            )}
                          </>
                        )}
                      </YStack>
                      <YStack>
                        <Text
                          fontSize={13}
                          color="$black3"
                          textTransform="capitalize"
                        >
                          {item.action}
                        </Text>
                      </YStack>
                    </XStack>
                  </YStack>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 149,
    width: "100%",
    marginTop: 20,
  },
  card: {
    width: "100%",
    height: "100%",
  },
  cardImage: {
    borderRadius: 20,
  },
  scrollview: {
    height: "95%",
  },
  savebtn: {
    alignItems: "center",
    justifyContent: "center",
  },
});
