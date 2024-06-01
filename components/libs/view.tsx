import { View as Box } from "@tamagui/core";
import { View as RNView, SafeAreaView } from "react-native";
import { ComponentProps } from "react";

export type ViewProps = RNView["props"] &
  Partial<ComponentProps<typeof Box>> & { safeArea?: boolean };

export const View = (props: ViewProps) => {
  if (props?.safeArea) {
    return (
      <SafeAreaView>
        <Box {...props}>{props.children}</Box>
      </SafeAreaView>
    );
  }
  return <Box {...props}>{props.children}</Box>;
};
