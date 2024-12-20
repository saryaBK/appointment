import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import useTheme from '../../context/useTheme/useTheme';

const GlobalButton = ({ title, onPress, style, textStyle, disabled, loading }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? '#A9A9A9' : theme.light_color },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading} // تعطيل الزر أثناء التحميل
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.white_color} /> // أيقونة التحميل
      ) : (
        <Text style={[styles.buttonText,{color:theme.white_color}, textStyle]}>{title}</Text> // النص الأساسي
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
});

export default GlobalButton;
