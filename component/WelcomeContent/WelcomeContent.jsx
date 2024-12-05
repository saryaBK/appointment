import React from "react";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { Container, LogoContainer, MainSubText, MainText } from "./styled";
import WelcomeLogo from "../../assets/Icons/WelcomeLogo";
import GlobalButton from "../GlobalButton/GlobalButton";
import * as Notifications from "expo-notifications";
import useTheme from "../../context/useTheme/useTheme";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const WelcomeContent = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const handleGetStarted = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🎉 Welcome!",
          body: "You have successfully started your journey with Oneday Appointment!",
          sound: "default",
        },
        trigger: null,
      });
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
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
