import { FlatList } from "react-native";
import { DEVICE_WIDTH } from "../constants";
import { LaundryRequests } from "./laundry-requests";
import { View } from "../libs/View";
import { RequestCard } from "./cards/request-card";
import { EmptyRequest } from "./cards/empty-request";
import { Text } from "../libs/Text";
import { useGetRequests } from "../../api/queries";

export const OngoingRequests = () => {
  const { refetch, data } = useGetRequests();
  console.log(data?.data, "all riders req");
  const itemWidth =
    data?.data.length === 1 ? DEVICE_WIDTH - 80 : DEVICE_WIDTH * 0.63;
  return (
    <View
      marginTop={20}
      backgroundColor="$lightGrey"
      paddingHorizontal={20}
      paddingTop={20}
      paddingBottom={70}
    >
      <Text fontSize={15} fontFamily="$body" fontWeight={600} color="$black1">
        Ongoing Requests
      </Text>
      <FlatList
        style={{ width: DEVICE_WIDTH, paddingBottom: 30 }}
        contentContainerStyle={{ gap: 15 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        data={data?.data}
        renderItem={({ item }) => (
          <View width={itemWidth}>
            <RequestCard
              requestType={item.type as any}
              firstName={item.firstName}
              name={`${item.firstName} ${item.lastName}`}
              img={item.img}
              date={item.date}
              status={item.status as any}
              onPress={() => null}
              text={item.estimatedTime}
              location={item.location}
            />
          </View>
        )}
        ListEmptyComponent={<EmptyRequest />}
      />
    </View>
  );
};
