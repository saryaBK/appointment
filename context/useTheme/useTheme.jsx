import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import React , {createContext , useContext} from "react";
import { PixelRatio } from "react-native";
const fontScale = PixelRatio.getFontScale();

export const ThemeConfig = createContext()

export const ThemeProvider = ({children}) => {

  const theme = {
    main: "#0A014F",
    main_light: "#6A4CF4",
    bg: '#FFFFFF',
    dark_font:"black",
    main_light_font:"#6A4CF4",
    light_font:"#FFFFFF",
    dark_btn : '#262350',
    light_btn : '#6A4CF4',
    small: Math.round(9 * fontScale),
    mediumSize: Math.round(14 * fontScale),
    large: Math.round(18 * fontScale),
    xLarge: Math.round(24 * fontScale),
    bold: "InterBold",
    semiBold: "InterSemiBold",
    mediumFont: "InterMedium",
    regular: "InterRegular",
    light: "InterLight",
  }

    return(
        <ThemeConfig.Provider value={{theme}}>
            <StyledThemeProvider theme={theme} >
              {children}
            </StyledThemeProvider>
        </ThemeConfig.Provider>
    )
}

const useTheme = () => useContext(ThemeConfig)
export default useTheme

