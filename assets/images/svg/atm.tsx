import { SvgXml } from "react-native-svg";
import { View } from "../../../components/libs/view";
import { StyleSheet } from "react-native";

export const AtmCard = () => (
  <View
    width={36}
    height={24}
    backgroundColor='#fff'
    // style={styles.atm}
    justifyContent="center"
    alignItems="center"
  >
    <SvgXml
      xml={`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.875 6.875H18.125M1.875 7.5H18.125M4.375 11.875H9.375M4.375 13.75H6.875M3.75 16.25H16.25C17.2855 16.25 18.125 15.4105 18.125 14.375V5.625C18.125 4.58947 17.2855 3.75 16.25 3.75H3.75C2.71447 3.75 1.875 4.58947 1.875 5.625V14.375C1.875 15.4105 2.71447 16.25 3.75 16.25Z" stroke="#6C8693" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>      
    `}
      width={20}
      height={20}
    />
  </View>
);
const styles = StyleSheet.create({
  atm: {
    shadowColor: "rgba(103, 114, 229, 0.08)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 1,
  },
});
