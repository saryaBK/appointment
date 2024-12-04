import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import WelcomeContent from "../component/WelcomeContent/WelcomeContent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = () => {

  AsyncStorage.getAllKeys().then((keys) => {
    AsyncStorage.multiGet(keys).then((result) => {
        // console.log('Stored Data:', result);
    });
  });
  
  
  return(
    <WelcomeContent/>
  )
};

export default Welcome;


