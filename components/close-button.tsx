import { useTheme } from "tamagui";
import { View } from "./libs/view";
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ArrowBack } from "../utils/assets";

export const CloseButton = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        width={56}
        height={56}
        borderWidth={1}
        borderColor={'$black4'}
        borderRadius={50}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <EvilIcons name="close" size={24} color="#051923" />
      </View>
    </TouchableOpacity>
  );
};

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        width={56}
        height={56}
        borderWidth={1}
        borderColor={"$black4"}
        borderRadius={50}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <ArrowBack width={24} height={24} />
      </View>
    </TouchableOpacity>
  );
};
