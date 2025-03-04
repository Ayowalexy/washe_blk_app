import { SvgXml } from "react-native-svg";

export const Arrow = ({ color }: { color: string }) => (
  <SvgXml
    xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 5.5L14 8M14 8L11.5 10.5M14 8H2" stroke=${color} stroke-linecap="round" stroke-linejoin="round"/>
    </svg>          
    `}
    width={16}
    height={16}
  />
);
