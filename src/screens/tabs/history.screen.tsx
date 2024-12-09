import { ScrollView, useTheme } from "tamagui";
import { DEVICE_HEIGHT } from "../../constants";
import { Text } from "../../libs/Text";
import { View } from "../../libs/View";
import { View as DefaultView } from "react-native";
import { RequestFilter } from "../../components/request-filter.component";
import { LaundryRequests } from "../../components/laundry-requests";
import moment from "moment";
import { UserCard } from "../../components/cards/user-card";
import { UserHistoryCard } from "../../components/cards/user-history-card";

export const History = () => {
  const theme = useTheme();
  // const groupedRequests = LaundryRequests?.reduce((acc: any, request: any) => {
  //   const date = moment(request.created_at).format("YYYY-MM-DD");
  //   if (!acc[date]) {
  //     acc[date] = [];
  //   }
  //   acc[date].push(request);
  //   return acc;
  // }, {});
  const groupedRequests = LaundryRequests?.reduce((acc: any, request: any) => {
    // Parse date with moment
    const date = moment(request.date, "Do MMM YYYY").format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(request);
    return acc;
  }, {});

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
          History
        </Text>
        <View marginTop={12}>
          <RequestFilter />
        </View>
        {groupedRequests &&
          Object.keys(groupedRequests).map((date, index) => (
            <DefaultView
              key={date}
            >
              <Text
                fontFamily="$body"
                fontWeight="500"
                style={{
                  fontSize: 15,
                  color: theme?.black3?.val,
                  textTransform: "uppercase",

                  marginTop: 30,
                  marginBottom: 10,
                }}
              >
                {moment(date).isSame(moment(), "day")
                  ? "Today"
                  : moment(date).format("MMMM Do, YYYY")}
              </Text>
              {groupedRequests[date].map((request: any, index: any) => (
                <>
                  <UserHistoryCard
                    estimatedTime=""
                    location={request?.location}
                    firstName={request?.firstName}
                    lastName={request?.lastName}
                  />
                  {index !== groupedRequests[date].length - 1 && (
                    <View borderBottomWidth={1} borderBottomColor="$black4" />
                  )}
                </>
              ))}
            </DefaultView>
          ))}
      </ScrollView>
    </View>
  );
};
