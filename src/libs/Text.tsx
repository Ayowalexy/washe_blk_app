import { ComponentProps, ReactNode } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Text as Typography } from "tamagui";

type Variant = "title" | "body" | "caption" | "label" | "subtitle";
export type TypographyProps = {
  variant?: Variant;
  children?: ReactNode | string;
} & Partial<ComponentProps<typeof Typography>>;

const typographyMap: Record<
  Variant,
  Pick<ComponentProps<typeof Typography>, "lineHeight" | "fontSize">
> = {
  title: {
    fontSize: "$10", // 25
    lineHeight: 30,
  },
  subtitle: {
    fontSize: "$9", //22
    lineHeight: 23,
  },
  label: {
    fontSize: "$5", // 18
    lineHeight: 16,
  },
  body: {
    fontSize: "$6", // 16
    lineHeight: 25,
  },
  caption: {
    fontSize: "$3", //12
    lineHeight: 12,
  },
};

export const Text = ({
  variant = "body",
  color = "$black1",
  fontWeight = "400",
  children,
  ...props
}: TypographyProps) => {
  let textFontSize: { fontSize: number; lineHeight: number } = {
    fontSize: 16,
    lineHeight: 20,
  };
  if (
    typeof props.fontSize === "number" ||
    typeof props.fontSize === "string"
  ) {
    textFontSize.fontSize = RFValue(Number(props.fontSize) - 2);
    textFontSize.lineHeight = RFValue(Number(props.fontSize) - 2) + 5.4;
  }
  return (
    <Typography
      {...typographyMap[variant]}
      color={color}
      fontWeight={fontWeight}
      {...props}
      style={[
        props.style,
        Boolean(textFontSize.fontSize) && {
          fontSize: textFontSize.fontSize,
          // lineHeight: textFontSize.lineHeight,
        },
      ]}
    >
      {children}
    </Typography>
  );
};
