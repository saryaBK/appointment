import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Arabic from '../../assets/Language/arabic/ar.json';
import English from '../../assets/Language/english/en.json';
import * as Updates from 'expo-updates';
import { I18nManager } from 'react-native';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: English },
      ar: { translation: Arabic },
    },
    compatibilityJSON: 'v3',
    // lng: Localization.locale.includes('ar') ? 'ar' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('appLanguage');
      if (storedLanguage) {
        setLanguage(storedLanguage);
        i18n.changeLanguage(storedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const switchLang = async (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    await AsyncStorage.setItem('appLanguage', lng);
    I18nManager.allowRTL(lng == 'ar');
    I18nManager.forceRTL(lng == 'ar');
    Updates.reloadAsync();
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
