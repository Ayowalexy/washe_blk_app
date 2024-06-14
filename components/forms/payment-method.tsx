import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import {
  ApplePay,
  AtmCard,
  Paypal,
  Stripe,
  GooglePay,
} from "../../utils/assets";

import { View } from "../libs/view";
import { Text } from "../libs/text";

const PaymentMethods = [
  {
    img: AtmCard,
    id: 1,
    name: "Credit/Debit Card",
    text: "Use your bank card information",
  },
  {
    img: Stripe,
    id: 2,
    name: "Stripe",
    text: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    img: Paypal,
    id: 3,
    name: "Paypal",
    text: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    img: ApplePay,
    id: 4,
    name: "Apple Pay",
    text: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    img: GooglePay,
    id: 5,
    name: "Google pay",
    text: "Lorem ipsum dolor sit amet consectetur",
  },
];

export const PaymentMethod = ({ onPress }: { onPress: () => void }) => {
  return (
    <View width={"85%"} marginHorizontal="auto">
      <View marginTop={20}>
        {PaymentMethods.slice(0, 1).map((item) => (
          <TouchableOpacity key={item.id} onPress={onPress}>
            <View
              key={item.id}
              width={"100%"}
              height={120}
              borderColor={"$secondary1"}
              borderWidth={1}
              alignItems="center"
              justifyContent="center"
            >
              <View style={styles.shadow}>
                <item.img />
              </View>
              <Text color={"$black1"} fontSize={14} marginTop={12}>
                {item.name}
              </Text>
              <Text color={"$black3"} fontSize={12} marginTop={2}>
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        {PaymentMethods.slice(1).map((item) => (
          <View key={item.id} style={styles.flexItem}>
            <TouchableOpacity>
              <View
                width={"100%"}
                height={120}
                borderColor={"#e0e0e0"}
                borderWidth={1}
                alignItems="center"
                justifyContent="center"
                style={styles.itemContainer}
              >
                <View style={styles.shadow} width={40} height={24}>
                  <item.img />
                </View>
                <Text color={"$black1"} fontSize={14} marginTop={12}>
                  {item.name}
                </Text>
                <Text color={"$black3"} fontSize={12} marginTop={2}>
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "rgba(103, 114, 229, 0.08)",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    // Shadow for Android
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  flexItem: {
    width: "48%",
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});
