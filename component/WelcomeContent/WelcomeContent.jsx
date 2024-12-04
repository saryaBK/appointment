import React from "react";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { Container, LogoContainer, MainSubText, MainText } from './styled';
import WelcomeLogo from "../../assets/Icons/WelcomeLogo";
import GlobalButton from "../GlobalButton/GlobalButton";
import LangSwitch from "../LangSwitch/LangSwitch";
import useTheme from "../../context/useTheme/useTheme";
import * as Notifications from 'expo-notifications';

const WelcomeContent = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleGetStarted = async () => {
    // إرسال إشعار
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🎉 Welcome!",
        body: "You have successfully started your journey with Oneday Appointment!",
        sound: 'default',
      },
      trigger: null,
    });
    navigation.navigate("Main");
  };

  return (
    <Container>
      <LangSwitch />
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
