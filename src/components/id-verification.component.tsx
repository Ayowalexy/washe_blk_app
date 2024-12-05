import { useTheme, XStack, YStack } from "tamagui";
import { View } from "../libs/View";
import { Text } from "../libs/Text";
import { TouchableOpacity } from "react-native";
import { File, PdfFile } from "../utils/assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../libs/button";

interface Values {
  fileName?: string;
  fileUrl?: string;
}

interface Props {
  values: Values;
  onPress: VoidFunction;
  fileSizeKB: number;
  buttonVisible?: boolean;
}
export const SubmitId = ({
  fileSizeKB,
  onPress,
  values,
  buttonVisible = false,
}: Props) => {
  const theme = useTheme();

  return (
    <KeyboardAwareScrollView
      style={{ width: "82%" }}
      showsVerticalScrollIndicator={false}
    >
      <View marginTop={30}>
        <Text fontSize={14} color={theme?.black1} marginBottom={8}>
          ID upload
        </Text>
        <YStack
          alignItems="center"
          width="100%"
          borderColor={theme?.black4?.val}
          borderWidth={1}
          height={178}
          borderRadius={10}
          paddingVertical={30}
        >
          <TouchableOpacity onPress={onPress} style={{ alignItems: "center" }}>
            <File />
            <Text
              color={theme?.primary3?.val}
              fontSize={13}
              textDecorationStyle="solid"
              textDecorationLine="underline"
              textDecorationColor={theme?.primary3?.val}
            >
              Browse file
            </Text>
          </TouchableOpacity>
          <Text
            fontSize={13}
            marginTop={7}
            color={theme?.red?.val}
            fontFamily="$body"
            fontWeight="500"
          >
            Format accepted- png, jpg, pdf.
          </Text>
          <Text
            fontSize={13}
            marginTop={4}
            color={theme?.black3?.val}
            fontFamily="$body"
            fontWeight="500"
          >
            maximum file size 5 MB
          </Text>
        </YStack>

        {values.fileName && (
          <View marginTop={25}>
            <XStack>
              <PdfFile />
              <YStack marginLeft={10}>
                <Text
                  fontSize={14}
                  color={theme?.black1}
                  fontFamily="$body"
                  fontWeight="500"
                >
                  {values.fileName}
                </Text>
                <XStack alignItems="center" marginTop={5}>
                  <Text color={theme?.black3} fontSize={12} marginRight={7}>
                    {Number(fileSizeKB).toFixed(2)} KB
                  </Text>
                  <Text color={theme?.black3} fontSize={12}>
                    |
                  </Text>
                  <TouchableOpacity></TouchableOpacity>
                  <Text color={theme?.red1} fontSize={12} marginLeft={7}>
                    Delete
                  </Text>
                </XStack>
              </YStack>
            </XStack>

            <YStack
              marginTop={50}
              backgroundColor={theme.secondary3}
              padding={24}
            >
              <Text
                color={theme?.black1}
                fontSize={13}
                fontFamily="$body"
                fontWeight="500"
              >
                Accepted document type
              </Text>
              <View marginTop={8}>
                {[
                  "Driver's License",
                  "Non-Driver Photo ID",
                  "U.S. Passport",
                  "Foreign Passport",
                  "U.S. Military ID Card",
                  "U.S. Military Dependent's",
                  " ID Card Tribal Card",
                ].map((elem) => (
                  <View
                    key={elem}
                    flexDirection="row"
                    alignItems="center"
                    gap={8}
                    marginTop={3}
                  >
                    <View
                      width={4}
                      height={4}
                      backgroundColor={theme?.secondary7?.val}
                    />
                    <Text color={theme?.secondary7?.val} fontSize={15}>
                      {elem}
                    </Text>
                  </View>
                ))}
              </View>
            </YStack>
          </View>
        )}
        {buttonVisible && (
          <Button
            title="Save"
            onPress={() => null}
            style={{ height: 56, marginTop: 30 }}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};
