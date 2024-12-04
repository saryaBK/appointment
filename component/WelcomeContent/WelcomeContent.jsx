import React from "react";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { Container, LogoContainer, MainSubText, MainText } from "./styled";
import WelcomeLogo from "../../assets/Icons/WelcomeLogo";
import GlobalButton from "../GlobalButton/GlobalButton";
import LangSwitch from "../LangSwitch/LangSwitch";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import useTheme from "../../context/useTheme/useTheme";
import * as Notifications from "expo-notifications";
import { TouchableOpacity, StyleSheet, View, Animated } from "react-native";

const WelcomeContent = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme(); // إضافة toggleTheme لتبديل الثيم

  const handleGetStarted = async () => {
    // إرسال إشعار
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
    <Container style={{paddingTop: theme.mediumSize + 40}}>
      <View style={[styles.btnContainer]}>
      <LangSwitch />
      <ThemeToggleButton onToggle={toggleTheme} />
      </View>
      <LogoContainer>
        <WelcomeLogo />
        <MainText>{t("Appointment")}</MainText>
        <MainSubText>{t("Welcome_to_Oneday_Appointment")}</MainSubText>
      </LogoContainer>
      <GlobalButton onPress={handleGetStarted} title={t("Get_Started")} />
    </Container>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
   gap:10,
   flexDirection:"row"
  },
});

export default WelcomeContent;
