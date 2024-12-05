import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { Dimensions, StyleSheet, View, Animated, PanResponder } from "react-native";
import { Container, LogoContainer, MainSubText, MainText } from "./styled";
import WelcomeLogo from "../../assets/Icons/WelcomeLogo";
import GlobalButton from "../GlobalButton/GlobalButton";
import * as Notifications from "expo-notifications";
import useTheme from "../../context/useTheme/useTheme";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";

const WelcomeContent = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const handleGetStarted = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🎉 Welcome!",
        body: "You have successfully started your journey with Oneday Appointment!",
        sound: "default",
      },
      trigger: null,
    });
    navigation.navigate("Main");
  };

  return (
    <Container style={{ paddingTop: theme.mediumSize + 40 }}>
      
          <ThemeToggleButton onToggle={toggleTheme} />
        
      <LogoContainer>
        <WelcomeLogo />
        <MainText>{t("Appointment")}</MainText>
        <MainSubText>{t("Welcome_to_Oneday_Appointment")}</MainSubText>
      </LogoContainer>
      <GlobalButton onPress={handleGetStarted} title={t("Get_Started")} />
    </Container>
  );
};

export default WelcomeContent;
