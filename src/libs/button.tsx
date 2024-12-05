import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { useTheme } from "tamagui";
import { View } from "./View";
import { Text } from "./Text";

interface ButtonProps {
  title: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  iconPosition?: "left" | "right" | "center";
  color?: string;
  textColor?: string;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  variant?: "filled" | "secondary" | "outline";
  textVariant?: string;
  textSize?: number;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  onPress,
  isLoading = false,
  disabled = false,
  iconPosition = "left",
  color = "",
  textColor = "$white1",
  iconSize = 20,
  style = {},
  variant = "filled",
  textVariant = "label",
  textSize,
  ...props
}) => {
  const theme = useTheme();

  const resolvedTextColor = theme[textColor]?.val || textColor || "#FFFFFF";

  const renderIcon = () => {
    if (!icon) return null;
    return React.cloneElement(icon as React.ReactElement, {
      size: iconSize,
      color: resolvedTextColor,
      style: [
        iconPosition === "left"
          ? styles.iconLeft
          : iconPosition === "center"
          ? styles.iconCenter
          : styles.iconRight,
      ],
    });
  };

  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    variant === "filled"
      ? { backgroundColor: color || theme.primary3?.val }
      : variant === "secondary"
      ? {
          backgroundColor: color || theme.primary4?.val,
        }
      : variant === "outline"
      ? {
          backgroundColor: "transparent",
          borderColor: theme?.borderLine?.val,
          borderWidth: 1,
        }
      : { backgroundColor: color || theme.primary3?.val },
    style,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={buttonStyle}
      accessibilityLabel={title}
      accessible
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={resolvedTextColor} />
      ) : (
        <View style={styles.contentContainer}>
          {iconPosition === "left" && renderIcon()}
          <View alignItems="center" flex={1}>
            <Text
            fontFamily='$body'
              fontWeight="500"
              variant={textVariant as any}
              fontSize={textSize}
              color={resolvedTextColor}
            >
              {title}
            </Text>
          </View>
          {iconPosition === "right" && (
            <View style={styles.iconWrapper}>{renderIcon()}</View>
          )}
          {iconPosition === "center" && (
            <View style={styles.iconWrapper2}>{renderIcon()}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    width: "80%",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {},
  iconWrapper: {
    position: "absolute",
    right: 16,
  },
  iconWrapper2: {
    position: "absolute",
    left: "25%",
  },
  iconCenter: {
    justifyContent: "center",
  },
});
