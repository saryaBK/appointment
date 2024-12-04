import React, { useState, useRef } from "react";
import { TouchableOpacity, StyleSheet, View, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useTheme from "../../context/useTheme/useTheme";
import Octicons from '@expo/vector-icons/Octicons';

const ThemeToggleButton = ({ onToggle }) => {
  const { theme ,setIsEnabled,isEnabled} = useTheme();
  
  const translateX = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    const toValue = isEnabled ? 0 : 70; 
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsEnabled(!isEnabled);
    onToggle(!isEnabled);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isEnabled ? theme.main : theme.main_light,
          borderColor: isEnabled ? theme.main_light : theme.dark_font,
          borderWidth: 2,
        },
      ]}
      onPress={toggleSwitch}
    >
      <Animated.View
        style={[
          styles.toggleCircle,
          {
            backgroundColor: isEnabled ? theme.main_light : theme.dark_font,
            transform: [{ translateX }],
          },
        ]}
      >
        <Octicons 
        name={isEnabled ? "moon" : "sun"} 
        size={24} 
        color={isEnabled ? theme.main : theme.bg} 
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 50,
    borderRadius: 25,
    padding:5
  },
  toggleCircle: {
    margin:3,
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});

export default ThemeToggleButton;
