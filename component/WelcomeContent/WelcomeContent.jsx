import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { Container, LogoContainer, MainSubText, MainText } from "./styled";
import WelcomeLogo from "../../assets/Icons/WelcomeLogo";
import GlobalButton from "../GlobalButton/GlobalButton";
import * as Notifications from "expo-notifications";
import useTheme from "../../context/useTheme/useTheme";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'

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
  const [location , setLocation]= useState()
  const [region , setRegion]= useState({})
  console.log(region)

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

  useEffect(()=>{
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    
    getCurrentLocation();

  },[])

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
    
    //  location?.coords && 
    //   <MapView 
    //   region={{
    //     latitude:location.coords.latitude,
    //     longitude:location?.coords?.longitude,
    //     latitudeDelta:0.0922,
    //     longitudeDelta :0.0421
    //   }}
    //      provider="google" 
    //   onRegionChange={(e)=>{setRegion(e)}} style={{width:"100%",height:"100%"}}>
    //   {
    //   <Marker
    //   // onchang={(e)=>console.log(e)}
    //   coordinate={{
    //     latitude:region?.latitude || location.coords.latitude,
    //     longitude:region?.longitude || location?.coords?.longitude,}}
    //   title={''}
    //   description={''}
    //   />
    //   }
    // </MapView>
  
  );
};

export default WelcomeContent;
