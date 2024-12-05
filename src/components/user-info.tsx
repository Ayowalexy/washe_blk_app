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
            <Image
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/4b51/cee6/d27dccad68facb12a73eb3def8dc1d6d?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nGa9rX7Yq0quuwr2iMVhyaP6BX67SI8mP7DLox6VsgrqYUsj0KvG4ajCHGQZju9VZpODuYdCvU8cqipBsv2-85XMLq0pxnvdJlugzNPdV69o4gbCJzqU0oucoXnpIZ2QGo46qFFm7VBaRVkbiVBaWwXXtPVkTfDUQi8LagH9y4PshBTl2bDXrU8QsGX9ORGKpBhwbIhVy6W1vb7F5J~p-lnN~2h2qDsFuTeMSKsalRYpbLcEmdiqCHp9BPXKmOyGSmet2nzBXwkTNd2Yo8gakmMxEQZ0vDPVbXopRPidbt8wPv8pQTwYbpK4R9c7k659ayql1HkSfQBxAxpOik9qNg__",
              }}
              backgroundSize="cover"
              backgroundPosition="center"
              width={50}
              height={50}
              borderRadius={100}
            />
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
                    {estimated_time?.length as any > 12
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
