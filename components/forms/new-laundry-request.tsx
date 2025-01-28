import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../libs/view";
import { Basket } from "../../utils/assets-png";
import { Text } from "../libs/text";
import { useTheme } from "tamagui";
import React, { useState } from "react";
import { LaundryServiceType } from "../../api/types";
import { useAtom } from "jotai";
import {
  laundryRequestServiceIdAtom,
  laundryRequestServiceNameAtom,
} from "../../src/atoms";

interface LaundryType {
  name: string;
  description: string;
}

interface Props {
  data: LaundryServiceType[];
}
export const NewLaundryRequest: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const [active, setActive] = useState(1);

  const handleActive = (id: number) => {
    setActive(id);
  };
  const [laundryServiceId, setLaundryServiceId] = useAtom(
    laundryRequestServiceIdAtom
  );
  const [laundryServiceName, setLaundryServiceName] = useAtom(
    laundryRequestServiceNameAtom
  );

  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {data?.map((elem, id) => (
          <TouchableOpacity
            style={styles.flexItem}
            key={id}
            onPress={() => {
              handleActive(id);
              setLaundryServiceId(elem.id);
              setLaundryServiceName(elem.name);
              console.log(laundryServiceId, 'kk')
            }}
          >
            <View
              style={active === id ? styles.itemContainer2 : styles.itemContainer}
            >
              <View style={styles.image}>
                <Image source={Basket} style={styles.img} />
              </View>
              <Text
                fontSize={14}
                fontWeight={"600"}
                color={theme?.black1?.val}
                paddingVertical={5}
                textAlign="center"
              >
                {elem.name}
              </Text>
              <Text fontSize={12} textAlign="center" color={theme?.black3?.val}>
                {elem.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scroll: {
 
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: "#DCEAFE",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "65%",
    height: "65%",
    position: "absolute",
    left: "15%",
    right: 0,
    top: 22,
  },
  flexItem: {
    width: "48%",
    marginBottom: 15,
  },
  itemContainer: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E7E9",
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 190,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer2: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#FFFCEB",
    height: 190,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    flexWrap: "wrap",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120

  },
});
