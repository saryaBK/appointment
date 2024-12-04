import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/useLang/useLang';
import useTheme from '../../context/useTheme/useTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';


const LangSwitch = () => {
  const { lang, switchLang } = useLanguage();
  const [language, setLanguage] = useState( );
  const {theme} = useTheme(); 

  const toggleLanguage = () => {
    switchLang(lang === "en" ? "ar" : "en");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button,
          { borderColor: theme.light_font }
        ,]}
        onPress={toggleLanguage}
      >
        <Ionicons name="globe-outline" size={20} color={theme.main_light} />
        <Text 
          style={[styles.text,{ color: theme.main_light }]}>
          {lang == 'ar' ? 'English' :'العربية'}
        </Text>
        <Ionicons name="chevron-down-outline" size={20} color={theme.main_light} />
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
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
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