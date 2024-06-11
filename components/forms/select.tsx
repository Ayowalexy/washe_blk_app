import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "../libs/text";
import { View } from "../libs/view";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "tamagui";

export type optionProps = {
  label: string;
  // item?: {label:string} | undefined
  value: string;
};

type selectProps = {
  options: optionProps[];
  search?: boolean;
  onChange: (e: optionProps) => void;
  err?: boolean;
  errMsg?: string;
  extraStyles?: StyleProp<ViewStyle>;
  placeholder?: string;
  label?: string;
};

export const Select = ({
  options,
  search = false,
  onChange,
  err,
  errMsg,
  extraStyles,
  placeholder,
  label,
}: selectProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (item: optionProps) => {
    console.log(item);
    return (
      <View style={{ marginVertical: 3 }}>
        <Text style={styles.selectedTextStyle} fontFamily="$body">
          {item?.label}
        </Text>
      </View>
    );
  };
  const theme = useTheme();
  return (
    <View style={[{ width: "100%", marginBottom: 20 }, extraStyles]}>
      <Text fontSize={14} marginBottom={-14} color="$black1">
        {label}
      </Text>
      <Dropdown
        renderRightIcon={(visible?: boolean) => (
          <FontAwesome name="angle-down" size={18} color="#131515" />
        )}
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={options}
        maxHeight={300}
        search={search}
        labelField={"label"}
        valueField={"value"}
        placeholder={
          !isFocus
            ? placeholder
              ? placeholder
              : "Select Laundry type"
            : "Select Laundry type"
        }
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item);
          setValue(item.value);
          setIsFocus(false);
        }}
        iconStyle={styles.iconStyle}
        renderItem={renderItem}
      />
      {err && (
        <Text style={{ color: "red", fontSize: 12, paddingLeft: "10%" }}>
          {errMsg}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    // padding: 30,
    width: "100%",
  },
  dropdown: {
    width: "100%",
    borderColor: "#D3DBDF",
    borderWidth: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    alignSelf: "center",
    // marginBottom: 20
  },
  iconStyle: {
    marginRight: 20,
    paddingRight: 30,
    fontSize: 13,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    paddingLeft: 10,
    color: "#6C8693",
    fontWeight: "400",
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingLeft: 20,
    color: "#000",
    fontWeight: "500",
  },
  icon: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label_tag: {
    color: "#000",
    fontSize: 12,
    paddingBottom: 5,
  },
});
