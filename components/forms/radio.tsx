import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type RadioProps = {
  id: string;
  active: boolean;
  handleActive: (id: string) => void;
};

export const Radio: React.FC<RadioProps> = ({ id, active, handleActive }) => {
  return (
    <TouchableOpacity onPress={() => handleActive(id)}>
      <View style={active ? styles.active : styles.inactive} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  inactive: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DFE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 6,
    borderColor: "#00D158",
    alignItems: "center",
    justifyContent: "center",
  },
});
