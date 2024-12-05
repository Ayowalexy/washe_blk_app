import { YStack } from "tamagui";
import { SvgXml } from "react-native-svg";
import { Text } from "../../../src/libs/Text";

export const RequestIcon = ({
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
<g clip-path="url(#clip0_2125_10647)">
<path d="M15.5258 13.8476L19.095 17.4159L17.9158 18.5951L14.3475 15.0259C13.0197 16.0903 11.3683 16.6692 9.66663 16.6667C5.52663 16.6667 2.16663 13.3067 2.16663 9.16675C2.16663 5.02675 5.52663 1.66675 9.66663 1.66675C13.8066 1.66675 17.1666 5.02675 17.1666 9.16675C17.169 10.8684 16.5901 12.5199 15.5258 13.8476Z" fill="#0468F6"/>
</g>
<defs>
<clipPath id="clip0_2125_10647">
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
<g clip-path="url(#clip0_2125_10754)">
<path d="M15.5258 13.8476L19.095 17.4159L17.9158 18.5951L14.3475 15.0259C13.0197 16.0903 11.3683 16.6692 9.66663 16.6667C5.52663 16.6667 2.16663 13.3067 2.16663 9.16675C2.16663 5.02675 5.52663 1.66675 9.66663 1.66675C13.8066 1.66675 17.1666 5.02675 17.1666 9.16675C17.169 10.8684 16.5901 12.5199 15.5258 13.8476ZM13.8541 13.2292C14.9117 12.1417 15.5023 10.6838 15.5 9.16675C15.5 5.94341 12.8891 3.33341 9.66663 3.33341C6.44329 3.33341 3.83329 5.94341 3.83329 9.16675C3.83329 12.3892 6.44329 15.0001 9.66663 15.0001C11.1837 15.0025 12.6415 14.4118 13.7291 13.3542L13.8541 13.2292V13.2292Z" fill="#6C8693"/>
</g>
<defs>
<clipPath id="clip0_2125_10754">
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
      Requests
    </Text>
  </YStack>
);
