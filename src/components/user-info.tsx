import { Image, useTheme, XStack, YStack } from "tamagui";
import { View } from "../libs/View";
import { Text } from "../libs/Text";
import { ArrowUp, Clock, Location } from "../../assets/images/svg/icons";
import { ReactNode, useState } from "react";
import { TouchableOpacity } from "react-native";

type Props = {
  address?: string;
  children?: ReactNode;
  toggle?: VoidFunction;
  isOpen?: boolean;
  showBorder?: boolean;
  firstName?: string;
  lastName?: string;
  requestType?: string;
  estimated_time?: string;
  image: string;
};
export const UserInfo = ({
  address = "891 Ranchview Dr. Richardson, California 62639",
  children,
  toggle,
  isOpen,
  showBorder,
  firstName,
  lastName,
  requestType,
  image,
  estimated_time,
}: Props) => {
  const theme = useTheme();
  return (
    <View width="100%">
      <TouchableOpacity onPress={toggle}>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          width={"auto"}
        >
          <XStack gap={12} alignItems="center">
            {image ? (
              <Image
                source={{
                  uri: image,
                }}
                backgroundSize="cover"
                backgroundPosition="center"
                width={50}
                height={50}
                borderRadius={100}
              />
            ) : (
              <View
                width={50}
                height={50}
                borderRadius={100}
              backgroundColor={theme.primary8?.val}
              />
            )}
            <YStack>
              <Text
                marginBottom={2}
                fontWeight={600}
                fontSize={16}
                fontFamily="$body"
              >
                {firstName} {lastName}
              </Text>
              <XStack
                justifyContent="space-between"
                alignItems="center"
                gap={8}
              >
                <XStack gap={4} alignItems="center">
                  <Clock />
                  <Text fontSize={12} color={theme?.black3?.val}>
                    {(estimated_time?.length as any) > 12
                      ? `${estimated_time?.substring(0, 12)}...`
                      : estimated_time}
                  </Text>
                </XStack>

                <Text color={theme?.black3?.val} fontSize={12}>
                  |
                </Text>
                <XStack gap={4} alignItems="center">
                  <Location />
                  <Text fontSize={12} color={theme?.black3?.val}>
                    {address.length > 16
                      ? `${address.substring(0, 16)}...`
                      : address}
                  </Text>
                </XStack>
              </XStack>
            </YStack>
          </XStack>
          <TouchableOpacity onPress={toggle}>
            <View
              style={{
                transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
                borderColor: showBorder ? theme.borderLine?.val : "none",
                borderWidth: showBorder ? 1 : 0,
                padding: showBorder ? 10 : 0,
                borderRadius: showBorder ? 100 : 0,
              }}
            >
              <ArrowUp />
            </View>
          </TouchableOpacity>
        </XStack>
      </TouchableOpacity>
      {isOpen && <View>{children}</View>}
    </View>
  );
};
