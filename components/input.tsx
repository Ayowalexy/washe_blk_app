import React, { useState } from "react";
import { Label, Input, useTheme, TextArea } from "tamagui";
import { View } from "./libs/view";
import { YStack } from "tamagui";
import { ComponentProps } from "react";
import { Text } from "./libs/text";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
} & ComponentProps<typeof Input>;

export const InputBox = ({
  placeholder,
  label,
  secureTextEntry,
  ...others
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const theme = useTheme();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <YStack marginBottom={22}>
      <Text fontSize={14} color={theme?.black1} marginBottom={8}>
        {label}
      </Text>
      <View style={{ position: "relative" }}>
        <Input
          placeholder={placeholder}
          {...others}
          secureTextEntry={!isPasswordVisible && secureTextEntry}
          borderWidth={1}
          borderColor={theme?.black4}
          backgroundColor="transparent"
          placeholderTextColor={theme?.placeholder}
          fontSize={14}
          fontFamily="$body"
          fontWeight="500"
          height={50}
          style={{ paddingRight: 40 }} // Adjust padding to make space for the icon
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isPasswordVisible ? (
              <Ionicons name="eye-outline" size={17} color={"black"} />
            ) : (
              <Ionicons name="eye-off-outline" size={17} color={"black"} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </YStack>
  );
};

type InputProps = {
  label: string;
} & ComponentProps<typeof TextArea>;
export const InputTextarea = ({
  label,
  placeholder,
  ...others
}: InputProps) => {
  const theme = useTheme();
  return (
    <YStack marginBottom={22}>
      <Text fontSize={14} color={theme?.black1} marginBottom={8}>
        {label}
      </Text>
      <View style={{ position: "relative" }}>
        <TextArea
          minHeight={105}
          placeholder={placeholder}
          {...others}
          borderWidth={1}
          borderColor={theme?.black4}
          backgroundColor="transparent"
          placeholderTextColor={theme?.placeholder}
          fontSize={14}
          fontFamily="$body"
          fontWeight="500"
          height={50}
          style={{ paddingRight: 40 }} // Adjust padding to make space for the icon
        />
      </View>
    </YStack>
  );
};
