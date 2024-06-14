import { Input, XStack, useTheme } from "tamagui";
import CountryCodePicker from "../country-code";
import { InputBox } from "../input";
import { View } from "../libs/view";
import { Button } from "../button";

export const EditForm = () => {
  const theme = useTheme();
  return (
    <View width={"85%"} marginHorizontal={"auto"} marginTop={25}>
      <InputBox placeholder="Karen" label="First name" />
      <InputBox placeholder="James" label="Last name" />
      <InputBox placeholder="karenjames@gmail.com" label="Email address" />
      <XStack
        width="100%"
        borderColor={theme?.black4?.val}
        height={50}
        borderWidth={1}
        borderRadius={10}
        paddingHorizontal={10}
      >
        <View width="33%">
          <CountryCodePicker />
        </View>
        <Input
          borderWidth={0}
          outlineWidth={0}
          width="67%"
          placeholder=""
          backgroundColor="transparent"
          placeholderTextColor={theme?.placeholder}
          fontSize={14}
          fontFamily="$body"
          fontWeight="500"
          height={46}
          marginVertical={"auto"}
        />
      </XStack>
      <View paddingTop={105}>
        <Button
          title="Save"
          onPress={() => {
            null;
          }}
        />
      </View>
    </View>
  );
};
