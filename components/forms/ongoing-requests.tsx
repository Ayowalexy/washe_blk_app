import { YStack } from "tamagui"
import { Text } from "../libs/text"
import { View } from "../libs/view"
import { FlatList } from "react-native"
import { EmptyRequest } from "../empty-request"
import { DEVICE_WIDTH } from "../../src/constants"
import { LaundryRequests } from "../laundry-request"
import { RequestCard } from "../request-card"


export const OngoingRequests = () => {
    const itemWidth =
    LaundryRequests.length === 1 ? DEVICE_WIDTH - 90 : DEVICE_WIDTH * 0.46;
    return(
        <YStack
        backgroundColor="$secondary8"
        marginTop={20}
        height="auto"
        padding={15}
        paddingTop={25}
        paddingBottom={0}
        borderRadius={15}
      >
        <Text>Ongoing Requests</Text>
        <View>
          <FlatList
            ListEmptyComponent={<EmptyRequest />}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ width: DEVICE_WIDTH, paddingBottom: 30 }}
            contentContainerStyle={{ gap: 15 }}
            data={LaundryRequests}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={(item) => (
              <View width={itemWidth}>
                <RequestCard
                  text={item.item.text}
                  date={item.item.date}
                  status={item.item.status}
                  image={item.item.img}
                />
              </View>
            )}
          />
          <View></View>
        </View>
      </YStack>
    )
}