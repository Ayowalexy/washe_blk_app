import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { View } from "./libs/view";
import { Text } from "./libs/text";
import { useTheme } from "tamagui";

interface ButtonProps extends Partial<TouchableOpacityProps> {
  title: string;
  color?: string;
  onPress: () => void;
  fontSize?: number;
  width?: string;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  showIcon?: boolean;
  height?: number;
}

export const Button = ({
  title,
  color = "$primary3",
  onPress,
  icon,
  fontSize = 16,
  height = 62,
  textColor = "$white1",
  disabled,
  showIcon = false,
  loading = false,
  ...otherProps
}: ButtonProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={styles.button}
      onPress={onPress}
      {...otherProps}
    >
      <View
        backgroundColor={disabled || loading ? "$secondary9" : color}
        style={styles.btn}
        height={height}
      >
        {loading ? (
          <ActivityIndicator size="small" color={"white"} />
        ) : (
          <Text
            fontFamily="$body"
            color={textColor}
            fontWeight="600"
            fontSize={fontSize}
          >
            {title}
          </Text>
        )}
        {showIcon && (
          <View style={{ position: "absolute", right: 30 }}>{icon}</View>
        )}
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
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    position: "relative",
  },
});
