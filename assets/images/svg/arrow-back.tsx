import { SvgXml } from "react-native-svg";

export const ArrowBack = ({
  width = 16,
  height = 16,
}: {
  width?: number;
  height?: number;
}) => (
  <SvgXml
    xml={`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.625 13.125L2.5 10M2.5 10L5.625 6.875M2.5 10H17.5" stroke="#6C8693" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>    
    `}
    width={width}
    height={height}
  />
);
