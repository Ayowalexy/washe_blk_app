import { XStack, YStack, useTheme } from "tamagui";
import { Text } from "../libs/text";
import { MessageIcon, PurpleIcon, WhatsappIcon } from "../../utils/assets";
import { View } from "../libs/view";
import { InputBox, InputTextarea } from "../input";
import { Button } from "../button";
import { ScrollView } from "react-native";
import { useState } from "react";

export const ContactForm = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const isButtonDisabled = !email || !message;
  return (
    <ScrollView style={{ width: "84%" }}>
      <YStack
        width="100%"
        marginTop={30}
        marginHorizontal="auto"
        backgroundColor={theme.secondary3?.val}
        padding={18}
        alignItems="center"
      >
        <Text color={theme?.black3?.val} fontSize={12} textAlign="center">
          Contact washe via
        </Text>
        <XStack marginTop={12} gap={8}>
          <MessageIcon />
          <WhatsappIcon />
          <PurpleIcon />
        </XStack>
      </YStack>
      <XStack alignItems="center" marginTop={15} gap={10}>
        <View borderBottomColor="$accent4" borderBottomWidth={1} width="22%" />
        <Text color="$black3" fontSize={14}>
          or send message now
        </Text>
        <View borderBottomColor="$accent4" borderBottomWidth={1} width="22%" />
      </XStack>
      <YStack marginTop={20}>
        <InputBox
           onChangeText={setEmail}
          label="Email address"
          placeholder="Email address"
        />
        <InputTextarea
          onChangeText={setMessage}
          label="Message"
          placeholder="Type your message here..."
        />
      </YStack>
      <View paddingTop={35}>
        <Button
          disabled={isButtonDisabled}
          title="Send message"
          onPress={() => null}
        />
      </View>
    </ScrollView>
  );
};
