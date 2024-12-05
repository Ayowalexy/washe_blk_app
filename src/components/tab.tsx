import { useTheme, XStack } from "tamagui";
import { View } from "../libs/View";
import { Text } from "../libs/Text";
import { Dispatch, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SetStateAction } from "jotai";

type TabProps = {
  setSelectedTab: Dispatch<SetStateAction<any>>;
};
export const Tabs = ({ setSelectedTab }: TabProps) => {
  const theme = useTheme();
  const [selected, setSelected] = useState<number>(0);

  const handleSelected = (id: number, name: string) => {
    setSelected(id);
    setSelectedTab(name);
  };

  return (
    <View
      width={"100%"}
      height={60}
      borderRadius={100}
      marginTop={20}
      backgroundColor={theme.lightGrey?.val}
    >
      <FlatList
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 7,
          paddingHorizontal: 10,
        }}
        data={["Pick-Up", "Delivery", "Completed"]}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleSelected(index, item)}>
            <View
              style={
                selected === index ? styles.selectedtab : styles.nonSelectedTab
              }
            >
              <Text
                fontSize={12}
                fontWeight={selected === index ? 600 : 400}
                color={theme.black1?.val}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  selectedtab: {
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 45,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#F0F3F4",
    borderRadius: 100,
  },
  nonSelectedTab: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
