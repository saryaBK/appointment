import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import React , {createContext , useContext, useState} from "react";
import { PixelRatio } from "react-native";
const fontScale = PixelRatio.getFontScale();

export const ThemeConfig = createContext()

export const ThemeProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [theme, setTheme] = useState({
    mode: "light",
    main: "#1B1564",
    main_light: "#6A4CF4",
    bg: "#FFFFFF",
    dark_font: "black",
    main_light_font: "#6A4CF4",
    light_font: "#FFFFFF",
    dark_btn: "#262350",
    light_btn: "#6A4CF4",
    /********** */
    dark_color:"#1B1564",
    light_color:"#7551D6",
    white_color:"#FFFFFF",
    dark : "#1B1564",
    light:"#7551D6",
    bg_dark:"#FFFFFF",
    bg_light:"#FFFFFF",
    font_dark:"#1B1564",
    font_light:"#FFFFFF" ,
    border_dark:"#1B1564",
    border_light:"#7551D6",
    /********** */
    small: Math.round(9 * fontScale),
    mediumSize: Math.round(14 * fontScale),
    large: Math.round(18 * fontScale),
    xLarge: Math.round(24 * fontScale),
    bold: "InterBold",
    semiBold: "InterSemiBold",
    mediumFont: "InterMedium",
    regular: "InterRegular",
    lightFont: "InterLight",
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      mode: prevTheme.mode === "light" ? "dark" : "light",
      // bg: prevTheme.mode === "light" ? "#0A014F" : "#FFFFFF",
      // light_font: prevTheme.mode === "light" ? "#0A014F" : "#FFFFFF",
      dark_color:prevTheme.mode === "light" ? "#1B1564" :"#1B1564" ,
      light_color:prevTheme.mode === "light" ?  "#7551D6":"#7551D6",
      white_color:prevTheme.mode === "light" ?  "#FFFFFF":"#FFFFFF",
      dark :prevTheme.mode === "light" ? "#FFFFFF" :"#1B1564"  ,
      light:prevTheme.mode === "light" ?  "#FFFFFF":"#7551D6" ,
      bg_dark:prevTheme.mode === "light" ?  "#1B1564":"#FFFFFF",
      bg_light:prevTheme.mode === "light" ? "#D9D9D9" : "#FFFFFF",
      font_dark:prevTheme.mode === "light" ? "#FFFFFF" : "#1B1564",
      font_light:prevTheme.mode === "light" ? "#1B1564" :"#FFFFFF",
      border_dark:prevTheme.mode === "light" ? "#7551D6" : "#1B1564",
      border_light:prevTheme.mode === "light" ? "#1B1564" :"#7551D6",
    }));
  };


  return (
    <ThemeConfig.Provider value={{ theme, toggleTheme,setIsEnabled,isEnabled }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeConfig.Provider>
  );
};


const useTheme = () => useContext(ThemeConfig)
export default useTheme

