import { YStack } from "tamagui";
import { SvgXml } from "react-native-svg";
import { Text } from "../../../src/libs/Text";

export const HistoryIcon = ({
  color,
  focused,
}: {
  color: string;
  focused: boolean;
}) => (
  <YStack justifyContent="center" alignItems="center">
    {focused ? (
      <SvgXml
        xml={`<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2125_10683)">
<path d="M10.5001 1.66675C15.1026 1.66675 18.8334 5.39758 18.8334 10.0001C18.8334 14.6026 15.1026 18.3334 10.5001 18.3334C5.89758 18.3334 2.16675 14.6026 2.16675 10.0001H3.83341C3.83341 13.6817 6.81841 16.6667 10.5001 16.6667C14.1817 16.6667 17.1667 13.6817 17.1667 10.0001C17.1667 6.31841 14.1817 3.33341 10.5001 3.33341C8.44675 3.33341 6.61008 4.26175 5.38758 5.72091L7.16675 7.50008H2.16675V2.50008L4.20591 4.53841C5.73341 2.78008 7.98675 1.66675 10.5001 1.66675ZM11.3334 5.83341V9.65425L14.0359 12.3567L12.8567 13.5359L9.66675 10.3442V5.83341H11.3334Z" fill="#0468F6"/>
</g>
<defs>
<clipPath id="clip0_2125_10683">
<rect width="20" height="20" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>                    
      `}
        width={20}
        height={20}
      />
    ) : (
      <SvgXml
        xml={`<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2125_10675)">
<path d="M10.5001 1.66675C15.1026 1.66675 18.8334 5.39758 18.8334 10.0001C18.8334 14.6026 15.1026 18.3334 10.5001 18.3334C5.89758 18.3334 2.16675 14.6026 2.16675 10.0001H3.83341C3.83341 13.6817 6.81841 16.6667 10.5001 16.6667C14.1817 16.6667 17.1667 13.6817 17.1667 10.0001C17.1667 6.31841 14.1817 3.33341 10.5001 3.33341C8.20842 3.33341 6.18675 4.48925 4.98758 6.25008H7.16675V7.91675H2.16675V2.91675H3.83341V5.00008C5.35341 2.97508 7.77425 1.66675 10.5001 1.66675ZM11.3334 5.83341V9.65425L14.0359 12.3567L12.8567 13.5359L9.66675 10.3442V5.83341H11.3334Z" fill="#6C8693"/>
</g>
<defs>
<clipPath id="clip0_2125_10675">
<rect width="20" height="20" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>                   
    `}
        width={20}
        height={20}
      />
    )}
    <Text
      fontWeight={focused ? "600" : "400"}
      color={color}
      fontSize={12}
      marginTop={-2}
    >
      History
    </Text>
  </YStack>
);
