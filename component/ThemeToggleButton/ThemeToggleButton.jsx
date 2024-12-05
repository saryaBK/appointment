import React, { useState, useRef } from "react";
import { TouchableOpacity, StyleSheet, View, Animated,Dimensions,  PanResponder  } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useTheme from "../../context/useTheme/useTheme";
import Octicons from '@expo/vector-icons/Octicons';

const ThemeToggleButton = ({ onToggle }) => {
  const { theme ,setIsEnabled,isEnabled} = useTheme();

  const { width } = Dimensions.get("window");
  const pan = useRef(new Animated.ValueXY({ x: width / 2 - 25, y: 20 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset(); 
      },
    })
  ).current;
  
  const translateX = useRef(new Animated.Value(0)).current;
  const toggleSwitch = () => {
    const toValue = isEnabled ? 0 : 0; 
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsEnabled(!isEnabled);
    onToggle(!isEnabled);
  };

  return (
    <View style={styles.btnContainer}>
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.draggableButton,
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
      ]}
    >
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.light,
          borderColor: theme.border_light,
          borderWidth: 2,
        },
      ]}
      onPress={toggleSwitch}
    >
      <Animated.View
        style={[
          styles.toggleCircle,
          {
            backgroundColor: theme.border_dark,
            transform: [{ translateX }],
          },
        ]}
      >
        <Octicons 
        name={isEnabled ? "moon" : "sun"} 
        size={24} 
        color={theme.white_color}
        />
      </Animated.View>
    </TouchableOpacity>
    </Animated.View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
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
  btnContainer: {
    gap: 10,
    flexDirection: "row",
  },
  draggableButton: {
    position: "absolute",
    zIndex: 10,
    width: 50,
    height: 50,
  },
});

export default ThemeToggleButton;
