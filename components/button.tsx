import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { View } from "./libs/view";
import { StyleSheet } from "react-native";
import { Text } from "./libs/text";
import { useTheme } from "tamagui";

interface button extends Partial<TouchableOpacityProps> {
  title: string;
  color?: string;
  onPress: () => void;
  fontSize?: number;
  width?: string;
  textColor?: string;
  disabled?: boolean;
}
export const Button = ({
  title,
  color = "$primary3",
  onPress,
  fontSize = 16,
  textColor = "$white1",
  disabled,
  ...otherProps
}: button) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.button}
      onPress={onPress}
      {...otherProps}
    >
      <View
        backgroundColor={disabled ? "$secondary9" : color}
        style={styles.btn}
      >
        <Text
          fontFamily="$body"
          color={textColor}
          fontWeight="600"
          fontSize={fontSize}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  btn: {
    height: 62,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
