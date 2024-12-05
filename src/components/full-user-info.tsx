import { Image, ScrollView, useTheme, XStack, YStack } from "tamagui";
import { View } from "../libs/View";
import { Text } from "../libs/Text";
import { Dispatch } from "react";
import { SetStateAction } from "jotai";
import { TouchableOpacity } from "react-native";
import { Clock, Location } from "../../assets/images/svg/icons";

type UserInfoProps = {
  show?: boolean;
  setShow?: Dispatch<SetStateAction<any>>;
};
export const FullUserInfo = ({ show, setShow }: UserInfoProps) => {
  const theme = useTheme();
  const address = "891 Ranchview Dr. Richardson, California 62639";

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text marginTop={20} fontWeight={600} fontSize={20}>
          Timeline
        </Text>
        <YStack
          borderBottomColor={theme.borderLine?.val}
          borderBottomWidth={1}
          paddingBottom={16}
          paddingTop={16}
          gap={6}
        >
          <Text fontSize={12} fontWeight={500} color={theme.black3?.val}>
            Address
          </Text>
          <Text fontSize={14.6} fontWeight={500} color={theme.black1?.val}>
            891 Ranchview Dr. Richardson, California 62639
          </Text>
        </YStack>
        <YStack
          borderBottomColor={theme.borderLine?.val}
          borderBottomWidth={1}
          paddingBottom={16}
          paddingTop={16}
          gap={6}
        >
          <Text fontSize={12} fontWeight={500} color={theme.black3?.val}>
            5 Mins Away
          </Text>
          <Text fontSize={14.6} fontWeight={500} color={theme.black1?.val}>
            Gabriel Inyamah
          </Text>
        </YStack>
        <YStack
          borderBottomColor={theme.borderLine?.val}
          borderBottomWidth={1}
          paddingBottom={16}
          paddingTop={20}
          gap={6}
        >
          <Text fontFamily="$body" fontWeight={600} fontSize={20}>
            Laundry Details
          </Text>
          <Text
            fontSize={12}
            fontWeight={500}
            color={theme.black3?.val}
            marginTop={5}
          >
            Address
          </Text>
          <Text fontSize={14.6} fontWeight={500} color={theme.black1?.val}>
            891 Ranchview Dr. Richardson, California 62639
          </Text>
        </YStack>
      </ScrollView>
    </View>
  );
};
