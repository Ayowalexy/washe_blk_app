import React, { useState } from "react";
import DateTimePicker, {
  DatePickerOptions,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { TouchableOpacity, TextInput } from "react-native";
import { YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { View } from "../libs/view";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  mode?: "time" | "date";
  label: string;
  value?: Date;
  onChange: (date: Date) => void;
  datePickerProps?: Partial<DatePickerOptions>;
  hasError?: boolean;
  error?: string;
};

export const DatePicker = ({
  mode = "date",
  label,
  value = new Date(),
  onChange,
  datePickerProps,
  hasError,
  error,
}: Props) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const theme = useTheme();

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      const currentDate: Date = selectedDate;
      onChange(currentDate);
      setShowPicker(false);
    } else if (event.type === "dismissed") {
      setShowPicker(false);
    }
  };

  const formattedDate =
    mode === "date" ? value.toLocaleDateString() : value.toLocaleTimeString();

  return (
    <YStack>
      <Text fontSize={14} color={theme?.black1} marginBottom={8}>
        {label}
      </Text>
      <View
        borderWidth={1}
        marginBottom={20}
        height={50}
        alignItems="center"
        justifyContent="center"
        borderRadius={9}
        borderColor={theme?.black4}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{
              padding: 8,
              flex: 1,
            }}
            value={formattedDate}
            onFocus={toggleDatePicker}
            editable={false}
          />
          <TouchableOpacity
            onPress={toggleDatePicker}
            style={{ marginRight: 10 }}
          >
            <AntDesign name="calendar" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {showPicker && (
        <DateTimePicker
          mode={mode}
          onChange={onDateChange}
          display="spinner"
          value={value}
          {...datePickerProps}
        />
      )}
      {hasError && (
        <Text fontSize={9} color="$red1" marginTop={-18} marginBottom={5}>
          {error}
        </Text>
      )}
    </YStack>
  );
};
