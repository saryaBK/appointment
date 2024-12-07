import React, { useState } from 'react';
import MyAppointmentsContent from '../component/MyAppointmentsContent/MyAppointmentsContent';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GlobalLoading from '../component/GlobalLoading/GlobalLoading';
import { useLanguage } from '../context/useLang/useLang';
import { useQuery } from '@tanstack/react-query';
import { getCustomerAppointment } from '../apiMethods/apiCall/get';
import { useUser } from '../context/useUser/useUser';
import useTheme from '../context/useTheme/useTheme';
import GlobalButton from '../component/GlobalButton/GlobalButton';
import { useNavigation } from "@react-navigation/native";
import { t } from 'i18next';


const MyAppointments = () => {
  const { user, setMethodLogType, methodLogType,setUser } = useUser();
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const Navigation = useNavigation()
  
  const { data, isLoading } = useQuery({
    queryKey: ['customer-appointment', lang],
    queryFn: async () => {
      const res = await getCustomerAppointment({lang});
      if (res && res?.data) {
        return res?.data || null
      }
    },
    staleTime: Infinity,
    refetchInterval: 30000,
    enabled: user && user ? true : false
  });
  
  return !user ? (
    <View style={[styles.wrapper,{paddingTop: theme.mediumSize + 40}]}>
      <Text style={{width:"100%",textAlign:"center"}}>
      Log in to start booking your own appointment.
      </Text>
      <GlobalButton width='100%' title={t("Login")} onPress={() => { Navigation.navigate('ProfileStack') }}/>
    </View>
  ) : isLoading || !data  ? (
    <GlobalLoading/>
  ) : (
    <GestureHandlerRootView style={styles.container}>
    <MyAppointmentsContent data={data}/>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  wrapper:{
   padding:20,
   justifyContent:"center",
   alignItems:"center",
   flex:1,
   gap:10,
  },
  container: {
    flex: 1,
  },
});


export default MyAppointments;




