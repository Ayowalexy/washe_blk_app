import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { XStack } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";

export default function CountryCodePicker() {
  const [countryCode, setCountryCode] = useState("US");
  const [country, setCountry] = useState({
    cca2: "US",
    callingCode: "1",
    flag: "https://flagcdn.com/w320/us.png",
  });

  const [callingCode, setCallingCode] = useState("1");
  const [visible, setVisible] = useState(false);

  const onSelect = (selectedCountry: any) => {
    setCountry({
      cca2: selectedCountry.cca2,
      callingCode: selectedCountry.callingCode[0],
      flag: `https://flagcdn.com/w320/${selectedCountry.cca2.toLowerCase()}.png`,
    });
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.button}>
        <XStack gap={8}>
          <Image source={{ uri: country.flag }} width={30} height={20} />
          <Text style={styles.buttonText}>+{country.callingCode}</Text>
          <FontAwesome name="angle-down" size={20} color="black" />
        </XStack>
      </TouchableOpacity>
      <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCountryNameButton={false}
        withCallingCode
        onSelect={onSelect}
        visible={visible}
        onClose={() => setVisible(false)}
        containerButtonStyle={styles.hiddenButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#F6F8F9",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
   
  },
  buttonText: {
    color: "#051923",
    fontSize: 16,
  },
  hiddenButton: {
    position: "relative",
    display: "none",
  },
});
