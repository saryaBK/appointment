import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/useLang/useLang';
import useTheme from '../../context/useTheme/useTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';


const LangSwitch = () => {
  const { lang, switchLang } = useLanguage();
  const [language, setLanguage] = useState( );
  const { theme ,setIsEnabled,isEnabled} = useTheme();

  const toggleLanguage = () => {
    switchLang(lang === "en" ? "ar" : "en");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button,
          { borderColor: isEnabled ? theme.main_light : theme.dark_font,
            backgroundColor: isEnabled ? theme.main : theme.main_light,
            borderWidth: 2,
          }
        ,]}
        onPress={toggleLanguage}
      >
        <Ionicons name="globe-outline" size={25} color={isEnabled ? theme.main_light : theme.bg} />
        <Text 
          style={[styles.text,{ color: isEnabled ? theme.main_light : theme.bg }]}>
          {lang == 'ar' ? 'English' :'العربية'}
        </Text>
        <Ionicons name="chevron-down-outline" size={25} color={isEnabled ? theme.main_light : theme.bg} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:7,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 8,
    paddingVertical: 10,
    height:50
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    marginRight: 5,
  },
});

export default LangSwitch;


// import Icon from 'react-native-vector-icons/MaterialIcons';