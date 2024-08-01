import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "../libs/text";
import { View } from "../libs/view";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "tamagui";

export type OptionProps = {
  label: string;
  value: string;
};

type SelectProps = {
  options: OptionProps[];
  search?: boolean;
  onChange: (option: OptionProps) => void;
  extraStyles?: StyleProp<ViewStyle>;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  hasError?: boolean;
  error?: string;
};

export const Select = ({
  options,
  search = false,
  onChange,
  extraStyles,
  placeholder,
  label,
  defaultValue,
  hasError,
  error,
}: SelectProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const theme = useTheme();

  const renderItem = (item: OptionProps) => {
    return (
      <View style={{ marginVertical: 3 }}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };
  useEffect(() => {
    if (defaultValue){
        setValue(defaultValue)
    }
  },[defaultValue])
  return (
    <View style={[{ width: "100%", marginBottom: 20 }, extraStyles]}>
      <Text fontSize={14} marginBottom={-14} color="$black1">
        {label}
      </Text>
      <Dropdown
        renderRightIcon={(visible?: boolean) => (
          <FontAwesome name="angle-down" size={18} color="#131515" />
        )}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={options}
        maxHeight={200}
        search={search}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setIsFocus(false);
          setValue(item.value);
          onChange(item);
        }}
        iconStyle={styles.iconStyle}
        renderItem={renderItem}
      />
      {hasError && (
        <Text fontSize={9} color="$red1">
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  placeholderStyle: {
    fontSize: 14,
    paddingLeft: 10,
    color: "#6C8693",
    fontWeight: "400",
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingLeft: 10,
    color: "#000",
    fontWeight: "400",
  },
  iconStyle: {
    marginRight: 20,
    paddingRight: 30,
    fontSize: 13,
  },
});

export default Select;
