import React, { useState } from "react";
import { Label, Input, useTheme, TextArea } from "tamagui";
import { View } from "./libs/view";
import { YStack } from "tamagui";
import { ComponentProps, ReactNode } from "react";
import { Text } from "./libs/text";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
  leftElement?: ReactNode;
  error?: string;
  hasError?: boolean;
} & ComponentProps<typeof Input>;

export const InputBox = ({
  placeholder,
  label,
  secureTextEntry,
  leftElement,
  error,
  hasError,
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
        {leftElement && <View>{leftElement}</View>}
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
          style={{
            paddingLeft: leftElement ? 40 : 10,
            paddingRight: secureTextEntry ? 40 : 10,
          }}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: [{ translateY: -12 }],
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
      {hasError && (
        <Text fontSize={9} color="$red1" fontFamily="$body" fontWeight="400">
          {error}
        </Text>
      )}
    </YStack>
  );
};

type InputProps = {
  label: string;
  leftElement?: ReactNode;
  hasError?: boolean;
  error?: string;
} & ComponentProps<typeof TextArea>;

export const InputTextarea = ({
  label,
  placeholder,
  leftElement,
  hasError,
  error,
  ...others
}: InputProps) => {
  const theme = useTheme();
  return (
    <YStack marginBottom={22}>
      <Text fontSize={14} color={theme?.black1} marginBottom={8}>
        {label}
      </Text>
      <View style={{ position: "relative" }}>
        {leftElement && (
          <View
            style={{
              position: "absolute",
              left: 10,
              top: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {leftElement}
          </View>
        )}
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
          style={{
            paddingLeft: leftElement ? 40 : 10,
          }}
        />
        {hasError && (
          <Text fontSize={9} color="$red1" fontFamily="$body" fontWeight="400">
            {error}
          </Text>
        )}
      </View>
    </YStack>
  );
};
