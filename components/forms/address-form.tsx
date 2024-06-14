import React, { useState } from "react";
import { useTheme } from "tamagui";
import { InputTextarea } from "../input";
import { View } from "../libs/view";
import { Text } from "../libs/text";
import { Button } from "../button";

export const AddressForm = () => {
  const [address, setAddress] = useState("");
  const theme = useTheme();

  const handleInputChange = (text: string) => {
    setAddress(text);
  };

  return (
    <View width="88%" marginTop={30} marginHorizontal={"auto"}>
      <InputTextarea
        label="Home address"
        placeholder="Home address"
        value={address}
        onChangeText={(address) => handleInputChange(address)}
      />

      <View
        marginTop={6}
        marginHorizontal="auto"
        backgroundColor={theme.secondary3}
        padding={18}
        width="100%"
      >
        <Text color={theme.red2?.val} fontSize={12}>
          Note
        </Text>
        <Text color={theme.secondary7?.val} fontSize={14}>
          New addresses will be subject to another verification.
        </Text>
        <Text color={theme.secondary7?.val} fontSize={14} marginTop={14}>
          Home address provided above should be an Arkansas address as Washe
          only operate within the Arkansas area.
        </Text>
      </View>
      <View paddingTop={105}>
        <Button title="Save" onPress={() => {}} disabled={!address} />
      </View>
    </View>
  );
};
