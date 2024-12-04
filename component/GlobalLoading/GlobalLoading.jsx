import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import useTheme from '../../context/useTheme/useTheme';



const GlobalLoading = () => {
   const {theme} = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });


  return (
    <View style={styles.loadingContainer}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <AntDesign name="loading1" size={36} color={theme.main_light} />
      </Animated.View>
    </View>
    )
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GlobalLoading;


