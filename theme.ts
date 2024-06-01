import { createFont, createTokens, createTamagui } from "@tamagui/core";
import { config as tamaguiConfig } from '@tamagui/config/v2';

const headerFont = createFont({
    family: 'Quicksand',
    size: tamaguiConfig.fonts.heading.size,
    lineHeight: tamaguiConfig.fonts.heading.lineHeight,
    weight: tamaguiConfig.fonts.heading.weight,
    letterSpacing: tamaguiConfig.fonts.heading.letterSpacing,
    face: {
        300: { normal: 'Quicksand-Light' },
        400: { normal: 'Quicksand-Medium' },
        500: { normal: 'Quicksand-Regular' },
        600: { normal: 'Quicksand-Bold' },
    }
})

const bodyFont = createFont({
    family: 'Quicksand',
    size: tamaguiConfig.fonts.body.size,
    lineHeight: tamaguiConfig.fonts.body.lineHeight,
    weight: tamaguiConfig.fonts.body.weight,
    letterSpacing: tamaguiConfig.fonts.body.letterSpacing,
    face: {
        // 200: { normal: 'Outfit-ExtraLight' },
        300: { normal: 'Quicksand-Light' },
        400: { normal: 'Quicksand-Regular' },
        500: { normal: 'Quicksand-Medium' },
        700: { normal: 'Quicksand-SemiBold' },
        800: { normal: 'Quicksand-Bold' },
    },
})

const size = {
    0: 0,
    1: 5,
    2: 20,
}

export const tokens = createTokens({
    size: {
        ...tamaguiConfig.tokens.size,
        sm: 38,
        md: 46,
        lg: 67,
    },
    space: {
        ...tamaguiConfig.tokens.space,
        sm: 15,
        ssm: 18,
        md: 20,
        lg: 25,
        bg: 27,
        xl: 30
    },
    radius: {
        ...tamaguiConfig.tokens.radius,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 30
    },
    zIndex: tamaguiConfig.tokens.zIndex,
    color: {
        primary1: "#7E00CC",
        primary2: '#FFDD66',
        primary3: "#E4CCFF",
        primary4: "#9747FF",
        primary5: "#F7CE45",
        secondary1: "#1B1B1C",
        secondary2: "#242426",
        secondary3: "#707A8A",
        secondary4: "#F7F7F7",
        secondary5: '#7EFFB2',
        secondary6: "#E7F5F7",
        secondary7: "#FDEBDF",
        secondary8: "#F9F8FE",
        accent1: "#48FF91",
        accent2: "#ECCEFD",
        accent3: "#7435F5",
        accent4: "#FF9A00",
        accent5: "#FDFC00",
        accent6: "#7035EC",
        background: "#FFFFFF",
        black1: "#242426",
        black2: "rgba(41, 45, 50, 0.70)",
        black3: '#292D32',
        black4: "rgba(123, 126, 129, 0.10)",
        black5: 'rgba(0,0,0,0.3)',
        black6: "#E6EAEE",
        black7: '#7B7E81',
        white1: "#fff",
        error1: "#F42C2C",
        red1: "#F05542",
        red2: "#000"
    },
})

const config = createTamagui({
    fonts: {
        heading: headerFont,
        body: bodyFont,
    },
    tokens,
    themes: {
        light: {
            background: tokens.color.background,
            primary1: tokens.color.primary1,
            primary2: tokens.color.primary2,
            secondary1: tokens.color.secondary1,
            secondary2: tokens.color.secondary2,
            secondary3: tokens.color.secondary3,
            secondary4: tokens.color.secondary4,
            accent1: tokens.color.accent1,
            accent2: tokens.color.accent2,
            accent3: tokens.color.accent3,
            accent4: tokens.color.accent4,
            accent5: tokens.color.accent5,
            black1: tokens.color.black1,
            black2: tokens.color.black2,
            error1: tokens.color.error1
        },
        dark: {
            background: tokens.color.background,
        },
        light_Button: {
            background: '#ccc',
            backgroundPress: '#bbb',
            backgroundHover: '#ddd',
            color: '#222'
        },
    },
})

type AppConfig = typeof config

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig { }
    interface TypeOverride {
        groupNames(): 'a' | 'b' | 'c'
    }
}

export default config